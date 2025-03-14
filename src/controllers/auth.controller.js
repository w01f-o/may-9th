import { AuthService } from '../services/auth.service.js';

class AuthController {
	static async login(req, res, next) {
		try {
			const dto = req.body;
			const data = await AuthService.login(dto, req);

			res.send(data);
		} catch (error) {
			next(error);
		}
	}

	static async register(req, res, next) {
		try {
			const dto = req.body;
			const data = await AuthService.register(dto, req);

			res.send(data);
		} catch (error) {
			next(error);
		}
	}

	static async logout(req, res, next) {
		try {
			await AuthService.logout(req);

			res.sendStatus(200);
		} catch (error) {
			next(error);
		}
	}
}

export { AuthController };

