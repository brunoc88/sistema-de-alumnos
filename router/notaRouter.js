const express = require('express');
const router = express.Router();
const notaController = require('../controller/notaController');

router.get('/crear/:id/:materia',notaController.crearNota)
module.exports = router;
