import { baseAxios } from './axios.js';

class AuthApi {
	static async login(credentials) {
		const { data } = await baseAxios.post('/auth/login', credentials);

		return data;
	}

	static async register(credentials) {
		const { data } = await baseAxios.post('/auth/register', credentials);

		return data;
	}

	static async logout() {
		await baseAxios.post('/auth/logout');
	}
}

export { AuthApi };

