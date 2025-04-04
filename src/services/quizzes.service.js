import { ApiError } from '../exceptions/api.error.js';
import { database } from '../index.js';

class QuizzesService {
	static async findAll() {
		const quiz = await database.quiz.findMany({
			include: {
				questions: {
					include: {
						answers: true
					}
				}
			}
		});

		return quiz.map(q => ({
			...q,
			questions: q.questions.map(({ correctAnswerNumber, ...question }) => question)
		}));
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

	static async findUserResults(userId) {
		return database.quizResult.findMany({
			where: { userId },
		});
	}

	static async submitAnswer(userId, quizId, userAnswers) {
		const quiz = await this.findById(quizId);

		let score = 0;
		const questionResults = [];

		userAnswers.forEach(({ answerId, questionId }) => {
			const question = quiz.questions.find(q => q.id === questionId);

			if (question) {
				const correctAnswer = question.answers[question.correctAnswerNumber - 1];
				const userAnswer = question.answers.find(a => a.id === answerId);
				const isCorrect = correctAnswer.id === answerId;

				if (isCorrect) {
					score += 1;
				}

				questionResults.push({
					questionId,
					questionText: question.text,
					userAnswerId: answerId,
					userAnswerText: userAnswer ? userAnswer.text : null,
					correctAnswerId: correctAnswer.id,
					correctAnswerText: correctAnswer.text,
					isCorrect
				});
			}
		});

		return database.quizResult.upsert({
			where: { userId_quizId: { userId, quizId } },
			update: {
				score,
				quizTotalScore: quiz.questions.length,
				name: quiz.name,
				details: JSON.stringify(questionResults)
			},
			create: {
				userId,
				quizId,
				score,
				quizTotalScore: quiz.questions.length,
				name: quiz.name,
				details: JSON.stringify(questionResults)
			}
		});
	}
}

export { QuizzesService };

