const express = require('express');
const app = express();
const sequelize = require('./config/db');
const path = require('path');
const methodOverride = require('method-override');

//rutas 
const alumnoRouter = require('./router/alumnoRouter');
const materiaRouter = require('./router/materiaRouter');

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(methodOverride('_method'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));



app.use('/alumno',alumnoRouter);
app.use('/materia',materiaRouter);

app.use('/',(req,res)=>{
  res.send('Bienvenido de vuelta!')
})

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

