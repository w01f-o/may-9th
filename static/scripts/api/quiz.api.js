import { baseAxios } from './axios.js';

class QuizApi {
	static async getQuizzes() {
		const { data } = await baseAxios.get('/api/quizzes');

		return data;
	}

	static async getQuiz(id) {
		const { data } = await baseAxios.get(`/api/quizzes/${id}`);

		return data;
	}

	static async submitAnswer(quizId, answers) {
		const { data } = await baseAxios.post('/api/quizzes/submit', { quizId, answers });

		return data;
	}
}

export { QuizApi };

