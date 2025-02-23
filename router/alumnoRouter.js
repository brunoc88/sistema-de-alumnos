const express = require('express');
const router = express.Router();
const alumnoController = require('../controller/alumnoController');
const {verifyToken, verifyRole} = require('../middlewares/permisos');

router.get('/index',verifyToken,verifyRole('Admin'),alumnoController.indexAlumno);

router.get('/crear',verifyToken,verifyRole('Admin'),alumnoController.crearAlumno);

router.get('/materias/:id',verifyToken,verifyRole('Admin'),alumnoController.alumnoMaterias);

router.post('/alta',verifyToken,verifyRole('Admin'),alumnoController.altaAlumno);

router.patch('/baja/:id',verifyToken,verifyRole('Admin'),alumnoController.bajaAlumno);

router.patch('/activar/:id',verifyToken,verifyRole('Admin'),alumnoController.activarAlumno);

router.get('/editar/:id',verifyToken,verifyRole('Admin'),alumnoController.editarAlumno);

router.put('/actualizar/:id',verifyToken,verifyRole('Admin'),alumnoController.actualizar);

module.exports = router;