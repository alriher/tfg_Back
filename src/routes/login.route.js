import express from 'express';
import { LoginController } from '../controllers/loginController.js';

const controller = new LoginController();
const router = express.Router();

console.log(controller);

router.post('/token', (req, res) => { 
  controller.tokenService(req, res) 

});

router.post('/logout', (req, res) => { 
  controller.logout(req, res)
});

router.post('/login', (req, res) => {
  controller.login(req, res)
});

export default router;