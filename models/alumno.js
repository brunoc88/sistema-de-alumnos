const {DataTypes} = require('sequelize');
const sequelize = require('../config/db');

const Alumno = sequelize.define('Alumno',{
    idAlumno :{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombre:{
        type: DataTypes.STRING,
        allowNull: false
    },
    apellido:{
        type: DataTypes.STRING,
        allowNull: false
    },
    dni:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    estado:{
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
},{
    freezeTableName: true,
    timestamps: false
})

module.exports = Alumno;