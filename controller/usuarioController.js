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
        return res.status(200).render('usuario/alta');
    } catch (error) {
        return res.status(500).json(error);
    }
}

exports.altaUsuario = async (req, res) => {
    try {
        const data = req.body;
        const buscarUsuario = await Usuario.findOne({ where: { dni: data.dni } });
        if (buscarUsuario) {
            return res.status(409).render('usuario/alta', {
                errorMessage: 'Ya existe un usuario con ese dni!',
                usuario: data
            })
        }

        //buscar si ya existe alguien registrado con ese mail 
        const buscarUsuarioPorMail = await Usuario.findOne({ where: { email: data.email } });
        if (buscarUsuarioPorMail) {
            return res.status(409).render('usuario/alta', {
                errorMessage: 'Ya existe un usuario con ese email!',
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

exports.editar = async(req,res)=>{
    try {
        const id = req.params.id;
        const usuario = await Usuario.findByPk(id);
        return res.status(200).render('usuario/editar',{usuario})

    } catch (error) {
        return res.json(error);
    }
}

exports.actualizar = async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;

        // Buscar el usuario en la base de datos
        const usuario = await Usuario.findByPk(id);

        // Comparar si los datos han cambiado
        const mismaClave = data.password ? await bcrypt.compare(data.password, usuario.password) : true;

        if (
            data.nombre === usuario.nombre &&
            data.apellido === usuario.apellido &&
            data.email === usuario.email &&
            mismaClave &&
            data.rol === usuario.rol
        ) {
            return res.render('usuario/editar', { usuario, errorMessage: 'No hay cambios para actualizar' });
        }

        // Si la contraseña ha cambiado, encriptarla antes de guardar
        let nuevaClave = usuario.password;
        if (data.password && data.password !== '') {
            nuevaClave = await bcrypt.hash(data.password, 10);
        }

        // Actualizar usuario
        await Usuario.update({
            nombre: data.nombre,
            apellido: data.apellido,
            email: data.email,
            password: nuevaClave, // Solo actualiza la contraseña si se ha proporcionado
            rol: data.rol
        },{where:{idUsuario:id}});

        return res.redirect('/usuario/index');

    } catch (error) {
        console.error(error);
        return res.render('usuario/editar', { errorMessage: 'Ocurrió un error al actualizar el usuario' });
    }
};

