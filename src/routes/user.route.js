import express from 'express';
import { UserController } from '../controllers/userController.js';
import { LoginMiddleware } from '../middlewares/login.middleware.js';

const controller = new UserController();
const router = express.Router();

console.log(controller);

// Viendo server.js, se puede ver que todo lo que hay en userRoutes se va a montar en /users, por lo que la ruta completa sería /users/
// Ruta para crear un nuevo usuario
router.post('/', LoginMiddleware.authorize, (req, res) => { // Cuando se haga un post a /, se va a ejecutar el método create del controlador. 
  controller.create(req, res) 

});


router.delete('/:id', LoginMiddleware.authorize, (req, res) => { // Cuando se haga un delete a /users/:id, se va a ejecutar el método delete del controlador.
  controller.delete(req, res)
});

router.put('/:id', LoginMiddleware.authorize, (req, res) => {
  controller.update(req, res)
});

// // Ruta para obtener un usuario por email
// router.get('/users/:email', handleGetUserByEmail);

export default router;
