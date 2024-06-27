import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Space = sequelize.define('Space', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  space_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  capacity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  provincia : {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  localidad : {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  lat : {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  lon : {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  img : {
    type: DataTypes.TEXT(255),
    allowNull: true,
  },
}, {
  timestamps: true, // Añade las columnas `createdAt` y `updatedAt`
  tableName: 'spaces', // Asegura que Sequelize usa el nombre correcto de la tabla
  underscored: true,
});

export default Space;
