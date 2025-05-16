const express = require('express')//importamos express
const router = express.Router()//Ejecutamos el metodo router de express
const userForm = require('../controllers/userData')//importamos desde el controller userData
const { body } = require('express-validator')// importamos body de express validator

router.get('/usuarios', userForm.obtenerFormLogin)

router.post('/usuarios', userForm.procesarFormulario)

router.get("/usuarios/salir", userForm.destruirSesion);


module.exports = router;