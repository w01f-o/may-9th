import { PromotionsApi } from '../api/promotions.api.js';

const renderPromotionsPage = (promotions) => {
	const promotionContainerEl = document.querySelector('.promotions__row');

	promotionContainerEl.innerHTML = promotions.map((promotion) => `
		<div class="col-lg-4 col-md-6 col-12">
			<a class="promotions__item" href="/promotions/${promotion.id}">
				<div class="promotions__item-img">
					<img src="${promotion.thumbnail}" alt="${promotion.title}" />
				</div>
				<div class="promotions__item-info">
					<div class="promotions__item-label">Акция</div>
					<div class="promotions__item-title">${promotion.title}</div>
					<p class="promotions__item-text">${promotion.text}</p>
				</div>
			</a>
		</div>
	`).join('');
};

const initPromotionsPage = async () => {
	const promotions = await PromotionsApi.findAll();

	renderPromotionsPage(promotions);
};

initPromotionsPage();
