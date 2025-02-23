const express = require('express');
const router = express.Router();
const usuarioController = require('../controller/usuarioController');
const {verifyToken,verifyRole} = require('../middlewares/permisos');

router.get('/index',verifyToken,verifyRole('Admin'),usuarioController.index);

router.get('/crear',verifyToken,verifyRole('Admin'),usuarioController.crearUsuario);

router.post('/alta',verifyToken,verifyRole('Admin'),usuarioController.altaUsuario);

router.patch('/baja/:id',verifyToken,verifyRole('Admin'),usuarioController.bajaUsuario);

router.patch('/activar/:id',verifyToken,verifyRole('Admin'),usuarioController.activarUsuario);

router.get('/editar/:id',verifyToken,verifyRole('Admin'),usuarioController.editar);

router.put('/actualizar/:id',verifyToken,verifyRole('Admin'),usuarioController.actualizar);

module.exports = router;