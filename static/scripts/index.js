const initBurgerMenu = () => {
	const burgerEl = document.querySelector('header .burger');
	const burgerButtonEl = burgerEl.querySelector('.burger__button');

	burgerButtonEl.addEventListener('click', () => {
		burgerEl.classList.toggle('burger_open');
		document.body.classList.toggle('body_backdrop');
	});

	document.body.addEventListener('click', (e) => {
		if (!e.target.closest('.burger')) {
			burgerEl.classList.remove('burger_open');
			document.body.classList.remove('body_backdrop');
		}
	});
};

document.documentElement.style.setProperty('--header-height', `${document.querySelector('header').offsetHeight}px`);

initBurgerMenu();