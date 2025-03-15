import { QuizApi } from '../api/quiz.api.js';

let currentQuestion = 0;
let selectedAnswerId = null;
const result = [];

const renderQuizPage = (question) => {
	const quizContainerEl = document.querySelector('.quiz__row');

	quizContainerEl.innerHTML = `
		<div className="col-12">
			<div class="quiz__current">
				Вопрос ${currentQuestion + 1}
			</div>
		</div>
		<div class="quiz__question">${question.text}</div>
		${question.answers
			.map((answer) => `
				<div class="col-md-4 col-12 quiz__answer-col">
					<button class="quiz__answer" data-id="${answer.id}">${answer.text}</div>
				</div>
			`)
			.join('')}
		<div className="col-12">
			<div class="quiz__next">
				<button class="button_primary">Следующий вопрос</button>
			</div>
		</div>
	`;
};

const renderQuizResult = (result) => {
	const getQuestionWord = (count) => {
		const pluralRules = new Intl.PluralRules('ru');
		const forms = {
			one: 'вопрос',
			few: 'вопроса',
			many: 'вопросов',
			other: 'вопросов',
		};

		return forms[pluralRules.select(count)];
	};

	const quizContainerEl = document.querySelector('.quiz__row');

	const questionWord = getQuestionWord(result.score);
	const totalWord = getQuestionWord(result.quizTotalScore);

	quizContainerEl.innerHTML = `
		<div class="col-12">
			<div class="quiz__result">
				<div class="quiz__result-text">
					Вы ответили правильно на ${result.score} ${questionWord} из ${result.quizTotalScore}
				</div>
			</div>
		</div>
	`;
};

const initQuizListeners = ({ questions, id }) => {
	const quizContainerEl = document.querySelector('.quiz__row');

	quizContainerEl.addEventListener('click', async (e) => {
		if (e.target.classList.contains('quiz__answer')) {
			document.querySelectorAll('.quiz__answer').forEach((btn) => {
				btn.classList.remove('quiz__answer_selected');
				selectedAnswerId = null;
			});


			selectedAnswerId = e.target.dataset.id;
			e.target.classList.add('quiz__answer_selected');

			return;
		}

		if (e.target.closest('.quiz__next button') && selectedAnswerId) {
			if (currentQuestion >= questions.length) {
				return;
			}

			result.push({
				answerId: Number(selectedAnswerId),
				questionId: questions[currentQuestion].id
			});

			selectedAnswerId = null;
			currentQuestion += 1;

			if (currentQuestion < questions.length) {
				renderQuizPage(questions[currentQuestion]);
			} else {
				const quizResult = await QuizApi.submitAnswer(id, result);
				renderQuizResult(quizResult);

			}
		}
	});
};

const initQuizPage = async () => {
	const [quiz] = await QuizApi.findAll();

	renderQuizPage(quiz.questions[currentQuestion]);
	initQuizListeners(quiz);
};

initQuizPage();