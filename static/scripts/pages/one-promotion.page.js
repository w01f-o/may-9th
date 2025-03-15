import { PromotionsApi } from '../api/promotions.api.js';

const renderOnePromotionPage = (promotion) => {
	const promotionContainerEl = document.querySelector('.promotions .promotions__page');
	const promotionTitleEl = document.querySelector('.promotions .promotions__page-title');

	promotionTitleEl.textContent = promotion.title;
	promotionContainerEl.innerHTML = `
		<div class="promotions__page-img">
			<img src="${promotion.thumbnail}" alt="${promotion.title}" />
		</div>
		<p class="promotions__page-text">${promotion.text}</p>
	`;

};

const initOnePromotionPage = async () => {
	const id = location.pathname.split('/').pop();
	const promotion = await PromotionsApi.findOne(id);

	document.title = `${document.title} | ${promotion.title}`;
	renderOnePromotionPage(promotion);
};

initOnePromotionPage();