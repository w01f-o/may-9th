import { baseAxios } from './axios.js';

class QuizApi {
	static async findAll() {
		const { data } = await baseAxios.get('/quizzes');

		return data;
	}

	static async findOne(id) {
		const { data } = await baseAxios.get(`/quizzes/${id}`);

		return data;
	}

	static async submitAnswer(quizId, answers) {
		const { data } = await baseAxios.post('/quizzes', { quizId, answers });

		return data;
	}
}

export { QuizApi };

