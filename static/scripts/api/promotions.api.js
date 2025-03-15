import { baseAxios } from './axios.js';

class PromotionsApi {
	static async findAll() {
		const { data } = await baseAxios.get('/promotions');

		return data;
	}

	static async findOne(id) {
		const { data } = await baseAxios.get(`/promotions/${id}`);

		return data;
	}
}

export { PromotionsApi };

