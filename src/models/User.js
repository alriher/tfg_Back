import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true, 
    },
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  
  password: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  birthdate: {
    type: DataTypes.DATE,
    allowNull: true, 
  },
  address: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  phone: {
    type: DataTypes.STRING(20),
    allowNull: true,
  },
  isAdmin: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  },
  isSpaceAdmin: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  },
}, {
  scopes: {
    withoutPassword: {
      attributes: { exclude: ['password'] }
    },
    withoutAdmin: {
      attributes: { exclude: ['isAdmin'] }
    }
  },
  timestamps: true,
  tableName: 'users',
  underscored: true,
});

export default User;
