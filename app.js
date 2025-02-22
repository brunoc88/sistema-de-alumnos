const express = require('express');
const app = express();
const sequelize = require('./config/db');
const path = require('path');
const methodOverride = require('method-override');
const session = require('express-session');//middleware para mensajes
const cookieParser = require('cookie-parser');//nos va a permitir guardar el token en las cookies

//rutas 
const alumnoRouter = require('./router/alumnoRouter');
const materiaRouter = require('./router/materiaRouter');
const notaRouter = require('./router/notaRouter');
const usuarioRouter = require('./router/usuarioRouter');
const homeRouter = require('./router/homeRouter');

// Configurar la carpeta pública
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(methodOverride('_method'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Usamos cookie-parser para manejar las cookies
app.use(cookieParser());

app.use(session({
  secret: 'clave-secreta', // Cambia esta clave a algo único
  resave: false,           // Evita guardar la sesión si no hubo cambios
  saveUninitialized: true,  // Guarda sesiones nuevas aunque no tengan datos
  cookie: { secure: false } // Si usas HTTPS, ponlo en true
}));

//limpiar mensajes
app.use((req, res, next) => {
  res.locals.message = req.session.message;
  res.locals.errorMessage = req.session.errorMessage;
  req.session.message = null;
  req.session.errorMessage = null;
  next();
});


app.use('/alumno',alumnoRouter);
app.use('/materia',materiaRouter);
app.use('/nota',notaRouter);
app.use('/usuario',usuarioRouter);
app.use('/home',homeRouter);

//primera pagina que se carga cuando arranca el sistema
app.get('/',(req,res)=>{
  return res.render('home/login');
});


// Sincronizar base de datos
sequelize.sync({})
  .then(() => {
    console.log('Base de datos sincronizada');
    console.log(sequelize.models);
  })
  .catch((err) => {
    console.error('Error al sincronizar la base de datos', err);
  });

const PORT = 3000;

app.listen(PORT,()=>{
    console.log(`Escuchando puerto: ${PORT}`);
})

