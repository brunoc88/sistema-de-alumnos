const Materia = require('../models/materia');

exports.crearMateria = async(req,res) =>{
    try {
        const materias = await Materia.findAll();
        return res.status(200).render('materia/alta',{materias});
    } catch (error) {
        return res.status(500).json('Error: ',error);
    }
}

exports.altaMateria = async(req,res)=>{
    try {
        const data = req.body;
        const buscarMateria = await Materia.findOne({where: {nombre:data.nombre}});
        if(buscarMateria){
            return res.status(409).json('ya existe una materia con ese nombre!');
        }
        await Materia.create(data);
        return res.status(200).redirect('/materia/index');
    } catch (error) {
        return res.status(500).json('Error: ', error);
    }
}

exports.bajaMateria = async(req,res)=>{
    try {
        const id = req.params.id;
        await Materia.update({estado:false},{where:{idMateria:id}})
        return res.status(200).redirect('/materia/index');
    } catch (error) {
        return res.status(500).json('Error: ', error);
    }
}