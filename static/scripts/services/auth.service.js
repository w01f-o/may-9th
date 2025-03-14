import { AuthApi } from '../api/auth.api.js';

const authorize = async (type, credentials) => {
	if (type !== 'login' && type !== 'register') {
		throw new Error('Invalid type of authorization');
	}

	try {
		const user = await AuthApi[type](credentials);

		localStorage.setItem('user', JSON.stringify(user));
	} catch (e) {
		console.log(e);
	}
};

export { authorize };

