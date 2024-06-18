import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Space = sequelize.define('Space', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
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
}, {
  timestamps: true, // Añade las columnas `createdAt` y `updatedAt`
  tableName: 'spaces', // Asegura que Sequelize usa el nombre correcto de la tabla
  underscored: true,
});

export default Space;
