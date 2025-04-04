import { Router } from 'express';
import { HeroCitiesController } from '../controllers/hero-cities.controller.js';

const heroCitiesRouter = Router();

const ENDPOINT = '/hero_cities';

heroCitiesRouter.get(ENDPOINT, HeroCitiesController.findAll);

heroCitiesRouter.get(`${ENDPOINT}/:id`, HeroCitiesController.findById);

export { heroCitiesRouter };

