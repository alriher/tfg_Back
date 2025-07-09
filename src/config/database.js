import Sequelize from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const DATABASE_NAME = process.env.DB_NAME;
const DATABASE_USER = process.env.DB_USER;
const DATABASE_PASSWORD = process.env.DB_PASSWORD;
const DATABASE_HOST = process.env.DB_HOST;
const DATABASE_PORT = process.env.DB_PORT;

const sequelize = new Sequelize(
  DATABASE_NAME,
  DATABASE_USER,
  DATABASE_PASSWORD,
  {
    host: DATABASE_HOST,
    port: DATABASE_PORT,
    dialect: "mysql",
  }
);

sequelize.query('SELECT @@global.time_zone, @@session.time_zone;', {
  type: sequelize.QueryTypes.SELECT
}).then(result => {
  console.log('Zona horaria MySQL:', result);
}).catch(error => {
  console.error('Error al obtener zona horaria:', error);
});

export default sequelize;
