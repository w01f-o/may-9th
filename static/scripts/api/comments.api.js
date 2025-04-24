import { baseAxios } from '../api/axios.js';

class CommentsApi {
	static async findAllByMovieId(movieId) {
		const { data } = await baseAxios.get(`/comments/movie/${movieId}`);

		return data;
	}

	static async create(dto, movieId) {
		try {
			const response = await baseAxios.post(`/comments/movie/${movieId}`, dto);

			return response.data;
		} catch (e) {
			if (e.response.status === 401) {
				location.pathname = '/login';
			}

		}
	}

	static async delete(id) {
		await baseAxios.delete(`/comments/${id}`);
	}
}

export { CommentsApi };

