const Usuario = require('../models/usuario');
const bcrypt = require('bcrypt');//para encriptar
const jwt = require('jsonwebtoken')//para trabajar con token

exports.vistaLogin = async (req, res) => {
    try {
        return res.status(200).render('home/login');
    } catch (error) {
        return res.status(500).json(error);
    }
}

exports.vistaIndex = async(req,res)=>{
    const user = {
        nombre: req.user.nombre
    }
    try {
        return res.status(200).render('home/index',{user});
    } catch (error) {
        return res.status(500).json(error);
    }
}

exports.login = async (req, res) => {
    try {
        const data = req.body;
        //busco el usuario por mail
        const user = await Usuario.findOne({ where: { email: data.email } });
        if (!user) {
            return res.status(404).render('home/login', {
                errorMessage: 'Usuario Invalido o inexistente'
            });
        }

        //me fijo si esta activo
        if (!user.estado) {
            return res.status(404).render('home/login', {
                errorMessage: 'Usuario Invalido o inexistente'
            });
        }

        // Comparar contraseñas
        const validPassword = await bcrypt.compare(data.password, user.password); // Corregí la variable aquí
        if (!validPassword) {
            return res.status(404).render('home/login', {
                errorMessage: 'Usuario Invalido o inexistente'
            });
        }

        // Generar token
        const token = jwt.sign(
            {
                id: user.id,
                email: user.email,
                nombre: user.nombre,
                apellido: user.apellido,
                rol: user.rol
            },
            'mi clave secreta',
            { expiresIn: '1h' }
        );

        // Limpiar cookies existentes y establecer una nueva
        res.clearCookie('token');
        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 1000 * 60 * 60 // 1 hora
        });

        return res.status(200).redirect('/home/index');

    } catch (error) {
        return res.status(500).json({ error: error.message }); // Cambié la forma de responder al error
    }
}

exports.logout = (req, res) => {
    // Eliminar la cookie que contiene el token
    res.clearCookie('token', {
        httpOnly: true, // Asegúrate de que coincidan las opciones de la cookie
        secure: true,
        samesite: 'strict'
    });

    // (Opcional) Eliminar cualquier otra información de sesión
    req.session.destroy();

    // Redirigir al usuario a la página de inicio de sesión
    res.status(200).redirect('/home/login');
};