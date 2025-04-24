import { CommentsService } from '../services/comments.service.js';

export class CommentsController {
	static async findAll(_, res, next) {
		try {
			const data = await CommentsService.findAll();

			res.status(200).json(data);
		} catch (error) {
			next(error);
		}
	}

	static async findAllByMovieId(req, res, next) {
		try {
			const { movieId } = req.params;
			const data = await CommentsService.findAllByMovieId(movieId);

			res.status(200).json(data);
		} catch (error) {
			next(error);
		}
	}

	static async create(req, res, next) {
		try {
			const dto = req.body;
			const { movieId } = req.params;
			const { id: userId } = req.session.user;
			const data = await CommentsService.create(dto, userId, movieId);

			res.status(201).json(data);
		} catch (error) {
			next(error);
		}
	}

	static async delete(req, res, next) {
		try {
			const { id } = req.params;
			const { id: userId } = req.session.user;
			const data = await CommentsService.delete(id, userId);

			res.status(200).json(data);
		} catch (error) {
			next(error);
		}
	}
}