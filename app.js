const express = require('express');
const app = express();
const sequelize = require('./config/db');

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

