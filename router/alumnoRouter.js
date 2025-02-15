const express = require('express');
const router = express.Router();
const alumnoController = require('../controller/alumnoController');

router.get('/crear',alumnoController.crearAlumno);

router.post('/alta',alumnoController.altaAlumno);

module.exports = router;