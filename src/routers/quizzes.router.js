import { Router } from 'express';
import { QuizzesController } from '../controllers/quizzes.controller.js';

const ENDPOINT = '/quizzes';

const quizzesRouter = Router();

quizzesRouter.get(ENDPOINT, QuizzesController.findAll);
quizzesRouter.get(`${ENDPOINT}/:id`, QuizzesController.findById);
quizzesRouter.post(`${ENDPOINT}`, QuizzesController.submitAnswer);

export { quizzesRouter };

