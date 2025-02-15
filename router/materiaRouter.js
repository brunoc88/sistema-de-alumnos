const express = require('express');
const router = express.Router();
const materiaController = require('../controller/materiaController');


router.get('/index',materiaController.crearMateria);

router.post('/alta',materiaController.altaMateria);

router.get('/editar/:id',materiaController.editarMateriaVista);

router.patch('/actualizar/:id',materiaController.actualizarMateria);

router.patch('/activar/:id',materiaController.activarMateria);

router.patch('/baja/:id',materiaController.bajaMateria);

module.exports = router;