import { authorize } from '../services/auth.service.js';
import { getToastifyConfig } from '../utils/toastify.config.js';

const initAuthPage = () => {
	const authFormEl = document.querySelector('.auth__form');
	const authFormButtonEl = authFormEl.querySelector('.button_primary');

	const authType = location.pathname.split('/')[1];

	authFormEl.addEventListener('submit', async (e) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);

		try {
			authFormButtonEl.disabled = true;
			await authorize(authType, Object.fromEntries(formData));

			Toastify(getToastifyConfig('Вы успешно авторизовались', 'success')).showToast();
			await new Promise(resolve => setTimeout(resolve, 500));
			location.reload();
		}
		catch (e) {
			Toastify(getToastifyConfig(e.response.data.message, 'error')).showToast();
		}
		finally {
			authFormButtonEl.disabled = false;
		}
	});
};

initAuthPage();