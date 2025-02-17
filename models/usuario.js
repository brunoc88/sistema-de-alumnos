const {DataTypes} = require('sequelize');
const sequelize = require('../config/db');

const Usuario = sequelize.define('Usuario',{
    idUsuario:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nombre:{
        type: DataTypes.STRING,
        allowNull: false
    },
    apellido:{
        type: DataTypes.STRING,
        allowNull: false
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false
    },
    rol:{
        type: DataTypes.STRING,
        allowNull: false
    },
    estado:{
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
},{
    freezeTableName: true,
    timestamps: false
})


module.exports = Usuario;