import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import User from './User.js'; // Importa el modelo User
import Space from './Space.js'; // Importa el modelo Space

const Booking = sequelize.define('Booking', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User, // Hace referencia al modelo User
      key: 'id',
    },
  },
  space_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Space, // Hace referencia al modelo Space
      key: 'id',
    },
  },
  date_start: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  date_end: {
    type: DataTypes.DATE,
    allowNull: false,
  },
}, {
  timestamps: true, // Añade las columnas `createdAt` y `updatedAt`
  tableName: 'bookings', // Asegura que Sequelize usa el nombre correcto de la tabla
  underscored: false, // Usa camelCase en lugar de snake_case
});

// Establece las relaciones
Booking.belongsTo(User, { foreignKey: 'user_id', onDelete: 'CASCADE' });
Booking.belongsTo(Space, { foreignKey: 'space_id', onDelete: 'CASCADE' });

export default Booking;
