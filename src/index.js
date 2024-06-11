import dotenv from 'dotenv';
import sequelize from './config/database.js';
import app from './server.js';

dotenv.config()

//app listen
const port = process.env.PORT || 3000;

console.log("PUERTOOO: " + port);

app.listen(port, async () => {
  console.log(`Server running on port ${port}`);
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
});
    
