
const { validationResult } = require("express-validator") // importamos validatrionResult
const { USUARIO_SESION_VALIDO } = require('../models/datoDeUsuario');
const bcrypt = require("bcrypt");// Importación de bcrypt


const users = [
    { nombre: 'Luciano', apellido: 'Pizarro', promedio: '9', curso: 'Diplo Fullstack', id: 1 },
    { nombre: 'Valentina', apellido: 'Gagliano', promedio: '9', curso: 'Diplo Fullstack', id: 2 },
    { nombre: 'Ezequiel', apellido: 'Melendres', promedio: '10', curso: 'Diplo Fullstack', id: 3 },
    { nombre: 'Miguel', apellido: 'Cardamone', promedio: '9', curso: 'Diplo Fullstack', id: 4 },
];


const obtenerFormLogin = (req, res) => {
    res.render('pages/form-login.ejs');
}

const procesarFormulario = (req, res) => {

    let esValidoElPasswordHasheado = bcrypt.compareSync(req.body.userPassword, USUARIO_SESION_VALIDO.password);

    if (req.body.userName == USUARIO_SESION_VALIDO.nombre && esValidoElPasswordHasheado) {

        session = req.session;
        session.userid = req.body.userName;
        res.render('pages/vistaUsuario.ejs', {
            userName: req.body.userName
        })
    }
}


const destruirSesion = (req, res) => {
    req.session.destroy();

    res.render('pages/index.ejs')
}

const userForm = {
    obtenerFormLogin,
    procesarFormulario,
    destruirSesion
};

module.exports = userForm;