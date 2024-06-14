//スクロールフェードイン
// const fadeIn = document.querySelectorAll(".fadeIn");
// const options = {
//   rootMargin: '0px',
//   threshold: 0.6
// };
// const observer = new IntersectionObserver(showElement, options);
// fadeIn.forEach((fadeIn) => {
//   observer.observe(fadeIn);
// });
// function showElement(entries) {
//   entries.forEach((entry) => {
//     if (entry.isIntersecting) {
//       entry.target.classList.add("active");
//     }
//   });
// }

// スクロール後にヘッダーの背景カラーを変更
// $(function () {
//   $(window).on('scroll', function () {
//     if ($('.p-top_mv').height()  < $(this).scrollTop()) {
//         $('.js-header').addClass('change-color');
//     } else {
//         $('.js-header').removeClass('change-color');
//     }
//   });
// });

// ***********ハンバーガーメニュー***********


$(function () {
  $('.ham-trigger').on('click', function () {
    $(this).toggleClass('ham_active');
    $('header').toggleClass('open_active');
    return false;
  });
});




//各Swiperイベントの初期化
document.addEventListener('DOMContentLoaded', (event) => {

  //トップMVスライダー
  const swiper = new Swiper(".swiper", {
    loop: true,
    effect: 'fade',
    speed: 2000, // ２秒かけながら次の画像へ移動
    autoplay: {
      delay: 4000, // ４秒後に次の画像へ
      disableOnInteraction: false, // ユーザー操作後に自動再生を再開する
    },
    allowTouchMove: false, // マウスでのスワイプを禁止
  });

  const swiper02 = new Swiper(".swiper02", {
    loop: true,
    slidesPerView: 3,
    slidesPerView: 'auto',
    spaceBetween: 30,
    speed: 1500,
    touchRatio: .03,
    autoplay: {
      delay: 3000,
    },
    breakpoints: {
      320: {
        slidesPerView: 1.2,
        spaceBetween: 30,
        speed: 1500,
      },
      // タブレット用の設定
      768: {
        slidesPerView: 2,
        spaceBetween: 20,
        speed: 1500,
      },
      1200: {
        slidesPerView: 3,
        spaceBetween: 30,
        speed: 1500,
      },
      1920: {
        slidesPerView: 4,
        spaceBetween: 30,
        speed: 1500,
      },
      2400: {
        slidesPerView: 5,
        spaceBetween: 30,
        speed: 1500,
      },
    },
    scrollbar: {
      el: '.swiper-scrollbar',
    },
  });
});




// ***********アコーティオン開閉***********

document.addEventListener("DOMContentLoaded", () => {
  setUpAccordion();
});

/**
 * ブラウザの標準機能(Web Animations API)を使ってアコーディオンのアニメーションを制御します
 */
const setUpAccordion = () => {
  const details = document.querySelectorAll(".js-details");
  const RUNNING_VALUE = "running"; // アニメーション実行中のときに付与する予定のカスタムデータ属性の値
  const IS_OPENED_CLASS = "is-opened"; // アイコン操作用のクラス名

  details.forEach((element) => {
    const summary = element.querySelector(".js-summary");
    const content = element.querySelector(".js-answer");

    summary.addEventListener("click", (event) => {
      // デフォルトの挙動を無効化
      event.preventDefault();

      // 連打防止用。アニメーション中だったらクリックイベントを受け付けないでリターンする
      if (element.dataset.animStatus === RUNNING_VALUE) {
        return;
      }

      // detailsのopen属性を判定
      if (element.open) {
        // アコーディオンを閉じるときの処理
        // アイコン操作用クラスを切り替える(クラスを取り除く)
        element.classList.toggle(IS_OPENED_CLASS);

        // アニメーションを実行
        const closingAnim = content.animate(closingAnimKeyframes(content), animTiming);
        // アニメーション実行中用の値を付与
        element.dataset.animStatus = RUNNING_VALUE;

        // アニメーションの完了後に
        closingAnim.onfinish = () => {
          // open属性を取り除く
          element.removeAttribute("open");
          // アニメーション実行中用の値を取り除く
          element.dataset.animStatus = "";
        };
      } else {
        // アコーディオンを開くときの処理
        // open属性を付与
        element.setAttribute("open", "true");

        // アイコン操作用クラスを切り替える(クラスを付与)
        element.classList.toggle(IS_OPENED_CLASS);

        // アニメーションを実行
        const openingAnim = content.animate(openingAnimKeyframes(content), animTiming);
        // アニメーション実行中用の値を入れる
        element.dataset.animStatus = RUNNING_VALUE;

        // アニメーション完了後にアニメーション実行中用の値を取り除く
        openingAnim.onfinish = () => {
          element.dataset.animStatus = "";
        };
      }
    });
  });
}

/**
 * アニメーションの時間とイージング
 */
const animTiming = {
  duration: 400,
  easing: "ease-out"
};

/**
 * アコーディオンを閉じるときのキーフレーム
 */
const closingAnimKeyframes = (content) => [
  {
    height: content.offsetHeight + 'px', // height: "auto"だとうまく計算されないため要素の高さを指定する
    opacity: 1,
  }, {
    height: 0,
    opacity: 0,
  }
];

/**
 * アコーディオンを開くときのキーフレーム
 */
const openingAnimKeyframes = (content) => [
  {
    height: 0,
    opacity: 0,
  }, {
    height: content.offsetHeight + 'px',
    opacity: 1,
  }
];


// 投稿ページのMoreボタン

document.addEventListener("DOMContentLoaded", function() {
// 初期表示アイテム数
let itemsToShow = 8;
const items = document.querySelectorAll('.item-card');
const totalItems = items.length;
let visibleItems = itemsToShow;

// 最初に表示するアイテム数を制御
items.forEach((item, index) => {
  if (index < itemsToShow) {
    item.style.display = 'block';
  } else {
    item.style.display = 'none';
  }
});


// 全てのアイテムが初めから表示されている場合は、ボタンを非表示にする
if (totalItems <= itemsToShow) {
  document.getElementById('load-more').style.display = 'none';
}

// 「さらに表示する」ボタンのクリックイベント
document.getElementById('load-more').addEventListener('click', function() {
  // 次のitemsToShow個のアイテムを表示する
  const nextToShow = visibleItems + itemsToShow;
  for(let i = visibleItems; i < nextToShow; i++) {
    if (i < totalItems) {
      items[i].style.display = 'block';
    }
  }
  visibleItems += itemsToShow;

  // もし全てのアイテムが表示されたら、ボタンを隠す
  if (visibleItems >= totalItems) {
    document.getElementById('load-more').style.display = 'none';
  }
  });
});



// 商品ページのMoreボタン

document.addEventListener("DOMContentLoaded", function() {
  // 初期表示アイテム数
  let itemsToShow = 20;
  const items = document.querySelectorAll('.item-card02');
  const totalItems = items.length;
  let visibleItems = itemsToShow;
  
  // 最初に表示するアイテム数を制御
  items.forEach((item, index) => {
    if (index < itemsToShow) {
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
  });
  
  // 全てのアイテムが初めから表示されている場合は、ボタンを非表示にする
  if (totalItems <= itemsToShow) {
    document.getElementById('load-more02').style.display = 'none';
  }
  
  // 「さらに表示する」ボタンのクリックイベント
  document.getElementById('load-more02').addEventListener('click', function() {
    // 次のitemsToShow個のアイテムを表示する
    const nextToShow = visibleItems + itemsToShow;
    for(let i = visibleItems; i < nextToShow; i++) {
      if (i < totalItems) {
        items[i].style.display = 'block';
      }
    }
    visibleItems += itemsToShow;
  
    // もし全てのアイテムが表示されたら、ボタンを隠す
    if (visibleItems >= totalItems) {
      document.getElementById('load-more02').style.display = 'none';
    }
    });
  });
  

// 卸ぺージのMoreボタン

document.addEventListener("DOMContentLoaded", function() {
  // 初期表示アイテム数
  let itemsToShow = 20;
  const items = document.querySelectorAll('.item-card02');
  const totalItems = items.length;
  let visibleItems = itemsToShow;
  
  // 最初に表示するアイテム数を制御
  items.forEach((item, index) => {
    if (index < itemsToShow) {
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
  });
  
  // 全てのアイテムが初めから表示されている場合は、ボタンを非表示にする
  if (totalItems <= itemsToShow) {
    document.getElementById('load-more03').style.display = 'none';
  }
  
  // 「さらに表示する」ボタンのクリックイベント
  document.getElementById('load-more03').addEventListener('click', function() {
    // 次のitemsToShow個のアイテムを表示する
    const nextToShow = visibleItems + itemsToShow;
    for(let i = visibleItems; i < nextToShow; i++) {
      if (i < totalItems) {
        items[i].style.display = 'block';
      }
    }
    visibleItems += itemsToShow;
  
    // もし全てのアイテムが表示されたら、ボタンを隠す
    if (visibleItems >= totalItems) {
      document.getElementById('load-more03').style.display = 'none';
    }
    });
  });

  // カート画面に遷移せずに商品をカートに追加するボタン

  // document.addEventListener('DOMContentLoaded', function() {
  //   var addToCartButton = document.querySelector('.add-to-cart-btn'); // カートに追加ボタンを取得
  //   var quantityInput = document.getElementById('quantity'); // 数量入力フィールドを取得
  //   var successMessage = document.querySelector('.success');// 成功時のテキスト要素を取得
  //   var errorMessage = document.querySelector('.error');// 失敗時のテキスト要素を取得
  
  //   addToCartButton.addEventListener('click', function() {
  //     var productId = this.getAttribute('data-product-id');// バリアントIDをbuttonタグのdata属性から取得
  //     var stockQuantity = parseInt(this.getAttribute('data-stock-quantity'), 10); // 在庫数をbuttonタグのdata属性から取得
  //     var quantity = parseInt(quantityInput.value, 10) || 1;// 入力された数量を整数に変換、デフォルトは１とする
  
  //     if (quantity > stockQuantity) {
  //       // 在庫数を超える数量が選択された場合
  //       successMessage.style.display = 'none';
  //       errorMessage.style.display = 'block';
  //       errorMessage.textContent = '在庫が不足しています。';
  //       return; // ここで処理を中断
  //     }
  
  //     // ShopifyのカートAPIが要求するデータフォーマットでリクエストするための準備
  //     var requestData = {
  //       items: [{
  //         id: productId, // どの商品をカートへ追加するのか
  //         quantity: quantity // 何個追加するのか
  //       }]
  //     };
  //     //上記をfetchAPIを使用して非同期的にサーバーリクエストを送信する
  //     fetch('/cart/add.js', { 
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json' 
  //       },
  //       body: JSON.stringify(requestData) //requestDataオブジェクトをJSON文字列に変換する
  //     })
  //     .then(response => {
  //       if (response.ok) {
  //         // 商品がカートに追加された場合
  //         successMessage.style.display = 'block'; // 成功メッセージを表示
  //         errorMessage.style.display = 'none'; // エラーメッセージを非表示
  //         // 成功メッセージを数秒後に自動で非表示にする
  //         setTimeout(function() {
  //           successMessage.style.display = 'none';
  //         }, 3000);
  //       } else {
  //         // 商品の追加に失敗した場合
  //         successMessage.style.display = 'none'; // 成功メッセージを非表示
  //         errorMessage.style.display = 'block'; // エラーメッセージを表示
  //         errorMessage.textContent = '商品の追加に失敗しました。';
  //       }
  //     })
  //     .catch(error => {
  //       console.error('エラーが発生しました。', error);
  //       // エラーが発生した場合
  //       successMessage.style.display = 'none'; // 成功メッセージを非表示
  //       errorMessage.style.display = 'block'; // エラーメッセージを表示
  //       errorMessage.textContent = '商品の追加に失敗しました。';
  //     });
  //   });
  // });

  document.addEventListener("DOMContentLoaded", function() {
    var modalTriggers = document.querySelectorAll('.modaal-btn');

    modalTriggers.forEach(function(trigger) {
        trigger.addEventListener('click', function(event) {
            event.preventDefault();

            var target = trigger.getAttribute('href');
            var modalContent = document.querySelector(target).innerHTML;

            var tempDiv = document.createElement('div');
            tempDiv.id = 'dynamic-modaal-box';
            tempDiv.innerHTML = modalContent;
            tempDiv.style.display = 'block';
            document.body.appendChild(tempDiv);

            $(tempDiv).modaal({
                before_open: function() {
                    // Remove existing dynamic modaal boxes
                    var existingModals = document.querySelectorAll('#dynamic-modaal-box');
                    existingModals.forEach(function(modal) {
                        modal.parentNode.removeChild(modal);
                    });
                },
                after_close: function() {
                    tempDiv.parentNode.removeChild(tempDiv);
                }
            });

            $(tempDiv).modaal('open');
        });
    });
});