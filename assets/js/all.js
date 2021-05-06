/* 滑鼠事件 */
$(window).mousemove(function (e) {
    console.log(e.pageY);
    $('.cursorFront').css('transform', `translate(${e.pageX - ($('.cursorFront').width() / 2)}px, ${e.pageY - ($('.cursorFront').height() / 2)}px)`);
    // $('.cursorFront').css('left', `${e.pageX - ($('.cursorFront').width() / 2)}px`);
    $('.cursorBack').css('transform', `translate(${e.pageX - ($('.cursorBack').width() / 2)}px, ${e.pageY - ($('.cursorBack').height() / 2)}px)`);
    // $('.cursorBack').css('left', `${e.pageX - ($('.cursorBack').width() / 2)}px`);
});

/* 點擊事件 */
$('.navToggle').click(function (e) {
    e.preventDefault();
    $('.navSide').toggleClass('active');
})

$('.closeBtn').click(function (e) {
    e.preventDefault();
    $('.navSide').removeClass('active');
})

$('.cover__icon').click(function (e) {
    e.preventDefault();
    $('.cover__seal').addClass('active');
    $('.cover__stamp').removeClass('active');

    setTimeout(function () {
        $('.cover__stamp').addClass('active');
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



/* 初始化 */
function init() {
    /* 印章日期 */
    stampDate();

    /* 進入畫面動畫 */
    opening();

    /* 載入 AOS */
    AOS.init({
        duration: 600,
        delay: 300,
        once: false
    });

    /* 載入 swiper */
    swiper();

    /* 開始滑動 */
    setTimeout(function () {
        scrolling();
    }, 2500);
}
init();



/* 印章日期 */
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
    $('.cover__stamp__text').html(`<p><span class="d-none d-md-block mb-1">DATE</span><span class="d-block mb-1">${month} / ${date}</span><span class="d-block">- ${year} -</span></p>`);
};

/* 進入畫面動畫 */
function opening() {
    // anime.js
    anime.timeline({
            loop: false
        })
        .add({
            targets: '.wrap',
            opacity: [0, 1],
            duration: 800,
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
            targets: '.cover__title',
            opacity: [0, 1],
            translateY: ['30%', 0],
            duration: 200,
            delay: 600,
            easing: 'linear'
        });

    anime.timeline({
            loop: false
        })
        .add({
            targets: '.cover__subtitle',
            opacity: [0, 1],
            translateY: ['-10%', 0],
            duration: 200,
            delay: 600,
            easing: 'linear'
        });

    anime.timeline({
            loop: false
        })
        .add({
            targets: '.cover__line',
            opacity: [0, 1],
            width: [0, '100%'],
            duration: 600,
            easing: 'linear'
        })
        .add({
            targets: '.cover__seal',
            opacity: [0, 1],
            translateY: ['-100%', '5px'],
            duration: 200,
            easing: 'linear'
        })
        .add({
            targets: '.cover__icon',
            opacity: [0, 1],
            duration: 200,
            delay: 200,
            easing: 'linear'
        })
        .add({
            targets: '.cover__ticket',
            opacity: [0, 1],
            translateX: ['-10%', '1px'],
            translateY: ['100%', '1px'],
            rotate: [0, '-3deg'],
            duration: 150,
            easing: 'linear'
        })
        .add({
            targets: '.cover__ticket',
            translateX: ['1px', 0],
            translateY: ['1px', 0],
            rotate: ['-3deg', 0],
            duration: 200,
            easing: 'linear'
        })
        .add({
            targets: '.cover__sticker',
            opacity: [0, 1],
            translateZ: ['1000px', 0],
            translateX: ['100%', '3px'],
            boxShadow: ['0 5px 15px rgba(0, 0, 0, 0.5)', '0 5px 15px rgba(0, 0, 0, 0)'],
            duration: 200,
            delay: 350,
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

    // lax.js
    lax.init();

    lax.addDriver('scrollY', function () {
        return window.scrollY
    });

    // lax.addDriver('protfolioH', function () {
    //     return $('#portfolio').height();
    // });

    // lax.addElements('.cover__seal', {
    //     scrollY: {
    //         translateY: [
    //             ['elInY', 'elCenterY', 'elOutY-1080'],
    //             {
    //                 500: [0, 0, 0],
    //                 1000: [0, 0, -200],
    //                 1400: [0, 0, -200]
    //             },
    //         ],
    //         opacity: [
    //             ['elInY', 'elCenterY', 'elOutY'],
    //             [1, 0]
    //         ]
    //     }
    // });

    // lax.addElements('.cover__sticker', {
    //     scrollY: {
    //         translateZ: [
    //             ["elInY", "elCenterY", "elOutY"],
    //             [0, 0, 100],
    //         ],
    //         opacity: [
    //             ["elInY", "elCenterY", "elOutY"],
    //             [1, 1, 0.5]
    //         ]
    //     }
    // });

    lax.addElements('.completeStamp img', {
        scrollY: {
            translateZ: [
                ["elInY", "elCenterY", "elOutY"],
                [200, 0, 0],
            ],
            opacity: [
                ["elInY", "elCenterY", "elOutY"],
                [0, 1, 0]
            ]
        }
    });
    
    // lax.addElements('.js-cardText-first', {
    //     scrollY: {
    //         translateX: [
    //             ["elInY", "elCenterY", "elOutY"],
    //             [100, 0, -200],
    //         ]
    //     }
    // });

    // lax.addElements('.js-cardText-second', {
    //     scrollY: {
    //         translateX: [
    //             ["elInY", "elCenterY", "elOutY"],
    //             [-200, 30, -200],
    //         ]
    //     }
    // });

    // lax.addElements('.js-cardText-third', {
    //     scrollY: {
    //         translateX: [
    //             ["elInY", "elCenterY", "elOutY"],
    //             [-200, 20, -200],
    //         ]
    //     }
    // });

    lax.addElements('.js-arrow', {
        scrollY: {
            translateX: [
                ["elInY", "elCenterY", "elOutY"],
                [500, 0, -200],
            ],
            opacity: [
                ["elInY", "elCenterY", "elOutY"],
                [0, 1, 0]
            ]
        }
    });

    // lax.addElements('.js-list ', {
    //     scrollY: {
    //         translateY: [
    //             ["elInY", "elCenterY", "elOutY"],
    //             [100, 0, -100],
    //         ],
    //         scale: [
    //             ["elInY", "elCenterY", "elOutY"],
    //             [0.9, 1, 0.9],
    //         ],
    //         opacity: [
    //             ["elInY", "elCenterY", "elOutY"],
    //             [0, 1, 0]
    //         ]
    //     }
    // })
}

/* swiper */
function swiper() {
    const swiper = new Swiper(".mySwiper", {
        slidesPerView: 1,
        centeredSlides: false,
        spaceBetween: 30,
        grabCursor: true,
        scrollbar: {
            el: ".swiper-scrollbar",
        },
        breakpoints: {
            375: {
                slidesPerView: 1.3
            },
            414: {
                slidesPerView: 1.5
            },
            768: {
                slidesPerView: 2.5,
                centeredSlides: true
            },
            1200: {
                slidesPerView: 3.5,
                centeredSlides: true
            },
        }
    });
}




// function scrolling() {
//     // $('.cover__sticker').addClass('animateme');
//     // $('.cover__ticket').addClass('animateme');


// }




// $('.cover__icon').mousemove(function (e) {
//     $('.cover__seal').addClass('animate');
// })
// $('.cover__icon').mouseleave(function (e) {
//     $('.cover__seal').removeClass('animate');
// })

