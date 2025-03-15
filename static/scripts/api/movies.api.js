import { baseAxios } from './axios.js';

class MoviesApi {
	static async findAll() {
		const { data } = await baseAxios.get('/movies');

		return data;
	}

	static async findOne(id) {
		const { data } = await baseAxios.get(`/movies/${id}`);

		return data;
	}
}

export { MoviesApi };

