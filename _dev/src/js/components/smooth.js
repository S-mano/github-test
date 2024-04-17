/**
 * smooth scroll
 */
export function smooth() {
	$('a.smooth[href^="#"]').on('click', function () {
		const $speed = 500;
		const $href = $(this).attr('href');
		const $target = $($href === '#' || $href === '' ? 'html' : $href);
		const position = $target.offset().top - $('.js-header').outerHeight();
		$('html, body').animate({ scrollTop: position }, $speed, 'swing');
		return false;
	});
}
