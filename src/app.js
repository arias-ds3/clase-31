const express = require("express")
const app = express()
//const path = require('path')//Importamos el modulo "path"
const bodyParser = require('body-parser')//importamos body-parser
const userRouter = require('../routes/userRoutes');// importar rutas de User
const morgan = require('morgan'); // Importación de Morgan
const cookieParser = require('cookie-parser'); // Importación de cookie-parser
const sessions = require('express-session'); // Importación de express-session
const unDia = 1000 * 60 * 60 * 24;

app.use(bodyParser.urlencoded({extended:true}));

app.set('view engine', 'ejs');

app.use(morgan('dev'));

app.use(sessions({
    secret: "123456",
    saveUninitialized:true,
    cookie: { maxAge: unDia },
    resave: false
}));

app.use(cookieParser());



app.use('/',userRouter)

app.get("/",(req,res)=>{
    res.render('pages/index.ejs')
})

app.get("/verificar-sesion",(req,res)=>{
    if(req.session.userid){
        return res.json({
            mensaje: "Sesión Activa",
            usuario: req.session.userid
        })
    }
    res.status(401).json({mensaje: "No hay sesión activa"})
})







const port = 3000;
app.listen(port,()=> console.log('Servidor ejecutandose en el puerto: ' + port))