import express from 'express';
import { BookingController } from '../controllers/bookingController.js';

const controller = new BookingController();
const router = express.Router();

console.log(controller);

// Ruta para crear un nuevo usuario
router.post('/', (req, res) => { // Cuando se haga un post a /, se va a ejecutar el método create del controlador. 
  controller.create(req, res) 

});

router.delete('/:id', (req, res) => { // Cuando se haga un delete a /bookings/:id, se va a ejecutar el método delete del controlador.
  controller.delete(req, res)
});

router.put('/:id', (req, res) => {
  controller.update(req, res)
});
// // Ruta para obtener un usuario por email
// router.get('/users/:email', handleGetUserByEmail);

export default router;