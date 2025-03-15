import { QuizApi } from '../api/quiz.api.js';

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

		return `
					<div class="profile__quiz-item">
						<div class="profile__quiz-item-name">${quizResult.name}</div>
						<div class="profile__quiz-item-score">
							${quizResult.score} / ${quizResult.quizTotalScore}
						</div>
						<div class="profile__quiz-progress">
							<div class="profile__quiz-progress-bar" style="width: ${progressPercent}%;"></div>
						</div>
					</div>
				`;
	}).join('')}
		</div>
	`;
};


const initProfilePage = async () => {
	if (!localStorage.getItem('user')) {
		location.href = '/login';
	}

	const quizResults = await QuizApi.findUserResults();

	renderProfilePage(JSON.parse(localStorage.getItem('user')), quizResults);
};

initProfilePage();