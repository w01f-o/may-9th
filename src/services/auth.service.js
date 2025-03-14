import { hash, verify } from 'argon2';
import { ApiError } from '../exceptions/api.error.js';
import { database } from '../index.js';

class AuthService {
	static async login(dto, req) {
		const user = await database.user.findUnique({ where: { email: dto.email } });

		if (!user) {
			throw ApiError.BadRequest('Неверный логин или пароль');
		}

		if (!await verify(user.password, dto.password)) {
			throw ApiError.BadRequest('Неверный логин или пароль');
		}

		req.session.user = user;

		return {
			email: user.email,
			id: user.id,
			avatar: user.avatar,
			name: user.name
		};
	}

	static async register(dto, req) {
		const candidate = await database.user.findUnique({ where: { email: dto.email } });

		if (candidate) {
			throw ApiError.BadRequest('Пользователь с таким email уже зарегистрирован');
		}

		dto.password = await hash(dto.password);
		dto.avatar = {
			'MALE': 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
			'FEMALE': 'https://cdn-icons-png.flaticon.com/512/149/149072.png'
		}[dto.gender];

		const user = await database.user.create({ data: dto });

		req.session.user = user;

		return {
			email: user.email,
			id: user.id,
			avatar: user.avatar,
			name: user.name
		};
	}

	static async logout(req) {
		return new Promise((resolve, reject) => {
			req.session.destroy((err) => {
				if (err) {
					reject(err);
				}
				resolve();
			});
		});
	}
}

export { AuthService };

