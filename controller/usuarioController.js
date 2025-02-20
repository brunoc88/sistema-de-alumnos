const Usuario = require('../models/usuario');
const bcrypt = require('bcrypt');//para encriptar clave

exports.index = async(req,res)=>{
    try {
        const usuarios = await Usuario.findAll();
        return res.status(200).render('usuario/index',{usuarios});
    } catch (error) {
        return res.status(500).json(error);
    }
}

exports.crearUsuario = async (req, res) => {
    try {
        return res.status(200).render('usuario/altaUsuario');
    } catch (error) {
        return res.status(500).json(error);
    }
}

exports.altaUsuario = async (req, res) => {
    try {
        const data = req.body;
        const buscarUsuario = await Usuario.findOne({ where: { dni: data.dni } });
        if (buscarUsuario) {
            return res.status(409).render('usuario/altaUsuario', {
                errorMessage: 'Ya existe un usuario con ese dni!',
                usuario: data
            })
        }

        // Generar salt y hashear la contraseña
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(data.password, salt);

        // Crear el nuevo usuario
        await Usuario.create({
            nombre: data.nombre,
            apellido: data.apellido,
            dni: data.dni,
            email: data.email,
            password: hashedPassword,
            rol: data.rol
        });
        req.session.message = `Usuario creado con exito!`;
        return res.status(201).redirect('/usuario/index');
    } catch (error) {
        return res.status(500).json(error);
    }
}

exports.bajaUsuario = async(req,res)=>{
    try {
        const id = req.params.id;
        await Usuario.update({estado:false},{where:{idUsuario:id}});
        req.session.message = `Usuario desactivado con exito!`;
        return res.status(200).redirect('/usuario/index');
    } catch (error) {
        return res.status(500).json(error);
    }
}

exports.activarUsuario = async(req,res)=>{
    try {
        const id = req.params.id;
        await Usuario.update({estado:true},{where:{idUsuario:id}});
        req.session.message = `Usuario activado con exito!`;
        return res.status(200).redirect('/usuario/index');
    } catch (error) {
        return res.status(500).json(error);
    }
}