const express = require('express');
const router = express.Router();
const homeController = require('../controller/homeContoller');
const {verifyToken,verifyRole} = require('../middlewares/permisos');

router.post('/login',homeController.login);

router.get('/login',homeController.vistaLogin);

router.get('/index',verifyToken,verifyRole('Admin'),homeController.vistaIndex);

router.get('/logout',homeController.logout);

module.exports = router;