const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Materia = require('./materia')

const Alumno = sequelize.define('Alumno', {
    idAlumno: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    apellido: {
        type: DataTypes.STRING,
        allowNull: false
    },
    dni: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    estado: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    freezeTableName: true,
    timestamps: false
})

Alumno.belongsToMany(Materia,
    {
        through: 'alumno-materia',
        foreignKey: 'idAlufk',
        otherKey: 'idMatfk',
        timestamps: false // Desactiva los timestamps
    }
)

Materia.belongsToMany(Alumno, 
    {
        through: 'alumno-materia',
        foreignKey: 'idMatfk',
        otherKey: 'idAlufk',
        timestamps: false // Desactiva los timestamps
    }
)


module.exports = Alumno;