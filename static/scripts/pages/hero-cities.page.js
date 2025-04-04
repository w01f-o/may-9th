import { HeroCitiesApi } from '../api/hero-cities.api.js';

const renderHeroCitiesPage = (heroCities) => {
	const heroCitiesContainerEl = document.querySelector('.hero-city__row');

	heroCitiesContainerEl.innerHTML = heroCities.map((heroCity) => `
		<div class="col-lg-4 col-md-6 col-12">
			<a class="heroes__item" href="/hero_cities/${heroCity.id}">
				<div class="heroes__item-img">
					<img src="${heroCity.image}" alt="${heroCity.name}" />
				</div>
				<div class="heroes__item-name">${heroCity.name}</div>
			</a>
		</div>
	`).join('');
};

const initHeroCitiesPage = async () => {
	const heroCities = await HeroCitiesApi.findAll();

	renderHeroCitiesPage(heroCities);
};

initHeroCitiesPage();


