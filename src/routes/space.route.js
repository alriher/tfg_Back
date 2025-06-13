import express from 'express';
import { SpaceController } from '../controllers/spaceController.js';
import { LoginMiddleware } from '../middlewares/login.middleware.js';

const controller = new SpaceController();
const router = express.Router();

// Ruta para crear un nuevo espacio
// Solo los space admins pueden crear espacios
router.post('/', LoginMiddleware.authorize, LoginMiddleware.requireSpaceAdmin, (req, res) => {
  controller.create(req, res) 

});

router.delete('/:id', LoginMiddleware.authorize, LoginMiddleware.requireSpaceAdmin, (req, res) => { // Cuando se haga un delete a /spaces/:id, se va a ejecutar el método delete del controlador.
  controller.delete(req, res)
});

router.put('/:id', LoginMiddleware.authorize, (req, res) => {
  controller.update(req, res)
});

router.get('/', (req, res) => {
  controller.getPaginated(req, res);
});

router.get('/:id', (req, res) => {
  controller.getById(req, res)
});

// Obtener espacios paginados por user_id
router.get('/user/:userId', LoginMiddleware.authorize, LoginMiddleware.requireSpaceAdmin, (req, res) => {
  controller.getByUserPaginated(req, res);
});

// // Ruta para obtener un usuario por email
// router.get('/users/:email', handleGetUserByEmail);

export default router;