const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Materia = sequelize.define('Materia', {
    idMateria: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    estado: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    freezeTableName: true,
    timestamps: false
})

module.exports = Materia;