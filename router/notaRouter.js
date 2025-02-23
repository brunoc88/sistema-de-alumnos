const express = require('express');
const router = express.Router();
const notaController = require('../controller/notaController');
const {verifyToken, verifyRole} = require('../middlewares/permisos');

router.get('/crear/:id/:materia',verifyToken,verifyRole('Admin'),notaController.crearNota);

router.post('/alta',verifyToken,verifyRole('Admin'),notaController.altaNota);

router.get('/notasDeAlumno/:id',verifyToken,verifyRole('Admin'),notaController.notasDeAlumno);

router.get('/misNotas/:id',verifyToken,verifyRole('Estudiante'),notaController.notasDeAlumno);


module.exports = router;
