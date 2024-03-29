/* 滑鼠事件 */
$(window).mousemove(function (e) {
    let frontPosY = `${e.clientY - ($('.cursorFront').height() / 2)}px`;
    let frontPosX = `${e.clientX - ($('.cursorFront').width() / 2)}px`;

    let backPosY = `${e.clientY - ($('.cursorBack').height() / 2)}px`;
    let backPosX = `${e.clientX - ($('.cursorBack').width() / 2)}px`;

    $('.cursorFront').css('transform', `translateY(${frontPosY}) translateX(${frontPosX})`);
    $('.cursorBack').css('transform', `translateY(${backPosY}) translateX(${backPosX})`);
});

/* 點擊事件 */
// 開啟 sidebar
$('.navToggle').click(function (e) {
    e.preventDefault();
    $('.navSide').toggleClass('active');
    setTimeout(function () {
        $('.navSide__link').addClass('active');
    }, 400);
    $('.overlay').css('display', 'block');
})

// 關閉 sidebar
$('.closeBtn').click(function (e) {
    e.preventDefault();
    $('.navSide').removeClass('active');
    $('.navSide__link').removeClass('active');
    $('.overlay').css('display', 'none');
})
$('.overlay').click(function (e) {
    e.preventDefault();
    $('.navSide').removeClass('active');
    $('.navSide__title').removeClass('active');
    $('.navSide__link').removeClass('active');
    $('.overlay').css('display', 'none');
})

// 執行蓋章動態
$('.cover__body__icon').click(function (e) {
    e.preventDefault();
    $('.cover__body__stamp__wrap').removeClass('active');

    setTimeout(function () {
        $('.cover__body__stamp__wrap').addClass('active');
    }, 400);


    setTimeout(function () {
        $('.cover__seal').removeClass('active');
    }, 1000);
})

/* 滾動至區塊效果 */
$('.js-scrollAnimate').click(function (e) {
    e.preventDefault();
    let target = $(this).attr('href');
    let targetPos = $(target).offset().top;
    $('html, body').animate({
        scrollTop: targetPos
    }, 1000);
    $('.navSide').removeClass('active');
    $('.overlay').css('display', 'none');
});

$('.goTop').click(function (e) {
    e.preventDefault();
    $('html, body').animate({
        scrollTop: 0
    }, 1000);
})

let loadingAnimation;
/* Loading 動畫 */
function loading() {
    // anime.js
    const textWrapper = document.querySelector('.js-loading-text');
    textWrapper.innerHTML = textWrapper.textContent.replace(/([^\x00-\x80]|\w)/g, "<span class='letter d-inline-block'>$&</span>");

    loadingAnimation = anime.timeline({
            loop: true
        })
        .add({
            targets: '.loading__line',
            scaleY: [0, 1],
            opacity: [0.5, 1],
            easing: "easeOutExpo",
            duration: 600
        })
        .add({
            targets: '.loading__line',
            translateX: [0, document.querySelector('.js-loading-text').getBoundingClientRect().width + 10],
            easing: "easeOutExpo",
            duration: 600,
            delay: 100
        }).add({
            targets: '.loading__icon',
            opacity: [0, 1],
            translateX: [0, '-48px'],
            translateY: [0, '-48px'],
            duration: 350,
            easing: "easeOutExpo",
        }).add({
            targets: '.loading__icon',
            opacity: [1, 0],
            scale: [1, 10],
            duration: 450,
            easing: "easeOutExpo",
        });

    anime.timeline({
            loop: true
        })
        .add({
            targets: '.letter',
            duration: 700,
        }).add({
            targets: '.letter',
            opacity: [0, 1],
            easing: "easeOutExpo",
            duration: 500,
            offset: '-=775',
            delay: (el, i) => 34 * (i + 1)
        }).add({
            targets: ['.letter', '.loading__line'],
            opacity: [1, 0],
            duration: 700,
        });
}



/* 全部載入完畢執行 */
window.onload = function () {
    setTimeout(function () {
        // Loading 消失
        loadingFadeOut();

        // 進入畫面動畫
        opening();

        // body 的 overflow-y 拿掉 (loading 動畫消失後才可滾動頁面)
        $('body').css('overflow-y', 'auto');

        // 載入 AOS
        setTimeout(function () {
        AOS.init({
            duration: 600,
            delay: 300,
            once: false
        });
        }, 100);
    }, 2800);
}



/* 初始化 */
function init() {
    // Loading 動畫
    loading();

    // 日期
    stampDate();

    // 判斷是否為觸碰裝置
    isTouch();

    // 開始滑動
    scrolling();
}
init();



/* 日期 */
function stampDate() {
    const dateObject = new Date();
    let year = dateObject.getFullYear();
    let month = dateObject.getMonth() + 1;
    let date = dateObject.getDate();
    if (month < 10) {
        month = `0${month}`;
    }
    if (date < 10) {
        date = `0${date}`;
    }
    $('.cover__body__stamp__wrap__text').html(`<p><span class="d-none d-md-block mb-1 mb-md-2">DATE</span><span class="d-block mb-1 mb-md-2">${month} / ${date}</span><span class="d-block">${year}</span></p>`);
    $('.js-year').text(`${year}`);
    $('.js-date').text(`${month} / ${date}`);
};

/* 是否為觸碰裝置 */
function isTouch() {
    if ("ontouchstart" in window) {
        $('.cursorFront').css('display', 'none');
        $('.cursorBack').css('display', 'none');
    } else {
        $('.cursorFront').css('display', 'block');
        $('.cursorBack').css('display', 'block');
    }
}

/* Loading 消失*/ 
function loadingFadeOut() {
    loadingAnimation.pause();
    anime.timeline({
        loop: false
    }).add({
        targets: '.loading',
        opacity: [1, 0.5],
        translateX: [0, '100%'],
        duration: 1000,
        easing: "easeOutExpo",
        delay: 600
    });
}

/* 進入畫面動畫 */
function opening() {
    // anime.js
    anime.timeline({
            loop: false
        })
        .add({
            targets: '.wrap',
            opacity: [0, 1],
            duration: 100,
            easing: 'linear'
        })
        .add({
            targets: '.wrap__lineTop',
            opacity: [0, 1],
            width: [0, '100%'],
            duration: 300,
            easing: 'linear'
        })
        .add({
            targets: '.wrap__lineRight',
            opacity: [0, 1],
            height: [0, '100%'],
            duration: 500,
            easing: 'linear'
        })
        .add({
            targets: '.wrap__lineBottom',
            opacity: [0, 1],
            width: [0, '100%'],
            duration: 500,
            easing: 'linear'
        })
        .add({
            targets: '.wrap__lineLeft',
            opacity: [0, 1],
            height: [0, '100%'],
            duration: 500,
            easing: 'linear'
        })
        .add({
            targets: '.navToggle',
            opacity: [0, 1],
            translateX: ['30%', 0],
            duration: 200,
            easing: 'linear'
        });


    anime.timeline({
            loop: false
        })
        .add({
            targets: '.cover__line',
            opacity: [0, 1],
            width: [0, '100%'],
            duration: 200,
            delay: 800,
            easing: 'linear'
        })
        .add({
            targets: ['.cover__head', '.cover__footer'],
            opacity: [0, 1],
            duration: 300,
            easing: 'linear'
        })
        .add({
            targets: ['.js-cover-title', '.js-cover-subTitle'],
            opacity: [0, 1],
            translateY: ['30px', 0],
            duration: 200,
            easing: 'linear'
        })
        .add({
            targets: '.js-cover-result',
            opacity: [0, 1],
            duration: 100,
            easing: 'linear'
        })
        .add({
            targets: '.js-cover-semicircle2',
            opacity: [0, 1],
            translateY: ['30px', 0],
            duration: 150,
            delay: 210,
            easing: 'linear'
        })
        .add({
            targets: '.cover__body__stamp__wrap',
            opacity: [0, 1],
            translateZ: ['500px', 0],
            duration: 200,
            delay: 800,
            easing: 'linear'
        })
        .add({
            targets: '.js-cover-resultBtn',
            opacity: [0, 1],
            duration: 200,
            easing: 'linear'
        });

    anime.timeline({
            loop: false
        })
        .add({
            targets: ['.js-cover-code', '.js-cover-sticker'],
            opacity: [0, 1],
            translateY: ['30px', 0],
            zIndex: 99,
            duration: 300,
            delay: 1500,
            easing: 'linear'
        })
        .add({
            targets: '.js-cover-semicircle1',
            opacity: [0, 1],
            translateY: ['-30px', 0],
            duration: 150,
            easing: 'linear'
        });
}

/* 開始滾動 */
function scrolling() {
    // logo
    let position = $(window).scrollTop();
    $(window).scroll(function (e) {
        let scroll = $(window).scrollTop();
        if (scroll > position) {
            $('.logo').addClass('active');
            setTimeout(function () {
                $('.logo').css('opacity', 1);
                $('.logo').css('transform', 'translateY(0)');
            }, 100);
            $('.goTop').addClass('active');
            setTimeout(function () {
                $('.goTop').css('opacity', 1);
                $('.goTop').css('transform', 'translateY(0)');
            }, 100);
        } else {
            $('.logo').removeClass('active');
            setTimeout(function () {
                $('.logo').css('opacity', 0);
                $('.logo').css('transform', 'translateY(-10px)');
            }, 100);
            $('.goTop').removeClass('active');
            setTimeout(function () {
                $('.goTop').css('opacity', 0);
                $('.goTop').css('transform', 'translateY(10px)');
            }, 100);
        }
    })
}