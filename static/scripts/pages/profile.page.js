const renderProfilePage = (user) => {
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
	`;
};

const initProfilePage = async () => {
	if (!localStorage.getItem('user')) {
		location.href = '/login';
	}

	renderProfilePage(JSON.parse(localStorage.getItem('user')));
};

initProfilePage();