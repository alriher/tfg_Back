import express from 'express';
import { SpaceController } from '../controllers/spaceController.js';

const controller = new SpaceController();
const router = express.Router();

console.log(controller);

// Ruta para crear un nuevo usuario
router.post('/createSpace', (req, res) => {
  controller.create(req, res)
});

// // Ruta para obtener un usuario por email
// router.get('/users/:email', handleGetUserByEmail);

export default router;