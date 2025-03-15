import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller.js';

const ENDPOINT = '/auth';

const authRouter = Router();

authRouter.post(`${ENDPOINT}/login`, AuthController.login);
authRouter.post(`${ENDPOINT}/register`, AuthController.register);
authRouter.get(`${ENDPOINT}/logout`, AuthController.logout);

export { authRouter };

