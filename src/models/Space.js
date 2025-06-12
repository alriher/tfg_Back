import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Space = sequelize.define(
  "Space",
  {
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
        model: "users", // nombre de la tabla referenciada
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
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
    provincia: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    localidad: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    lat: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    lon: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    img: {
      type: DataTypes.TEXT(255),
      allowNull: true,
    },
    isSlotBased: {
      // Nuevo campo
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      field: "is_slot_based",
    },
  },
  {
    timestamps: true, // Añade las columnas `createdAt` y `updatedAt`
    tableName: "spaces", // Asegura que Sequelize usa el nombre correcto de la tabla
    underscored: true,
  }
);

export default Space;
