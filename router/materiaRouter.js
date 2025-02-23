const express = require('express');
const router = express.Router();
const materiaController = require('../controller/materiaController');
const {verifyToken, verifyRole} = require('../middlewares/permisos');


router.get('/index',verifyToken,verifyRole('Admin'),materiaController.crearMateria);

router.post('/alta',verifyToken,verifyRole('Admin'),materiaController.altaMateria);

router.get('/editar/:id',verifyToken,verifyRole('Admin'),materiaController.editarMateriaVista);

router.patch('/actualizar/:id',verifyToken,verifyRole('Admin'),materiaController.actualizarMateria);

router.patch('/activar/:id',verifyToken,verifyRole('Admin'),materiaController.activarMateria);

router.patch('/baja/:id',verifyToken,verifyRole('Admin'),materiaController.bajaMateria);

module.exports = router;