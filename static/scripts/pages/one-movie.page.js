import { MoviesApi } from '../api/movies.api.js';

const renderOneMoviePage = (movie) => {
	const movieContainerEl = document.querySelector('.movies__page');
	const movieTitleEl = document.querySelector('.movies__page-title');

	movieTitleEl.textContent = movie.name;
	movieContainerEl.innerHTML = `
		<div class="player">
			<video class="player__video" src="${movie.video}" controls playsinline autoplay></video>
		</div>
		<p class="movies__page-text">${movie.name}</p>
	`;
};

const initOneMoviePage = async () => {
	const id = location.pathname.split('/').pop();
	const movie = await MoviesApi.findOne(id);

	document.title = `${document.title} | ${movie.name}`;
	renderOneMoviePage(movie);
};

initOneMoviePage();