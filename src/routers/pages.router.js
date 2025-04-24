import { Router } from 'express';
import { existsSync } from 'fs';
import { join, resolve } from 'path';

export const pagesRouter = Router();

const pagesDirectory = join(resolve(), 'static');

const sendFileOrNext = (_, res, next, path) => {
	if (existsSync(path)) {
		res.sendFile(path);
	} else {
		next();
	}
};

pagesRouter.get('/favicon.ico', (_, res, next) => {
	sendFileOrNext(_, res, next, join(pagesDirectory, 'favicon.ico'));
});

pagesRouter.get('/', (_, res, next) => {
	sendFileOrNext(_, res, next, join(pagesDirectory, 'index.html'));
});

pagesRouter.get('/promotions/:id', (_, res, next) => {
	sendFileOrNext(_, res, next, join(pagesDirectory, 'promotion.html'));
});

pagesRouter.get('/movies/:id', (_, res, next) => {
	sendFileOrNext(_, res, next, join(pagesDirectory, 'movie.html'));
});

pagesRouter.get('/hero_cities', (_, res, next) => {
	sendFileOrNext(_, res, next, join(pagesDirectory, 'hero-cities.html'));
});

pagesRouter.get('/hero_cities/:id', (_, res, next) => {
	sendFileOrNext(_, res, next, join(pagesDirectory, 'hero-city.html'));
});

pagesRouter.get('/:page', (req, res, next) => {
	sendFileOrNext(req, res, next, join(pagesDirectory, `${req.params.page}.html`));
});;

pagesRouter.get('/*', (req, res, next) => {
	sendFileOrNext(req, res, next, join(pagesDirectory, '404.html'));
});