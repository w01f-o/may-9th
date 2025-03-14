import { baseAxios } from './axios.js';

class MoviesApi {
	static async getMovies() {
		const { data } = await baseAxios.get('/movies');

		return data;
	}

	static async getMovie(id) {
		const { data } = await baseAxios.get(`/movies/${id}`);

		return data;
	}
}

export { MoviesApi };

