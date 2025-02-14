const express = require('express');
const router = express.Router();
const materiaController = require('../controller/materiaController');


router.get('/index',materiaController.crearMateria);

router.post('/alta',materiaController.altaMateria);

router.patch('/baja/:id',materiaController.bajaMateria);

module.exports = router;