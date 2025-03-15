import { Router } from 'express';
import { PromotionsController } from '../controllers/promotions.controller.js';

const ENDPOINT = '/promotions';

const promotionsRouter = Router();

promotionsRouter.get(ENDPOINT, PromotionsController.findAll);
promotionsRouter.get(`${ENDPOINT}/:id`, PromotionsController.findOne);

export { promotionsRouter };

