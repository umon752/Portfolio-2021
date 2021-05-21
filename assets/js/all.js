/* 滑鼠事件 */
$(window).mousemove(function (e) {
    $('.cursorFront').css('transform', `translate(${e.pageX - ($('.cursorFront').width())}px, ${e.pageY - ($('.cursorFront').height())}px)`);
    $('.cursorBack').css('transform', `translate(${e.pageX - ($('.cursorBack').width()-2)}px, ${e.pageY - ($('.cursorBack').height()-2)}px)`);
});

/* 點擊事件 */
$('.navToggle').click(function (e) {
    e.preventDefault();
    $('.navSide').toggleClass('active');
    $('.overlay').css('display', 'block');
})

$('.closeBtn').click(function (e) {
    e.preventDefault();
    $('.navSide').removeClass('active');
    $('.overlay').css('display', 'none');
})

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
});

$('.goTop').click(function (e) {
    e.preventDefault();
    $('html, body').animate({
        scrollTop: 0
    }, 1000);
})

/* 橫屏時 */
window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", function () {
    // if (window.orientation === 180 || window.orientation === 0) {
    //     // alert('豎屏狀態！');
    //     $('.js-cover-subTitle').addClass('mb-9');
    //     $('.cover__head').css('height', '15%');
    //     $('.cover__footer').css('height', '15%');
    //     $('.cover__body').css('height', '70%');
    //     $('.cover__body__icon ').css('position', 'absolute');
    // }
    if (window.orientation === 90 || window.orientation === -90) {
        alert('橫屏狀態！');
        $('.js-cover-subTitle').addClass('mb-2');
        $('.js-cover-subTitle').removeClass('mb-9');
        $('.cover__head').css('height', '13%');
        $('.cover__footer').css('height', '13%');
        $('.cover__body').css('height', '74%');
        $('.cover__body__icon ').css('position', 'static');
        $('.cover__body__icon ').css('animation', 'none');


        // height:1024px (pad)
        if ($(window).height() === 1024) {
            alert($(window).height() === 1024);
            $('.cover__body__stamp').css('width', '180px');
            $('.cover__body__code').css('width', '260px');
            $('.cover__body__sticker').css('width', '260px');
            $('.cover__body__semicircle1').css('width', '140px');
            $('.cover__body__semicircle2').css('width', '140px');
            $('.js-cover-title').addClass('font-size-lg-lg');
            $('.js-cover-title').removeClass('font-size-lg-xl');
            $('.js-cover-subTitle').addClass('h1-lg');
            $('.js-cover-subTitle').removeClass('font-size-lg-lg');
        }
    }
}, false);

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
            once: true
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
    $('.js-year').text(`YEAR：${year}`);
    $('.js-date').text(`DATE：${month} / ${date}`);
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
            $('.logo').css('display', 'block');
            setTimeout(function () {
                $('.logo').css('opacity', 1);
            }, 100);
            $('.goTop').css('display', 'flex');
            setTimeout(function () {
                $('.goTop').css('opacity', 1);
            }, 100);
        } else {
            $('.logo').css('display', 'none');
            setTimeout(function () {
                $('.logo').css('opacity', 0);
            }, 100);
            $('.goTop').css('display', 'none');
            setTimeout(function () {
                $('.goTop').css('opacity', 0);
            }, 100);
        }
    })
}