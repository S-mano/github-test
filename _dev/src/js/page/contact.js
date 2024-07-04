document.addEventListener('DOMContentLoaded', function () {
	// ------------------------------------------------
	// プライバシーポリシーの同意
	// ------------------------------------------------
	const privacyPolicy = document.getElementById('privacy_policy');

	if (!privacyPolicy) return;

	privacyPolicy.addEventListener('change', function () {
		const isChecked = this.checked;
		document.querySelector('.js-submit').disabled = !isChecked;
	});
});

// ------------------------------------------------
// 郵便番号検索
// ------------------------------------------------

//該当フォーム
const hadr = document.querySelector('.h-adr');
let cancelFlag = true;

//イベントをキャンセル
const onKeyupCanceller = function (e) {
	if (cancelFlag) {
		e.stopImmediatePropagation();
	}
	return false;
};

// 郵便番号の入力欄
const postalcode = hadr.querySelectorAll('.p-postal-code'),
	postalField = postalcode[postalcode.length - 1];

//通常の挙動をキャンセルできるようにイベントを追加
postalField.addEventListener('keyup', onKeyupCanceller, false);

//ボタンクリック時
const btn = hadr.querySelector('.postal-search');
btn.addEventListener('click', function (e) {
	//キャンセルを解除
	cancelFlag = false;

	//発火
	let event;
	if (typeof Event === 'function') {
		event = new Event('keyup');
	} else {
		event = document.createEvent('Event');
		event = new Event('keyup', { bubbles: true, cancelable: true });
	}
	postalField.dispatchEvent(event);

	//キャンセルを戻す
	cancelFlag = true;
});
