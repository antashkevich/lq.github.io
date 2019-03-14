$(document).ready(function () {

    // scroll menu
    if ($(this).scrollTop() > 820) {
        $('.header.sticky').css('display', 'block')
    }
    $(window).scroll(function () {
        if ($(this).scrollTop() > 800) {
            $('.header.sticky').fadeIn(500);
        } else {
            $('.header.sticky').fadeOut(500);
        }
    });

    // scroll to anchor
    let $page = $('html, body');
    $('a[href*="#"]').bind('click', function (e) {
        e.preventDefault(); // prevent hard jump, the default behavior

        var target = $(this).attr("href");
        $('html, body').stop().animate({
            scrollTop: $(target).offset().top
        }, 600, function () {
            location.hash = target; //attach the hash (#jumptarget) to the pageurl
        });

        return false;
    });

    // validation email
    function validateEmail(email) {
        let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    function validate() {
        let name = $('.form__name input').val();
        let message = $('.form__text textarea').val();
        let email = $('.form__email input').val();

        $('.form div').removeClass('error-message');

        if (!name) {
            $('.form__name').addClass('error-message');
        }
        if (!message) {
            $('.form__text').addClass('error-message');
        }
        if (!validateEmail(email)) {
            $('.form__email').addClass('error-message');
        }
        return false;
    }

    $('.form button').bind('click', validate);

    // show/hide popup
    let $pageBody = $('body');
    $('.open-popup').click(function (event) {
        event.preventDefault();

        let currentItem = this.parentNode.parentNode.dataset.id - 1;

        let numItems = document.querySelectorAll('.slider-nav .slider-item').length - 1;

        $('.popup-content').addClass('scaleIn');

        if (numItems < 5) {
            sliderControls(currentItem);
        }
        if (numItems > 4) {
            $('.popup-content').addClass('big-slider');
        }

        $('#popup').addClass('popup-show');

        getCurrentContent(currentItem);        

        $pageBody.addClass('popup-active');
    });
    $('.close-popup').click(function (event) {
        event.preventDefault();

        $('.popup-content').removeClass('scaleIn').addClass('scaleOut');

        setTimeout(function () {
            $('.popup-content').removeClass('scaleOut');
            $('#popup').removeClass('popup-show');
        }, 500);
        $pageBody.removeClass('popup-active');

    });

    // slider
    let teamMembersNum = $page.find('.slider-for .slider-item').length;

    if (teamMembersNum > 5) {
        $('.slider-for').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            fade: true,
            speed: 10,
            asNavFor: '.slider-nav'
        });
        $('.slider-nav').slick({
            slidesToShow: 5,
            slidesToScroll: 1,
            asNavFor: '.slider-for',
            centerMode: false,
            focusOnSelect: true,
            dots: true,
            arrows: true,
        });
    } else {        
        $('.slider-for').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            fade: true,
            speed: 10,
            asNavFor: '.slider-nav',
            draggable: false,
        });
        $('.slider-nav').slick({
            slidesToShow: 5,
            slidesToScroll: 1,
            asNavFor: '.slider-for',
            centerMode: false,
            focusOnSelect: true,
            dots: false,
            arrows: false,
        });
    };

    function changeCurrentContentFor(arr, id) {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].classList.contains('slick-current')) {
                arr[i].classList.remove('slick-current', 'slick-active');
                arr[i].style.zIndex = "998";
                arr[i].style.opacity = "0";
                break;
            }
        }
        arr[id].classList.add('slick-current', 'slick-active');
        arr[id].style.zIndex = "999";
        arr[id].style.opacity = "1";
    };

    function changeCurrentContentNav(arr, id) {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].classList.contains('slick-current')) {
                arr[i].classList.remove('slick-current', 'slick-active');
                break;
            }
        }
        arr[id].classList.add('slick-current', 'slick-active');
    };

    function getCurrentContent(id) {
        let slidesArrFor = $('.slider-for').slick('getSlick').$slides;
        let slidesArrNav = $('.slider-nav').slick('getSlick').$slides;

        changeCurrentContentFor(slidesArrFor, id);
        changeCurrentContentNav(slidesArrNav, id);

        sliderControlInit(id);
    };

    // slider control
    function sliderControlInit(id) {
        let sliderArrowPrev = $('.slider-prev');
        let sliderArrowNext = $('.slider-next');
        let arrows = $('.slider-arrow');
        let dots = $('.slider-dots li');

        for (let i = 0; i < arrows.length; i++) {
            arrows[i].classList.contains('disable') ? arrows[i].classList.remove('disable') : false;
        }
        if (id === 0) {
            sliderArrowPrev.addClass('disable');
        }
        if (id === 4) {
            sliderArrowNext.addClass('disable');
        }

        for (let i = 0; i < dots.length; i++) {
            dots[i].classList.contains('slick-active') ? dots[i].classList.remove('slick-active') : false;
        }
        dots[id].classList.add('slick-active');
    }

    let sliderControls = function (id) {
        let length = document.querySelectorAll('.slider-for .slider-item').length - 1;
        let sliderNav = document.querySelector('.slider-nav .slick-track');
        let slidesArrFor = $('.slider-for').slick('getSlick').$slides;
        let slidesArrNav = $('.slider-nav').slick('getSlick').$slides;

        let sliderArrows = document.querySelectorAll('.slider-arrow');
        let sliderArrowNext = document.querySelector('.slider-arrow.slider-next');
        let sliderArrowPrev = document.querySelector('.slider-arrow.slider-prev');

        let sliderDots = document.querySelectorAll('.slider-dots li');
        let sliderDotsContainer = document.querySelector('.slider-dots');

        let removeActiveDots = function () {
            for (let i = 0; i < sliderDots.length; i++) {
                if (sliderDots[i].classList.contains('slick-active')) {
                    id = i;
                    sliderDots[i].classList.remove('slick-active');
                }
            }
        };

        let removeDisableArrows = function () {
            for (let i = 0; i < sliderArrows.length; i++) {
                if (sliderArrows[i].classList.contains('disable')) {
                    sliderArrows[i].classList.remove('disable');
                }
            }
        };

        sliderDotsContainer.addEventListener('click', function (e) {
            let target = e.target;

            removeActiveDots();
            removeDisableArrows();

            if (target == sliderDotsContainer) {
                sliderDots[id].classList.add('slick-active');
                if (id === length) {
                    sliderArrowNext.classList.add('disable');
                }
                if (id === 0) {
                    sliderArrowPrev.classList.add('disable');
                }
            }
            while (target != sliderDotsContainer) {
                if (target.tagName === 'LI') {
                    target.classList.add('slick-active');
                    id = target.dataset.dot - 1;
                    if (id === length) {
                        sliderArrowNext.classList.add('disable');
                    }
                    if (id === 0) {
                        sliderArrowPrev.classList.add('disable');
                    }
                }
                target = target.parentNode;
            }

            changeCurrentContentFor(slidesArrFor, id);
            changeCurrentContentNav(slidesArrNav, id);
        });

        sliderNav.addEventListener('click', function (e) {
            let target = e.target;

            removeActiveDots();
            removeDisableArrows();

            if (target == sliderNav) {
                sliderDots[id].classList.add('slick-active');
            }

            while (target != sliderNav) {
                if (target.classList.contains('slick-active')) {
                    id = target.dataset.id - 1;
                    sliderDots[id].classList.add('slick-active');
                    if (id === length) {
                        sliderArrowNext.classList.add('disable');
                    }
                    if (id === 0) {
                        sliderArrowPrev.classList.add('disable');
                    }
                }
                target = target.parentNode;
            }
        });

        sliderArrowNext.addEventListener('click', function (e) {
            let target = e.target;
            let prevLastElem = length - 1;
            sliderArrowPrev.classList.remove('disable');

            removeActiveDots();

            if (id === prevLastElem) {
                id = id + 1;
                changeCurrentContentFor(slidesArrFor, id);
                changeCurrentContentNav(slidesArrNav, id);
                sliderDots[id].classList.add('slick-active');
                target.classList.add('disable');
                return;
            }
            if (id === length) {
                sliderDots[id].classList.add('slick-active');
                e.preventDefault();
                return;
            }

            id = id + 1;
            sliderDots[id].classList.add('slick-active');

            changeCurrentContentFor(slidesArrFor, id);
            changeCurrentContentNav(slidesArrNav, id);
        });

        sliderArrowPrev.addEventListener('click', function (e) {
            let target = e.target;
            sliderArrowNext.classList.remove('disable');

            removeActiveDots();

            if (id === 1) {
                id = id - 1;
                changeCurrentContentFor(slidesArrFor, id);
                changeCurrentContentNav(slidesArrNav, id);
                sliderDots[id].classList.add('slick-active');
                target.classList.add('disable');
                return;
            }
            if (id === 0) {
                sliderDots[id].classList.add('slick-active');
                e.preventDefault();
                return;
            }

            id = id - 1;
            sliderDots[id].classList.add('slick-active');

            changeCurrentContentFor(slidesArrFor, id);
            changeCurrentContentNav(slidesArrNav, id);
        });

    };

});

// menu scroll
$(window).scroll(function () {
    var scrollDistance = $(window).scrollTop();
    $('.section-anchor').each(function (i) {
        if ($(this).position().top <= scrollDistance) {
            $('.sticky .header-nav a.header-nav__active').removeClass('header-nav__active');
            $('.sticky .header-nav a').eq(i).addClass('header-nav__active');
        }
    });
}).scroll();


// video player
window.onload = function () {
    let video = document.getElementById('video');
    let playButton = document.getElementById('play-pause');
    let playButtonBig = document.querySelector('.button-play-video');
    let controlsContainer = document.querySelector('.action-block-controls');
    let muteButton = document.getElementById('mute');
    let seekBar = document.getElementById('seek-bar');
    let range = document.querySelector('.active-range');

    let flipIcon = function (icon) {
        if (icon.classList.contains('flipped')) {
            icon.classList.remove('flipped');
            return;
        }
        icon.classList.add('flipped');
    };

    playButtonBig.addEventListener('click', function () {
        if (video.paused == true) {
            video.play();
            playButtonBig.classList.add('hide-btn');
            controlsContainer.classList.add('show-container');
        }
    });

    // Event listener for the play/pause button
    playButton.addEventListener('click', function () {
        if (video.paused == true) {
            video.play();
            flipIcon(this);
        } else {
            video.pause();
            flipIcon(this);
        }
    });

    muteButton.addEventListener('click', function () {
        if (video.muted == false) {
            video.muted = true;
            flipIcon(this);
        } else {
            video.muted = false;
            flipIcon(this);
        }
    });

    seekBar.addEventListener('change', function () {
        let time = video.duration * (seekBar.value / 100);
        video.currentTime = time;
    });

    video.addEventListener('timeupdate', function () {
        let value = (100 / video.duration) * video.currentTime;
        seekBar.value = value;
        range.style.width = value + '%';
    });

    seekBar.addEventListener('mousedown', function () {
        video.pause();
    });

    seekBar.addEventListener('mouseup', function () {
        if (playButton.classList.contains('flipped')) {
            video.pause();
        } else {
            video.play();
        }
    });
}
