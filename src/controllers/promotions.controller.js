import { PromotionsService } from '../services/promotions.service.js';

class PromotionsController {
	static async findAll(req, res, next) {
		try {
			const data = await PromotionsService.findAll();

			res.status(200).json(data);
		} catch (error) {
			next(error);
		}
	}

	static async findOne(req, res, next) {
		try {
			const { id } = req.params;
			const data = await PromotionsService.findById(id);

			res.status(200).json(data);
		} catch (error) {
			next(error);
		}
	}
}

export { PromotionsController };

