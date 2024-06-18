import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import User from './User.js'; // Importa el modelo User

const RefreshToken = sequelize.define('RefreshToken', {
  token: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User, // Hace referencia al modelo User
      key: 'id',
    },
  },
  expiryDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
}, {
  timestamps: true, // Añade las columnas `createdAt` y `updatedAt`
  tableName: 'refreshtoken', // Asegura que Sequelize usa el nombre correcto de la tabla
  underscored: true,
});

// Establece la relación con User
RefreshToken.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE' });

export default RefreshToken;
