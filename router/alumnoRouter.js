const express = require('express');
const router = express.Router();
const alumnoController = require('../controller/alumnoController');

router.get('/index',alumnoController.indexAlumno);

router.get('/crear',alumnoController.crearAlumno);

router.get('/materias/:id',alumnoController.alumnoMaterias);

router.post('/alta',alumnoController.altaAlumno);

router.patch('/baja/:id',alumnoController.bajaAlumno);

router.patch('/activar/:id',alumnoController.activarAlumno);

module.exports = router;