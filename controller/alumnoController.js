const Alumno = require('../models/alumno');
const Materia = require('../models/materia');

exports.crearAlumno = async(req,res)=>{
    try {
        //busco las materias y se la paso para que se registre
        const materias = await Materia.findAll({where:{estado:true}});
        return res.status(200).render('alumno/alta',{materias});
    } catch (error) {
        return res.send('Error: ', error);
    }
}
exports.altaAlumno = async(req,res)=>{
    const data = req.body;
    await Alumno.create(data);

    return res.status(200).json('Exito!');
}

