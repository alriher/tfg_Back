import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import User from "./User.js"; // Importa el modelo User
import Space from "./Space.js"; // Importa el modelo Space

const Booking = sequelize.define(
  "Booking",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User, // Hace referencia al modelo User
        key: "id",
      },
    },
    spaceId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Space, // Hace referencia al modelo Space
        key: "id",
      },
    },
    assistants: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    dateStart: {
      type: DataTypes.DATE,
      allowNull: false,
      field: "date_start",
    },
    dateEnd: {
      type: DataTypes.DATE,
      allowNull: false,
      field: "date_end",
    },
  },
  {
    timestamps: true, // Añade las columnas `createdAt` y `updatedAt`
    tableName: "bookings", // Asegura que Sequelize usa el nombre correcto de la tabla
    underscored: true,
  }
);

// Establece las relaciones
Booking.belongsTo(User, { foreignKey: "userId", onDelete: "CASCADE" });
Booking.belongsTo(Space, { foreignKey: "spaceId", onDelete: "CASCADE" });

export default Booking;
