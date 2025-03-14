import { PrismaClient } from '@prisma/client';
import cors from 'cors';
import 'dotenv/config';
import express, { json } from 'express';
import session from 'express-session';
import { join, resolve } from 'path';
import { authMiddleware } from './middlewares/auth.middleware.js';
import { errorsMiddleware } from './middlewares/errors.middleware.js';
import { protectedPagesMiddleware } from './middlewares/protected-pages.middleware.js';
import { authRouter } from './routers/auth.router.js';
import { moviesRouter } from './routers/movies.router.js';
import { pagesRouter } from './routers/pages.router.js';
import { quizzesRouter } from './routers/quizzes.router.js';
import { seed } from './utils/seed.js';

const PORT = process.env.PORT;
const API_PREFIX = '/api';

export const database = new PrismaClient();

const app = express();

app.use(cors({
	credentials: true
}));
app.use(json());
app.use(session({
	secret: process.env.AUTH_SECRET,
	resave: false,
	saveUninitialized: false,
	cookie: {
		secure: false,
		maxAge: 24 * 60 * 60 * 1000
	}
}));

app.use(protectedPagesMiddleware);

app.use(express.static(join(resolve(), 'static')));

app.use(API_PREFIX, authRouter);
app.use(API_PREFIX, moviesRouter);
app.use(API_PREFIX, authMiddleware, quizzesRouter);
app.use(pagesRouter);

app.use(errorsMiddleware);


app.listen(PORT, async () => {
	await seed();
	console.log(`Server is running on port http://localhost:${PORT}`);
});
