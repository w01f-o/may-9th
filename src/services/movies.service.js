import { ApiError } from '../exceptions/api.error.js';
import { database } from '../index.js';

class MoviesService {
	static async findAll() {
		return database.movie.findMany();
	}

	static async findById(id) {
		const movie = await database.movie.findUnique({ where: { id: Number(id) } });

		if (!movie) {
			throw ApiError.NotFound('Movie not found');
		}

		return movie;
	}
};

export { MoviesService };

