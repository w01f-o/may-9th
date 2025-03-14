import { Router } from 'express';
import { join, resolve } from 'path';

export const pagesRouter = Router();

const pagesDirectory = join(resolve(), 'static');

pagesRouter.get('/favicon.ico', (_, res) => {
	res.sendFile(join(pagesDirectory, 'favicon.ico'));
});

pagesRouter.get('/', (_, res) => {
	res.sendFile(join(pagesDirectory, 'index.html'));
});

pagesRouter.get('/promotions/:id', (req, res) => {
	res.sendFile(join(pagesDirectory, 'promotion.html'));
});

pagesRouter.get('/movies/:id', (req, res) => {
	res.sendFile(join(pagesDirectory, 'movie.html'));
});

pagesRouter.get('/:page', (req, res) => {
	res.sendFile(join(pagesDirectory, `${req.params.page}.html`));
});;