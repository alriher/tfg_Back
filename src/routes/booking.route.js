import express from 'express';
import { BookingController } from '../controllers/bookingController.js';

const controller = new BookingController();
const router = express.Router();

console.log(controller);

// Ruta para crear un nuevo usuario
router.post('/createBooking', (req, res) => {
  controller.create(req, res)
});

// // Ruta para obtener un usuario por email
// router.get('/users/:email', handleGetUserByEmail);

export default router;