import { disableBodyScroll, clearAllBodyScrollLocks } from "body-scroll-lock";

 export function header () {
    /**
     * ナビゲーションメニュー要素を取得する
     */
    const navigationMenu = document.querySelector(".js-navigation-menu");

    /**
     * ハンバーガーメニューボタン要素を取得する
     */
    const hamburger = document.querySelector(".js-hamburger");

    // ナビゲーションメニュー要素が存在する場合
    if (navigationMenu) {
      // 初期状態で、768px以下の場合は aria-hidden を true に設定 (レスポンシブ)
      if (window.innerWidth <= 768) {
        navigationMenu.setAttribute("aria-hidden", "true");
      } else {
        navigationMenu.removeAttribute("aria-hidden");
      }

      // ウィンドウのリサイズイベント時に処理を実行
      window.addEventListener("resize", () => {
        // リサイズ後も 768px 以下の場合は aria-hidden を true に設定
        if (window.innerWidth <= 768) {
          navigationMenu.setAttribute("aria-hidden", "true");
        } else {
          navigationMenu.setAttribute("aria-hidden", "false");
        }
      });

      /* ハンバーガーメニューボタンを開く */
      const menuOpen = () => {
        disableBodyScroll(document.body); // body-scroll-lockの適用
        navigationMenu.classList.add("is-active");
        hamburger?.setAttribute("aria-label", "メニューを閉じる");
        hamburger?.setAttribute("aria-expanded", "true");
        navigationMenu.setAttribute("aria-hidden", "false");
      };

      /* ハンバーガーメニューボタンを閉じる */
      const menuClose = () => {
        clearAllBodyScrollLocks(); // body-scroll-lockの解除
        navigationMenu.classList.remove("is-active");
        hamburger?.setAttribute("aria-label", "メニューを開く");
        hamburger?.setAttribute("aria-expanded", "false");
        navigationMenu.setAttribute("aria-hidden", "true");
      };

      hamburger?.addEventListener("click", () => {
        if (hamburger.getAttribute("aria-expanded") === "true") {
          menuClose();
        } else {
          menuOpen();
        }
      });

      /* フォーカストラップ */
      const navigationLastItem = navigationMenu.lastElementChild;
      if (navigationLastItem === null) return;
      navigationLastItem.addEventListener("keydown", (e) => {
        if (!e.shiftKey && e.code === "Tab") {
          e.preventDefault();
          hamburger?.focus();
        }
      });

      /* ハンバーガーメニュー上でShift + Tabを押したときにナビゲーションメニューの最後の要素にフォーカスを移動する */
      hamburger?.addEventListener("keydown", (e) => {
        if (e.shiftKey && e.code === "Tab") {
          e.preventDefault();
          (navigationMenu.lastElementChild?.firstElementChild).focus();
        }
      });
    }

    /** ヘッダーメニューのドロップダウン */
    const dropDown = document.querySelector(".js-drop-down");
		const subMenu = document.querySelector(".js-sub-menu");

    if (!dropDown) return;
    /** 押下で`is-active`クラスを付与 */
    dropDown.addEventListener("click", (e) => {
      e.preventDefault();
      subMenu?.classList.toggle("is-active");
    });

		/** ドロップダウン外でクリックされたらメニューを閉じる  */
		document.addEventListener("click", (e) => {
			// クリックされた要素がドロップダウンメニュー内かどうか判定
			const isClickInsideDropDown = dropDown.contains(e.target);
			const isClickInsidesubMenu = subMenu.contains(e.target);

			// ドロップダウンメニュー以外をクリックした場合
			if (!isClickInsideDropDown && !isClickInsidesubMenu) {
				if (subMenu.classList.contains("is-active")) {
					subMenu.classList.remove("is-active");
				}
			}
		});
  };
