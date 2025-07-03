import express from 'express';
import { UserController } from '../controllers/userController.js';
import { LoginMiddleware } from '../middlewares/login.middleware.js';

const controller = new UserController();
const router = express.Router();

console.log(controller);

// Ruta para crear un nuevo usuario
router.post('/', LoginMiddleware.authorize, (req, res) => {
  controller.create(req, res) 

});

router.delete('/:id', LoginMiddleware.authorize, LoginMiddleware.requireAdmin, (req, res) => {
  controller.delete(req, res)
});

router.put('/:id', LoginMiddleware.authorize, (req, res) => {
  controller.update(req, res)
});

router.patch('/:id', LoginMiddleware.authorize, LoginMiddleware.requireAdmin, (req, res) => {
  controller.patchUpdate(req, res);
});

router.patch('/profile/:id', LoginMiddleware.authorize, (req, res) => {
  controller.patchProfileUpdate(req, res);
});

router.get('/', LoginMiddleware.authorize, LoginMiddleware.requireAdmin, (req, res) => {
  controller.getPaginated(req, res);
});

router.get('/:id', LoginMiddleware.authorize, LoginMiddleware.requireAdmin, (req, res) => {
  controller.getById(req, res)
});

// Cambiar contraseña de usuario
router.post('/:id/change-password', LoginMiddleware.authorize, (req, res) => {
  controller.changePassword(req, res);
});

export default router;
