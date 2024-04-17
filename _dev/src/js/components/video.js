/**
 * video.jsでUIを共通化する
 */
export function videoJs() {
	const videoEl = document.getElementById('js-video');
	const playButtonBox = document.querySelector('.js-play-button-box');
	const playButton = document.querySelector('.js-play-button');

	if (!playButtonBox || !playButton || !videoEl) return;

	const video = videojs(videoEl, {
		autoplay: false, // 自動再生を無効
		fluid: true, // 動画コンテンツを親要素いっぱいに広げる
		loop: true, // 繰り返し再生無効
		controls: true, // コントローラ表示
		audioOnlyMode: true,
		aspectRatio: '16:9', // アスペクト比
		playsinline: true, // インライン再生
		controlBar: {
			remainingTimeDisplay: {
				displayNegative: false,
			},
		},
		preload: 'auto', // videoタグがロードされた瞬間に動画をダウンロード
		// playbackRates: [0.5, 1, 1.3, 1.5], // 再生速度の倍率
		languages: {
			ja: {
				Play: '再生',
				Pause: '停止',
				'Play Video': '再生',
				Mute: '消音',
				'Playback Rate': '再生速度',
				'Picture-in-Picture': 'ピクチャインピクチャ',
				Fullscreen: '全画面表示',
				'Non-Fullscreen': '通常表示',
			},
		}, // 日本語の言語対応
		language: 'ja', // 言語を日本語に設定
	});

	let pauseTimeout;
	// ビデオが一時停止または終了したときにボタンを表示する
	video.on('pause', function () {
		pauseTimeout = setTimeout(function () {
			playButtonBox.style.visibility = 'visible';
			playButtonBox.style.opacity = '1';
		}, 400);
	});

	video.on('ended', function () {
		playButtonBox.style.visibility = 'visible';
		playButtonBox.style.opacity = '1';
	});

	// ビデオが再生されたときにボタンを非表示にする
	video.on('play', function () {
		playButtonBox.style.visibility = 'hidden';
		playButtonBox.style.opacity = '0';
		clearTimeout(pauseTimeout); // ビデオが再生されたらタイマーをクリア
	});

	playButton.addEventListener('click', () => {
		video.play();
		const vjsPlayControl = document.querySelector('.vjs-play-control');
		if (!vjsPlayControl) return;
		vjsPlayControl.focus();
	});
}
