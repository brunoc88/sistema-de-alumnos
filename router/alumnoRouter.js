const express = require('express');
const router = express.Router();
const alumnoController = require('../controller/alumnoController');

router.post('/alta',alumnoController.altaAlumno);

module.exports = router;