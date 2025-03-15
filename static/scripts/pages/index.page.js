import { MoviesApi } from '../api/movies.api.js';
import { PromotionsApi } from '../api/promotions.api.js';

const renderPromotionsOnIndexPage = (promotions) => {
	const promotionsContainerEl = document.querySelector('.promotions-preview__row');

	promotionsContainerEl.innerHTML = promotions
		.slice(0, 3)
		.map((promotion) => `
			<div class="col-lg-3 col-md-6 col-12">
				<a class="promotions__item" href="/promotions/${promotion.id}">
					<div class="promotions__item-img promotions__item-img_simplify">
						<img src="${promotion.thumbnail}" alt="${promotion.title}" />
					</div>
					<div class="promotions__item-info">
						<div class="promotions__item-label">Акция</div>
						<div class="promotions__item-title">${promotion.title}</div>
						<div class="promotions__item-text">${promotion.text}</div>
					</div>
				</a>
			</div>
		`).join('');

	promotionsContainerEl.insertAdjacentHTML('beforeend', `
		<div class="col-lg-3 col-md-6 col-12">
			<a class="button_primary" href="/promotions">Открыть все</a>
		</div>
	`);
};

const renderMoviesOnIndexPage = (movies) => {
	const moviesSliderEl = document.querySelector('.movies-preview__swiper .swiper-wrapper');

	const isMobile = window.matchMedia('(max-width: 992px)').matches;
	const slideTag = isMobile ? 'a' : 'div';

	moviesSliderEl.innerHTML = movies
		.slice(0, 3)
		.map((movie) => `
			<div class="swiper-slide">
				<${slideTag} class="movies-preview__item" ${isMobile ? `href="/movies/${movie.id}"` : ''}>
					<div class="movies-preview__item-img">
						<img src="${movie.preview}" alt="${movie.name}" />
					</div>
					<div class="movies-preview__item-info">
						<div class="movies-preview__item-name">${movie.name}</div>
					</div>
					<a class="movies-preview__item-button button_primary" href="/movies/${movie.id}">
						Смотреть
					</a>
				</${slideTag}>
			</div>
		`).join('');

	new Swiper('.movies-preview__swiper', {
		navigation: {
			nextEl: '.movies-preview__button_next',
			prevEl: '.movies-preview__button_prev',
		},
		spaceBetween: 20,
		autoplay: {
			delay: 5000,
			disableOnInteraction: false,
		},
	});
};

const initIndexPage = async () => {
	const [promotions, movies] = await Promise.all([
		PromotionsApi.findAll(),
		MoviesApi.findAll(),
	]);

	renderPromotionsOnIndexPage(promotions);
	renderMoviesOnIndexPage(Array.from({ length: 50 }).fill(movies[0]));
};

initIndexPage();;