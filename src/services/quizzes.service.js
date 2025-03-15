import { ApiError } from '../exceptions/api.error.js';
import { database } from '../index.js';

class QuizzesService {
	static async findAll() {
		return database.quiz.findMany({
			include: {
				questions: {
					include: {
						answers: true
					}
				}
			}
		});
	}

	static async findById(id) {
		const quiz = await database.quiz.findUnique({
			where: { id: Number(id) },
			include: {
				questions: {
					include: {
						answers: true,
					}
				}
			}
		});

		if (!quiz) {
			throw ApiError.NotFound('Quiz not found');
		}

		return quiz;
	}

	static async submitAnswer(userId, quizId, userAnswers) {
		const quiz = await this.findById(quizId);

		const score = userAnswers.reduce((total, { answerId, questionId }) => {
			const question = quiz.questions.find(q => q.id === questionId);
			if (question) {
				const correctAnswer = question.answers[question.correctAnswerNumber - 1];

				if (correctAnswer.id === answerId) {
					total += 1;
				}
			}

			return total;
		}, 0);

		return database.quizResult.create({ data: { userId, quizId, score, quizTotalScore: quiz.questions.length } });
	}
}

export { QuizzesService };

