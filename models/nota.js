const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Alumno = require('./alumno');
const Materia = require('./materia');
const Usuario = require('./usuario');


const Nota = sequelize.define('Nota',{
    idNota:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    calificacion:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    fecha:{
        type: DataTypes.DATEONLY,
        allowNull: false
    }
},{
    freezeTableName: true,
    timestamps: false
})


Nota.belongsTo(Materia,{
    foreignKey:'id_materia',
    targetKey: 'idMateria'
})

Materia.hasMany(Nota,{
    foreignKey: 'id_materia',
    sourceKey: 'idMateria'
})

Nota.belongsTo(Alumno,{
    foreignKey:'id_alumno',
    targetKey:'idAlumno'
})

Alumno.hasMany(Nota,{
    foreignKey:'id_alumno',
    sourceKey:'idAlumno'
})

Usuario.hasMany(Nota,{
    foreignKey: 'id_usuario',
    sourceKey: 'idUsuario'
})

Nota.belongsTo(Usuario,{
    foreignKey: 'id_usuario',
    targetKey: 'idUsuario'
})


module.exports = Nota;