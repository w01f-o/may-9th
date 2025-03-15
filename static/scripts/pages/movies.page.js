import { MoviesApi } from '../api/movies.api.js';

const renderMoviesPage = (movies) => {
	const moviesContainerEl = document.querySelector('.movies__row');

	moviesContainerEl.innerHTML = movies.map((movie) => `
		<div class="col-xl-2 col-lg-3 col-md-4 col-6">
			<a class="movies__item" href="/movies/${movie.id}">
				<div class="movies__item-image">
					<img src="${movie.thumbnail}" alt="${movie.name}" />
				</div>
				<div class="movies__item-name">${movie.name}</div>
			</a>
		</div>
	`).join('');
};

const initMoviesPage = async () => {
	const movies = await MoviesApi.findAll();

	renderMoviesPage(Array.from({ length: 50 }).fill(movies[0]));
};

initMoviesPage();