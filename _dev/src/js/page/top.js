import { videoJs } from '../components/video';
import { observeAndActivate } from '../components/intersectionObserver';

$(function () {
	//=======================================================
	// KVテキスト調整
	//=======================================================

	// 画面幅がPC以上の時はグループ化したテキストを解除させる
	if (window.innerWidth >= 992) {
		let kvMessageGroup = document.querySelectorAll('.js-kv-message-paragraph');

		kvMessageGroup.forEach(function (element) {
			element.outerHTML = element.innerHTML;
		});
	}

	//=======================================================
	// スクロールアニメーション
	//=======================================================

	// solution datalist用
	const observer_solution_target = document.querySelectorAll('.js-scroll-animation-count-up');

	// importしたobserveAndActivateを実行
	if (observer_solution_target.length > 0) {
		observeAndActivate(observer_solution_target, dataListCountUp);
	}

	//=======================================================
	// カウントアップ(ライブラリに合わせてjQuery使用)
	//=======================================================

	const $dataListTargets = $('.js-count-up-target');

	// ターゲットの幅と横幅を取得して、横幅は固定させる
	$dataListTargets.each(function () {
		const $dataListWidth = $(this).width();
		$(this).attr('style', 'width: ' + $dataListWidth + 'px');

		// 一旦0にしてからカウントアップできるようにする
		$(this).text('0');
	});

	// カウントアップ処理
	function dataListCountUp(target) {
		const $dataListTarget = $(target).find('.js-count-up-target');
		$dataListTarget.numerator({
			easing: 'linear',
			duration: 500,
			toValue: $dataListTarget.attr('data-num'),
		});
	}

	//=======================================================
	// VideoのUIを共通化するライブラリ
	//=======================================================
	videoJs();
});
