import { header } from './components/header';
import { addActiveClassOnHover } from './components/onHover';
import { smooth } from './components/smooth';
import { intersectionObserver } from './components/intersectionObserver';

document.addEventListener('DOMContentLoaded', function () {
	header();
	smooth();
	addActiveClassOnHover();
	intersectionObserver();
});
