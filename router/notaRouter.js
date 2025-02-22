const express = require('express');
const router = express.Router();
const notaController = require('../controller/notaController');
const {verifyToken, verifyRole} = require('../middlewares/permisos');

router.get('/crear/:id/:materia',notaController.crearNota);

router.post('/alta',verifyToken,notaController.altaNota);

router.get('/notasDeAlumno/:id',notaController.notasDeAlumno);

module.exports = router;
