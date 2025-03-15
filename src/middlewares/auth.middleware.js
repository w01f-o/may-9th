import { ApiError } from '../exceptions/api.error.js';

const authMiddleware = (req, res, next) => {
	if (!req.session.user) {
		throw ApiError.Unauthorized();
	}

	next();
};

export { authMiddleware };

