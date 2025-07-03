import dotenv from 'dotenv';
import sequelize from './config/database.js';
import app from './server.js';

//Activa la lectura del archivo .env.
dotenv.config()

//app listen -- Define el puerto donde el servidor va a escuchar.
const port = process.env.PORT || 3000;

//Esto arranca el servidor. Le dice: "¡Escucha en este puerto por si alguien se conecta!"
app.listen(port, async () => {
  console.log(`Server running on port ${port}`);
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
});
    
