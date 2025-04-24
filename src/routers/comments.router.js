import { Router } from 'express';
import { CommentsController } from '../controllers/comments.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const ENDPOINT = '/comments';

export const commentsRouter = Router();

commentsRouter.get(ENDPOINT, CommentsController.findAll);
commentsRouter.get(`${ENDPOINT}/movie/:movieId`, CommentsController.findAllByMovieId);
commentsRouter.post(`${ENDPOINT}/movie/:movieId`, authMiddleware, CommentsController.create);
commentsRouter.delete(`${ENDPOINT}/:id`, authMiddleware, CommentsController.delete);