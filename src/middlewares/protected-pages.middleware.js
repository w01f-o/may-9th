const protectedPagesMiddleware = (req, res, next) => {
	const { path, session } = req;

	const protectedPages = ['/profile', '/quiz'];
	const authPages = ['/login', '/register'];

	if (!session.user && protectedPages.includes(path)) {
		return res.redirect('/login');
	}

	if (req.session.user && authPages.includes(path)) {
		return res.redirect('/profile');
	}

	next();
};

export { protectedPagesMiddleware };

