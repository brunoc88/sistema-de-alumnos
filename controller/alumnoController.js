const Alumno = require('../models/alumno');
const Materia = require('../models/materia');

exports.indexAlumno = async (req, res) => {
    try {
        // busco todos los alumnos 
        const alumnos = await Alumno.findAll();

        // Verifica si no hay alumnos
        if (alumnos.length === 0) {
            return res.status(200).render('alumno/index', { alumnos: [] });  // Pasa un array vacío si no hay alumnos
        }

        return res.status(200).render('alumno/index', { alumnos });  // Si hay alumnos, pasa los datos
    } catch (error) {
        return res.status(500).send('Error: ' + error);  // Agrega un código de estado 500 para errores del servidor
    }
};

exports.crearAlumno = async (req, res) => {
    try {
        //busco las materias y se la paso para que se registre
        const materias = await Materia.findAll({ where: { estado: true } });
        return res.status(200).render('alumno/alta', { materias });
    } catch (error) {
        return res.send('Error: ', error);
    }
}

exports.altaAlumno = async (req, res) => {

    try {
        const { nombre, apellido, dni, materiasSeleccionadas } = req.body;

        //buscamos duplicado
        const duplicado = await Alumno.findOne({ where: { dni: dni } });
        if (duplicado) {
            console.log("MATERIAS PREVIO AL", materiasSeleccionadas);
            //RECUPERO LAS MATERIAS PARA CARGARLAS DE NUEVO
            const materias = await Materia.findAll({ where: { estado: true } });
            return res.status(409).render('alumno/alta',
                {
                    alumno: { nombre: nombre, apellido: apellido, dni: dni },
                    materiasSeleccionadas,
                    materias,
                    errorMessage: 'Alunmo con dni ya registrado!'
                }
            )
        }

        const nuevoAlumno = await Alumno.create({
            nombre: nombre,
            apellido: apellido,
            dni: dni
        });


        if (materiasSeleccionadas && materiasSeleccionadas.length > 0) {
            for (let idMateria of materiasSeleccionadas) {
                console.log('id:', idMateria)
                await nuevoAlumno.addMateria(idMateria);
            }
        }

        //ESTA LINEA ES PARA SABER EL METODO CREADO POR LA TABLA INTERMEDIA ALUMNO-MATERIA
        //console.log("METODO",Object.keys(nuevoAlumno.__proto__));
        req.session.message = `Alumno ${nombre} ${apellido} creado con exito!`;
        return res.status(200).redirect('/alumno/index');
    } catch (error) {
        return res.status(500).json('Error: ', error);
    }

}

exports.bajaAlumno = async (req, res) => {
    try {
        const id = req.params.id;
        //busco el alumno para mostrar el mensaje
        const alumno = await Alumno.findByPk(id);
        await Alumno.update({ estado: false }, { where: { idAlumno: id } });
        req.session.message = `Alumno: ${alumno.nombre} ${alumno.apellido} desactivado!`;
        return res.status(200).redirect('/alumno/index');
    } catch (error) {
        return res.status(500).json(error);
    }
}

exports.activarAlumno = async (req, res) => {
    try {
        const id = req.params.id;
        //busco el alumno para mostrar el mensaje
        const alumno = await Alumno.findByPk(id);
        await Alumno.update({ estado: true }, { where: { idAlumno: id } });
        req.session.message = `Alumno: ${alumno.nombre} ${alumno.apellido} reactivado!`;
        return res.status(200).redirect('/alumno/index');
    } catch (error) {
        return res.status(500).json(error);
    }
}

exports.alumnoMaterias = async (req, res) => {
    try {
        const id = req.params.id;
        const alumno = await Alumno.findByPk(id, {
            include: {
                model: Materia,
                through: { attributes: [] } // Omite los atributos de la tabla intermedia, si no los necesitas
            }
        });
        //res.json(alumno)
        return res.status(200).render('alumno/materias', { alumno });
    } catch (error) {
        return res.json(error);
    }
}

exports.editarAlumno = async (req, res) => {
    try {
        const id = req.params.id;
        const alumno = await Alumno.findByPk(id);
        //busco el metodo para obtener la materias que se habian seleccionado
        //console.log("METODO",Object.keys(alumno.__proto__));
        const materiasSeleccionadas = await alumno.getMateria();  // Esto obtiene las materias asociadas
        //console.log("materias del alumno",materiasSeleccionadas);
        const materias = await Materia.findAll();
        return res.status(200).render('alumno/editar', { alumno, materiasSeleccionadas, materias });
    } catch (error) {
        return res.json(error);
    }
}

exports.actualizar = async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const alumno = await Alumno.findByPk(id, { include: Materia });
        const materias = await Materia.findAll({ where: { estado: true } });

        if (!alumno) {
            return res.status(404).json({ error: "Alumno no encontrado" });
        }

        // Convertir materiasSeleccionadas en array si es un solo valor
        const materiasNuevas = Array.isArray(data.materiasSeleccionadas)
            ? data.materiasSeleccionadas.map(id => Number(id)).sort()
            : [Number(data.materiasSeleccionadas)].sort();

        // Obtener materias actuales del alumno
        const materiasSeleccionadas = await alumno.getMateria();
        const materiasActuales = materiasSeleccionadas.map(m => m.idMateria).sort();

        // Comparar si las materias seleccionadas son iguales a las actuales
        const mismasMaterias = JSON.stringify(materiasActuales) === JSON.stringify(materiasNuevas);

        // Comparar datos personales del alumno
        const sinCambios = 
            alumno.nombre.trim().toLowerCase() === data.nombre.trim().toLowerCase() &&
            alumno.apellido.trim().toLowerCase() === data.apellido.trim().toLowerCase() &&
            alumno.dni === data.dni &&
            mismasMaterias;

        if (sinCambios) {
            return res.status(400).render('alumno/editar', {
                errorMessage: 'No se realizaron cambios en el alumno.',
                alumno,
                materias,
                materiasSeleccionadas
            });
        }

        // Si hubo cambios en los datos, actualizar solo los valores modificados
        const userUpdate = {
            nombre: data.nombre,
            apellido: data.apellido,
            dni: data.dni
        };

        await Alumno.update(userUpdate, { where: { idAlumno: id } });

        // Si hubo cambios en las materias, actualizarlas
        if (!mismasMaterias) {
            await alumno.setMateria(materiasNuevas);
        }

        req.session.message = 'Alumno actualizado con éxito!';
        
        return res.status(200).redirect('/alumno/index');

    } catch (error) {
        console.error("Error al actualizar alumno:", error);
        return res.status(500).json({ error: "Error interno del servidor" });
    }
};
