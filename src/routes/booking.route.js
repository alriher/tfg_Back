import express from 'express';
import { BookingController } from '../controllers/bookingController.js';
import { LoginMiddleware } from '../middlewares/login.middleware.js';

const controller = new BookingController();
const router = express.Router();

console.log(controller);

// Ruta para crear un nuevo usuario
router.post('/', LoginMiddleware.authorize, (req, res) => { // Cuando se haga un post a /, se va a ejecutar el método create del controlador. 
  controller.create(req, res) 

});

router.delete('/:id', LoginMiddleware.authorize, (req, res) => { // Cuando se haga un delete a /bookings/:id, se va a ejecutar el método delete del controlador.
  controller.delete(req, res)
});

router.put('/:id', LoginMiddleware.authorize, (req, res) => {
  controller.update(req, res);
});

router.get('/:id', LoginMiddleware.authorize, (req, res) => {
  controller.getBySpaceIdAndDate(req, res)
});

router.get('/user/:userId', LoginMiddleware.authorize, (req, res) => {
  controller.getByUserPaginated(req, res);
});

router.get('/space/:spaceId', LoginMiddleware.authorize, LoginMiddleware.requireSpaceAdmin, (req, res) => {
  controller.getBySpacePaginated(req, res);
});
// // Ruta para obtener un usuario por email
// router.get('/users/:email', handleGetUserByEmail);

export default router;