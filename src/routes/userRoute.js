import { Router } from 'express';
import { loginController, postUserController } from '../controllers/userController.js';

const router = Router();

router.route('/register').post(postUserController);
router.route('/login').post(loginController);
export default router;

