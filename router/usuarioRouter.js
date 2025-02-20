const express = require('express');
const router = express.Router();
const usuarioController = require('../controller/usuarioController');

router.get('/index',usuarioController.index);

router.get('/crear',usuarioController.crearUsuario);

router.post('/alta',usuarioController.altaUsuario);

router.patch('/baja/:id',usuarioController.bajaUsuario);

router.patch('/activar/:id',usuarioController.activarUsuario);

module.exports = router;