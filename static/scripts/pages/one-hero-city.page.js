import { HeroCitiesApi } from '../api/hero-cities.api.js';

const renderOneHeroCityPage = (heroCity) => {
	const heroCityContainerEl = document.querySelector('.hero-city__row');

	heroCityContainerEl.innerHTML = `
		<div class="col-12">
			<div class="page-title heroes__page-name">${heroCity.name}</div>
			<div class="heroes__page-img">
				<img src="${heroCity.image}" alt="${heroCity.name}" />
			</div>
			<div class="heroes__page-description">${heroCity.description}</div>
		</div>
	`;
};

const initOneHeroCityPage = async () => {
	const id = window.location.pathname.split('/').pop();
	const heroCity = await HeroCitiesApi.findById(id);

	document.title = `Города - герои | ${heroCity.name}`;

	renderOneHeroCityPage(heroCity);
};

initOneHeroCityPage()

