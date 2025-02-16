const Materia = require('../models/materia');

exports.crearMateria = async (req, res) => {
    try {
        const materias = await Materia.findAll();
        return res.status(200).render('materia/alta', { materias: materias.length? materias: [] });
    } catch (error) {
        return res.status(500).json('Error: ', error);
    }
}

exports.altaMateria = async (req, res) => {
    try {
        const data = req.body;
        const buscarMateria = await Materia.findOne({ where: { nombre: data.nombre } });
        if (buscarMateria) {
            req.session.errorMessage = `La materia ${data.nombre} ya se encuentra registrada`;
            return res.status(409).redirect('/materia/index')
        }
        await Materia.create(data);
        req.session.message = `La materia ${data.nombre} ha sido creada con exito!`;
        return res.status(200).redirect('/materia/index');
    } catch (error) {
        return res.status(500).json('Error: ', error);
    }
}

exports.bajaMateria = async (req, res) => {
    try {
        const id = req.params.id;
        //busco el nombre de la materia para mostrar msj
        const materia = await Materia.findByPk(id);
        await Materia.update({ estado: false }, { where: { idMateria: id } })
        req.session.message = `${materia.nombre} desactivada!`;
        return res.status(200).redirect('/materia/index');
    } catch (error) {
        return res.status(500).json('Error: ', error);
    }
}

exports.activarMateria = async (req, res) => {
    try {
        const id = req.params.id;
        await Materia.update({ estado: true }, { where: { idMateria: id } });
        //busco el nombre de la materia para mostrar msj
        const materia = await Materia.findByPk(id);
        req.session.message = `${materia.nombre} activada!`;
        return res.status(200).redirect('/materia/index');
    } catch (error) {
        return res.status(500).json('Error: ', error);
    }
}

exports.editarMateriaVista = async (req, res) => {
    try {
        const id = req.params.id;
        //busco los datos de la materia para pasarla a la vista
        const materia = await Materia.findByPk(id);
        return res.status(200).render('materia/editar', { materia });
    } catch (error) {
        return res.status(500).json('Error: ', error);
    }
}

exports.actualizarMateria = async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;
        //busco que no ingrese el mismo nombre o duplicado
        const duplicado = await Materia.findOne({ where: { nombre: data.nombre } });
        if (duplicado) {
            return res.status(409).render('materia/editar',{materia:{nombre:data.nombre, idMateria:id},
                errorMessage:`La materia ${data.nombre} ya se encuentra registrada`});
        }
        await Materia.update({ nombre: data.nombre }, { where: { idMateria: id } });
        req.session.message = `La materia ${data.nombre} ha sido actualizada!`;
        return res.status(200).redirect('/materia/index');
    } catch (error) {
        return res.status(500).json('Error: ', error);
    }
}