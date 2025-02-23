const Nota = require('../models/nota');
const Materia = require('../models/materia');
const Alumno = require('../models/alumno');
const { DATEONLY, Model } = require('sequelize');
const Usuario = require('../models/usuario');

exports.crearNota = async (req, res) => {
    try {
        const idAlumno = req.params.id;
        const idMateria = req.params.materia;

        const alumno = await Alumno.findByPk(idAlumno);
        const materia = await Materia.findByPk(idMateria);

        return res.status(200).render('nota/alta', { alumno, materia });
    } catch (error) {
        return res.status(500).json(error)
    }
}

exports.altaNota = async (req, res) => {
    try {
        const data = req.body;
        const fecha = new DATEONLY();
        const usuario = await Usuario.findOne({ where: { email: req.user.email } });

        //vamos a ponerle una condicion
        //no puede ingresar mas de 3 notas al alumno por materia
        const totalNotas = await Nota.findAll({where:{id_materia:data.idMateria, id_alumno: data.idAlumno}});
        console.log('total de notas!',totalNotas.length)

        if(totalNotas.length === 3){
            req.session.errorMessage = 'Ya ingreso mas de 3 notas a este alumno en esta materia!';
            return res.redirect(`/alumno/materias/${data.idAlumno}`);
        }

        const nota = {
            calificacion: data.calificacion,
            fecha: fecha,
            id_materia: data.idMateria,
            id_alumno: data.idAlumno,
            id_usuario: usuario.idUsuario
        }

        await Nota.create(nota);
        req.session.message = `Nota creada con exito!`;
        return res.status(201).redirect(`/alumno/materias/${data.idAlumno}`);

    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}

exports.notasDeAlumno = async (req, res) => {
    try {
        const idAlumno = req.params.id;
        const notas = await Nota.findAll({
            where: { id_alumno: idAlumno },
            include: { model: Materia }
        });

        // Agrupar notas por materia
        const materiasAgrupadas = {};

        notas.forEach((nota, index) => {
            const nombreMateria = nota.Materium.nombre;
            if (!materiasAgrupadas[nombreMateria]) {
                materiasAgrupadas[nombreMateria] = {
                    nombre: nombreMateria,
                    calificaciones: []
                };
            }
            materiasAgrupadas[nombreMateria].calificaciones.push(nota.calificacion);
        });

        // Convertir objeto en array y calcular promedios
        const materias = Object.values(materiasAgrupadas).map(materia => {
            while (materia.calificaciones.length < 3) {
                materia.calificaciones.push(null); // Completa con null si hay menos de 3 notas
            }
            const notasValidas = materia.calificaciones.filter(c => c !== null);
            materia.promedio = notasValidas.length > 0
                ? (notasValidas.reduce((sum, c) => sum + c, 0) / notasValidas.length).toFixed(2)
                : '-';
            return materia;
        });

        //paso datos del alumno
        const alumno = await Alumno.findByPk(idAlumno);
        if(req.user.rol === "Admin"){
            return res.status(200).render('nota/notas', { materias, alumno });
        }
        if(req.user.rol === "Estudiante"){
            return res.status(200).render('alumno/misNotas', { materias, alumno });
        }
        
    } catch (error) {
        return res.status(500).json(error);
    }
};


