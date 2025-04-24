import { database } from '../index.js';

export class CommentsService {
	static async findAll() {
		return database.comment.findMany();
	}

	static async findAllByMovieId(movieId) {
		return database.comment.findMany({ where: { movieId: Number(movieId) }, orderBy: { createdAt: 'desc' } });
	}

	static async create(dto, userId, movieId) {
		return database.comment.create({
			data: {
				...dto,
				user: {
					connect: { id: Number(userId) }
				},
				movie: {
					connect: { id: Number(movieId) }
				}
			}
		});
	}

	static async delete(id, userId) {
		return database.comment.delete({ where: { id: Number(id), user: { id: userId } } });
	}
}