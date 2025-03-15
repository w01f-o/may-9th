import { QuizzesService } from '../services/quizzes.service.js';

class QuizzesController {
	static async findAll(req, res, next) {
		try {
			const data = await QuizzesService.findAll();

			res.status(200).json(data);
		} catch (error) {
			next(error);
		}
	}

	static async findById(req, res, next) {
		try {
			const { id } = req.params;
			const data = await QuizzesService.findById(id);

			res.status(200).json(data);
		} catch (error) {
			next(error);
		}
	}

	static async findUserResults(req, res, next) {
		try {
			const data = await QuizzesService.findUserResults(req.session.user.id);

			res.status(200).json(data);
		} catch (error) {
			next(error);
		}
	}

	static async submitAnswer(req, res, next) {
		try {
			const { answers, quizId } = req.body;
			const data = await QuizzesService.submitAnswer(req.session.user.id, quizId, answers);

			res.status(200).json(data);
		} catch (error) {
			next(error);
		}
	}
}

export { QuizzesController };

