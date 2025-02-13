const {Sequelize} = require('sequelize');


const sequelize = new Sequelize('sistemalu', 'root', '', {
    host: 'localhost',
    dialect: 'mysql', 
    logging: console.log, 
});

// Probar la conexión
sequelize.authenticate()
    .then(() => {
        console.log('Conexión exitosa a la base de datos');
    })
    .catch(err => {
        console.error('No se pudo conectar a la base de datos:', err);
    });

module.exports = sequelize;
