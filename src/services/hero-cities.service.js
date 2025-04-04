import { ApiError } from '../exceptions/api.error.js';
import { database } from '../index.js';

class HeroCitiesService {
	static async findAll() {
		return database.heroCity.findMany();
	}

	static async findById(id) {
		const heroCity = await database.heroCity.findUnique({
			where: {
				id: Number(id),
			},
		});

		if (!heroCity) {
			throw ApiError.NotFound('Hero city not found');
		}

		return heroCity;
	}
}

export { HeroCitiesService };


