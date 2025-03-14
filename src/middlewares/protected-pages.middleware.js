// import { ApiError } from '../exceptions/api.error.js';

const protectedPages = ['/profile', '/quiz'];

const protectedPagesMiddleware = (req, res, next) => {
	if (protectedPages.includes(req.path)) {
		return res.redirect('/login');
	}

	next();
};

export { protectedPagesMiddleware };

