import { HeroCitiesService } from '../services/hero-cities.service.js';

class HeroCitiesController {
	static async findAll(_, res, next) {
		try {
			const data = await HeroCitiesService.findAll();

			res.status(200).json(data);
		} catch (error) {
			next(error);
		}
	}

	static async findById(req, res, next) {
		try {
			const { id } = req.params;
			const data = await HeroCitiesService.findById(id);

			res.status(200).json(data);
		} catch (error) {
			next(error);
		}
	}
}

export { HeroCitiesController };

