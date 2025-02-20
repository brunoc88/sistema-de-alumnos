const Nota = require('../models/nota');
const Materia = require('../models/materia');
const Alumno = require('../models/alumno');

exports.crearNota = async(req,res)=>{
    try {
        const idAlumno = req.params.id;
        const idMateria = req.params.materia;

        const alumno = await Alumno.findByPk(idAlumno);
        const materia = await Materia.findByPk(idMateria);

        return res.status(200).render('nota/alta',{alumno,materia});
    } catch (error) {
        return res.status(500).json(error)
    }
}