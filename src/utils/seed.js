import { readdir, stat } from 'fs/promises';
import { join, resolve } from 'path';
import { database } from '../index.js';

const seedQuizzes = async () => {
	const quizzes = [
		{
			name: 'Sample Quiz 1',
			questions: {
				create: [
					{
						text: 'Question 1',
						answers: {
							create: [
								{ text: 'Answer 1' },
								{ text: 'Answer 2' },
								{ text: 'Answer 3' }
							],
						},
						correctAnswerIndex: 2
					},
					{
						text: 'Question 2',
						answers: {
							create: [
								{ text: 'Answer A' },
								{ text: 'Answer B' },
								{ text: 'Answer C' }
							],
						},
						correctAnswerIndex: 1
					}
				]
			}
		},
	];

	await Promise.all(quizzes.map((quiz) => database.quiz.create({ data: quiz, include: { questions: { include: { answers: true } } } })));
};

const seedMovies = async () => {
	const staticDir = join(resolve(), 'static', 'assets', 'movies');
	const movieDirs = await readdir(staticDir);

	const result = await Promise.all(movieDirs.map(async (movieDir) => {
		const moviePath = join(staticDir, movieDir);
		const statInfo = await stat(moviePath);
		if (!statInfo.isDirectory()) {
			throw new Error('Внутри директории "movies" должны быть только директории с фильмами');
		}

		const files = await readdir(moviePath);
		const thumbnail = files.find(file => file.startsWith('thumbnail'));
		const video = files.find(file => file.startsWith('video'));

		if (!thumbnail || !video) {
			throw new Error(`Файлы для фильма "${movieDir}" не найдены`);
		}

		return {
			name: movieDir,
			thumbnail: `${process.env.SERVER_URL}/assets/movies/${movieDir}/${thumbnail}`,
			video: `${process.env.SERVER_URL}/assets/movies/${movieDir}/${video}`
		};
	}));

	await database.movie.createMany({ data: result });
};

const seed = async () => {
	await Promise.all([
		database.quiz.deleteMany(),
		database.answer.deleteMany(),
		database.question.deleteMany(),
		database.movie.deleteMany(),
		database.quizResult.deleteMany(),
	]);

	await Promise.all([seedMovies(), seedQuizzes()]);
};

export { seed };

