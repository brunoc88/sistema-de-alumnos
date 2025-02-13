const Alumno = require('../models/alumno');


exports.altaAlumno = async(req,res)=>{
    const data = req.body;
    await Alumno.create(data);

    return res.status(200).json('Exito!');
}

