import { MoviesService } from '../services/movies.service.js';

class MoviesController {
	static async findAll(_, res, next) {
		try {
			const data = await MoviesService.findAll();

			res.status(200).json(data);
		} catch (error) {
			next(error);
		}
	}

	static async findById(req, res, next) {
		try {
			const { id } = req.params;
			const data = await MoviesService.findById(id);

			res.status(200).json(data);
		} catch (error) {
			next(error);
		}
	}
}

export { MoviesController };

