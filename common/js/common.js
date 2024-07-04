$(function() {


    //タブ
    $('.js-tab-switch-item').on('click', function() {
        var thisTab = $(this).parents('.tab');
        var tabSwitch = thisTab.find(".js-tab-switch-item");
        var tabContents = thisTab.find('.tab-contents');
        tabSwitch.removeClass('active');
        $(this).addClass('active');

        var elmIndex = tabSwitch.index(this);
        tabContents.removeClass('active');
        tabContents.eq(elmIndex).addClass('active');
    });


    //アコーディオン
    $(".js-accordion-switch").on("click", function() {
        $(this).next().slideToggle(400);
    });


    //スライダー
    $(".js-slick").slick({
        autoplay: true,
        autoplaySpeed: 4000,
        // speed: 800,
        fade: true,
        dots: true,
	    arrows: false,
	    infinite: true,
	    pauseOnHover: false,   //hover スライドを一時停止しない　

    });


    //モーダル
    $('.js-modal').each(function() {
        var modal_open = $(this).children('.js-modal-open');
        var modal_close = $('.js-modal-close');
        var modal_content = $(this).children('.js-modal-content');

        // open
        modal_open.on('click', function(){
            modal_content.addClass('active');
            return false;
        });

        // close
        modal_close.on('click', function(){
            modal_content.removeClass('active');
        });

        // エリア外で閉じる
        $(document).on('click', function(e) {
            if (!$(e.target).closest('.modal-content-inner').length) {
                modal_content.removeClass('active');
            }
        });
    });
  });


//intersection observer
let TargetAnimation = document.querySelectorAll('.js-animation');
AnimationObserver();
function AnimationObserver() {
    let setAnimationOption;
    let myOptions = {
        root: null,
        rootMargin: '0px 0px',
        threshold: '0' //ターゲットが見えた際の比率（発火タイミング）
    };

    // IntersectionObserverの作成
    setAnimationOption = new IntersectionObserver(myIntersect, myOptions);
    // 対象要素を監視
    for (let n = 0; n < TargetAnimation.length; n++) {
        setAnimationOption.observe(TargetAnimation[n]);
    }
}

// 実行する関数
function myIntersect(entries, setAnimationOption) {
    entries.forEach((entry, n) => {
    const activeElement = entry.target;
        if (entry.isIntersecting) {
            activeElement.classList.add('active');
        }
    });
}
