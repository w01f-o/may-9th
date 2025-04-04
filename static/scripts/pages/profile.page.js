import { QuizApi } from '../api/quiz.api.js';
import { logout } from '../services/auth.service.js';
import { getToastifyConfig } from '../utils/toastify.config.js';

const renderProfilePage = (user, quizResults) => {
	const profileContainerEl = document.querySelector('.profile__row');

	profileContainerEl.innerHTML = `
		<div class="profile__card">
			<div class="profile__card-avatar">
				<img src="${user.avatar}" alt="Avatar" />
			</div>
			<div class="profile__card-info">
				<div class="profile__card-name">${user.name}</div>
				<div class="profile__card-email">${user.email}</div>
			</div>
		</div>
		<div class="profile__quiz">
		${quizResults.map((quizResult) => {
		const progressPercent = (quizResult.score / quizResult.quizTotalScore) * 100;
		const details = JSON.parse(quizResult.details);
		console.log(details);


		return `
			<a class="profile__quiz-item" href="/quiz">
				<div class="profile__quiz-item-name">${quizResult.name}</div>
				<div class="profile__quiz-item-score">
					${quizResult.score} / ${quizResult.quizTotalScore}
				</div>
				<div class="profile__quiz-progress">
					<div class="profile__quiz-progress-bar" style="width: ${progressPercent}%;"></div>
				</div>
				<div class="profile__quiz-details">
					${details.map((detail) => `
							<div class="profile__quiz-details-item">
								<div class="profile__quiz-details-question">${detail.questionText}</div>
								<div class="profile__quiz-details-answer">Правильный ответ: ${detail.correctAnswerText}</div>
								<div class="profile__quiz-details-answer">Ваш ответ: ${detail.userAnswerText}</div>
								<div class="profile__quiz-details-correctness ${detail.isCorrect ? 'profile__quiz-details-correctness_correct' : 'profile__quiz-details-correctness_incorrect'}">${detail.isCorrect ? 'Правильно' : 'Неправильно'}</div>
							</div>
						`).join('')}
				</div>
			</a>
		`;
	}).join('')}
		</div>
		<div class="col-12 profile__logout-col">
			<button class="profile__logout button_primary">Выйти</button>
		</div>
	`;
};

const initProfileListeners = () => {
	const profileContainerEl = document.querySelector('.profile__row');

	profileContainerEl.addEventListener('click', async (e) => {
		if (e.target.classList.contains('profile__logout')) {
			try {
				logout();

				Toastify(getToastifyConfig('Вы успешно вышли из аккаунта', 'success')).showToast();
				await new Promise(resolve => setTimeout(resolve, 500));
				location.reload();
			} catch (e) {
				Toastify(getToastifyConfig('Произошла неизвестная ошибка', 'error')).showToast();
			}
		}
	});
};

const initProfilePage = async () => {
	if (!localStorage.getItem('user')) {
		location.href = '/login';
	}

	const quizResults = await QuizApi.findUserResults();

	renderProfilePage(JSON.parse(localStorage.getItem('user')), quizResults);
	initProfileListeners();
};

initProfilePage();