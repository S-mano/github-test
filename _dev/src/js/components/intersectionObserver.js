//=======================================================
// スクロールアニメーション
//=======================================================

export function intersectionObserver() {
	// ターゲットを取得
	const observer_target = document.querySelectorAll('.js-scroll-animation');

	// ターゲットがある場合のみ処理を実行
	if (observer_target.length > 0) {
		observeAndActivate(observer_target);
	}
}

// 以下オブザーバー処理
export function observeAndActivate(target, additionalFunction) {
	const observer_options = {
		rootMargin: '0px 0px -24% 0px',
	};

	// ターゲットを監視
	target.forEach((el) => {
		const observer = new IntersectionObserver(handleIntersect, observer_options);
		observer.observe(el);
		checkInitialPosition(el);
	});

	// ターゲットが画面内に入ったらis-activeを付与
	function handleIntersect(entries, observer) {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				const target = entry.target;
				target.classList.add('is-active');

				if (additionalFunction) {
					additionalFunction(target);
				}
			}
		});
	}

	// 初期表示時に画面内に入っているかチェック
	function checkInitialPosition(el) {
		const rect = el.getBoundingClientRect();
		const windowHeight = window.innerHeight || document.documentElement.clientHeight;

		if (window.scrollY + windowHeight > rect.top + windowHeight * 1.5) {
			el.classList.add('is-active');

			if (additionalFunction) {
				additionalFunction(el);
			}
		}
	}
}
