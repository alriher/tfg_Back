import express from 'express';
import { SpaceController } from '../controllers/spaceController.js';
import { LoginMiddleware } from '../middlewares/login.middleware.js';

const controller = new SpaceController();
const router = express.Router();

console.log(controller);

// Ruta para crear un nuevo espacio
router.post('/', LoginMiddleware.authorize, (req, res) => { // Cuando se haga un post a /, se va a ejecutar el método create del controlador. 
  controller.create(req, res) 

});

router.delete('/:id', LoginMiddleware.authorize, (req, res) => { // Cuando se haga un delete a /spaces/:id, se va a ejecutar el método delete del controlador.
  controller.delete(req, res)
});

router.put('/:id', LoginMiddleware.authorize, (req, res) => {
  controller.update(req, res)
});

// // Ruta para obtener un usuario por email
// router.get('/users/:email', handleGetUserByEmail);

export default router;