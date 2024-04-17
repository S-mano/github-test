/** hoverしたらTargetにis-activeをつける */
export function addActiveClassOnHover() {
	const hoverTarget = [...document.querySelectorAll('.js-hover-target')];
	const hoverTrigger = [...document.querySelectorAll('.js-hover-trigger')];
	if (!hoverTarget | !hoverTrigger) return;
	hoverTrigger.map((trigger, index) => {
		trigger.addEventListener('mouseover', () => {
			hoverTarget[index].classList.add('is-active');
		});
		trigger.addEventListener('mouseout', () => {
			hoverTarget[index].classList.remove('is-active');
		});
	});
}
