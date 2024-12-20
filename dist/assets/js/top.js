$(function(){
  $(document).ready(function(){
    $('.slider').slick({
      autoplay: true,
      infinite: true,
      arrows: true,
      appendArrows: $('.arrow_box'),
      prevArrow: '<div class="slide-arrow prev-arrow"></div>',
      nextArrow: '<div class="slide-arrow next-arrow"></div>',
      dots: true, // ページネーションを有効化
      appendDots: $('.dots_box'), // dots を任意の場所に表示
      pauseOnFocus: false,
      pauseOnHover: false,
      autoplaySpeed: 2000,
      speed: 1000,
      centerMode: true,
      centerPadding: "18.43%",
      responsive: [
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            centerMode: false,
            centerPadding: "0"
          }
        }
      ]
    });
  });
});


$(function () {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');
  const closeButton = document.querySelector('#nav-links .close-menu');

  // ハンバーガーアイコンのクリック時
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('nav-active');
  });

  // メニュー内のリンククリック時
  document.querySelectorAll('#nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      if (hamburger.classList.contains('active')) {
        hamburger.classList.remove('active');
        navLinks.classList.remove('nav-active');
      }
    });
  });

  // 閉じるボタンのクリック時
  closeButton.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('nav-active');
  });
});


// マウスホバー - aboutエリア
function handleAboutTextSwitching() {
  const aboutTextarea = document.querySelector(".aboutus_textarea");
  const aboutTextEn = document.querySelector(".about_text01_en");
  const aboutTextJp = document.querySelector(".about_text01_jp");

  // デバイス判定（スマホのみタップ対応）
  const isMobile = window.matchMedia("(max-width: 768px)").matches;

  if (isMobile) {
    let isJpVisible = false; // 和文の表示状態を管理

    aboutTextarea.addEventListener("click", () => {
      if (!isJpVisible) {
        aboutTextEn.style.opacity = "0"; // 英文を非表示
        aboutTextJp.style.opacity = "1"; // 和文を表示
      } else {
        aboutTextEn.style.opacity = "1"; // 英文を表示
        aboutTextJp.style.opacity = "0"; // 和文を非表示
      }
      isJpVisible = !isJpVisible; // 状態をトグル
    });
  }
}

// マウスホバー - messageエリア
function handleMessageTextSwitching() {
  const messageTextarea = document.querySelector(".message_textarea");
  const messageTextEn = document.querySelector(".message_text01_en");
  const messageTextJp = document.querySelector(".message_text01_jp");

  // デバイス判定（スマホのみタップ対応）
  const isMobile = window.matchMedia("(max-width: 768px)").matches;

  if (isMobile) {
    let isJpVisible = false; // 和文の表示状態を管理

    messageTextarea.addEventListener("click", () => {
      if (!isJpVisible) {
        messageTextEn.style.opacity = "0"; // 英文を非表示
        messageTextJp.style.opacity = "1"; // 和文を表示
      } else {
        messageTextEn.style.opacity = "1"; // 英文を表示
        messageTextJp.style.opacity = "0"; // 和文を非表示
      }
      isJpVisible = !isJpVisible; // 状態をトグル
    });
  }
}

// 関数の呼び出し
document.addEventListener("DOMContentLoaded", () => {
  handleAboutTextSwitching();
  handleMessageTextSwitching();
});



// モーダル
document.addEventListener("DOMContentLoaded", function () {
  const artistPics = document.querySelectorAll(".artist_pic");
  const modals = document.querySelectorAll(".modal");
  const closeButtons = document.querySelectorAll(".modal_close");

  // モーダルを開く処理
  artistPics.forEach(pic => {
    pic.addEventListener("click", function () {
      const targetModal = document.getElementById(this.dataset.modal);
      if (targetModal) {
        targetModal.style.display = "block";
      }
    });
  });

  // モーダルを閉じる処理
  closeButtons.forEach(button => {
    button.addEventListener("click", function () {
      this.closest(".modal").style.display = "none";
    });
  });

  // モーダル外をクリックした時に閉じる処理
  modals.forEach(modal => {
    modal.addEventListener("click", function (e) {
      if (e.target === modal) {
        modal.style.display = "none";
      }
    });
  });
});



//Corporate profileエリア スタート

// マウスホバー・タップ切り替え用 - company_infoエリア
function handleCompanyInfoSwitching() {
  const enWrapper = document.querySelector(".company_info_en_wrapper");
  const jpWrapper = document.querySelector(".company_info_jp_wrapper");

  // デバイス判定（スマホの場合）
  const isMobile = window.matchMedia("(max-width: 768px)").matches;

  // 初期設定：JPエリアを非表示
  jpWrapper.style.opacity = "0";
  jpWrapper.style.display = "none";

  if (isMobile) {
    let isJpVisible = false; // 状態管理

    // ENエリアのタップでJP表示
    enWrapper.addEventListener("click", () => {
      if (!isJpVisible) {
        enWrapper.style.opacity = "0";
        enWrapper.style.display = "none";
        jpWrapper.style.display = "block";
        setTimeout(() => (jpWrapper.style.opacity = "1"), 50); // フェードイン
      }
      isJpVisible = true;
    });

    // JPエリアのタップでEN表示
    jpWrapper.addEventListener("click", () => {
      if (isJpVisible) {
        jpWrapper.style.opacity = "0";
        setTimeout(() => {
          jpWrapper.style.display = "none";
          enWrapper.style.display = "block";
          setTimeout(() => (enWrapper.style.opacity = "1"), 50); // フェードイン
        }, 300);
      }
      isJpVisible = false;
    });
  } else {
    // PCのホバー動作
    enWrapper.addEventListener("mouseenter", () => {
      enWrapper.style.opacity = "0";
      setTimeout(() => {
        enWrapper.style.display = "none";
        jpWrapper.style.display = "block";
        setTimeout(() => (jpWrapper.style.opacity = "1"), 50); // フェードイン
      }, 300);
    });

    jpWrapper.addEventListener("mouseleave", () => {
      jpWrapper.style.opacity = "0";
      setTimeout(() => {
        jpWrapper.style.display = "none";
        enWrapper.style.display = "block";
        setTimeout(() => (enWrapper.style.opacity = "1"), 50); // フェードイン
      }, 300);
    });
  }
}

// 関数の呼び出し
document.addEventListener("DOMContentLoaded", () => {
  handleCompanyInfoSwitching();
  handleMessageTextSwitching();
});


//スムーススクロール
$(document).ready(function () {
  $('a[href^="#"]').on('click', function (event) {
      event.preventDefault();

      // スクロール先のターゲットを取得
      var target = $(this.getAttribute('href'));

      if (target.length) {
          // ウィンドウ幅でヘッダーの高さを分ける
          var headerHeight;
          if ($(window).width() > 768) {
              // パソコン用ヘッダーの高さ
              headerHeight = $('.header').data('pc-height') || $('.header').outerHeight();
          } else {
              // スマホ用ヘッダーの高さ
              headerHeight = $('.header').data('mobile-height') || $('.header').outerHeight();
          }

          // スムーススクロールの実行
          $('html, body').animate({
              scrollTop: target.offset().top - headerHeight // ヘッダー分を差し引く
          }, 500, 'swing');
      }
  });
});