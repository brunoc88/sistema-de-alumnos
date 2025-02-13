const Alumno = require('../models/alumno');

exports.crearAlumno = async(req,res)=>{
    try {
        return res.status(200).render('alumno/alta')
    } catch (error) {
        return res.send('Error: ', error);
    }
}
exports.altaAlumno = async(req,res)=>{
    const data = req.body;
    await Alumno.create(data);

    return res.status(200).json('Exito!');
}

