import { Router } from 'express';
import { MoviesController } from '../controllers/movies.controller.js';

const ENDPOINT = '/movies';

const moviesRouter = Router();

moviesRouter.get(`${ENDPOINT}`, MoviesController.findAll);
moviesRouter.get(`${ENDPOINT}/:id`, MoviesController.findById);

export { moviesRouter };

