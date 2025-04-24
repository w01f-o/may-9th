import { CommentsApi } from '../api/comments.api.js';
import { MoviesApi } from '../api/movies.api.js';

const renderOneMoviePage = (movie) => {
	const movieContainerEl = document.querySelector('.movies__page');
	const movieTitleEl = document.querySelector('.movies__page-title');

	movieTitleEl.textContent = movie.name;
	movieContainerEl.innerHTML = `
		<div class="player">
			<video class="player__video" src="${movie.video}" controls playsinline></video>
		</div>
		<p class="movies__page-text">${movie.description}</p>
	`;
};

const renderMovieComments = (comments) => {
	const commentsContainerEl = document.querySelector('.comments__list');
	const user = JSON.parse(localStorage.getItem('user'));

	commentsContainerEl.innerHTML = comments.map((comment) => `
		<div class="col-12">
			<div class="comments__item">
				<div class="comments__item-wrapper">
					<div class="comments__item-author">Автор: ${user.name}</div>
					<div class="comments__item-text">${comment.text}</div>
					<div class="comments__item-date">Создано: ${new Date(comment.createdAt).toLocaleDateString()}</div>
				</div>
				${user.id === comment.userId && `
					<button data-id="${comment.id}" class="button_primary comments__item-delete" data-id="${comment.id}">Удалить</button>
					`}
			</div>
		</div>
	`).join('');
};

const initCommentsListeners = (movieId) => {
	const commentFormEl = document.querySelector('.comments__form');
	const user = JSON.parse(localStorage.getItem('user'));

	commentFormEl.addEventListener('submit', async (e) => {
		e.preventDefault();

		if (!user) {
			location.pathname = '/login';
		}

		const formData = new FormData(e.currentTarget);

		await CommentsApi.create(Object.fromEntries(formData), movieId);
		const comments = await CommentsApi.findAllByMovieId(movieId);

		renderMovieComments(comments);
	});

	const commentsContainerEl = document.querySelector('.comments__list');

	commentsContainerEl.addEventListener('click', async (e) => {
		if (e.target.classList.contains('comments__item-delete')) {
			await CommentsApi.delete(e.target.dataset.id);
			const comments = await CommentsApi.findAllByMovieId(movieId);

			renderMovieComments(comments);
		}
	});
};

const initOneMoviePage = async () => {
	const id = location.pathname.split('/').pop();
	const [movie, comments] = await Promise.all([MoviesApi.findOne(id), CommentsApi.findAllByMovieId(id)]);

	document.title = `${document.title} | ${movie.name}`;
	renderOneMoviePage(movie);
	renderMovieComments(comments);
	initCommentsListeners(id);
};

initOneMoviePage();