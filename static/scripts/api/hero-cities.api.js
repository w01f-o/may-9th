import { baseAxios } from './axios.js';

class HeroCitiesApi {
	static async findAll() {
		const { data } = await baseAxios.get('/hero_cities');

		return data;
	}

	static async findById(id) {
		const { data } = await baseAxios.get(`/hero_cities/${id}`);

		return data;
	}
}

export { HeroCitiesApi };

