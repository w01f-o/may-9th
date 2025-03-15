import { database } from '../index.js';

class PromotionsService {
	static async findAll() {
		return database.promotion.findMany();
	}

	static async findById(id) {
		return database.promotion.findUnique({ where: { id: Number(id) } });
	}
}

export { PromotionsService };

