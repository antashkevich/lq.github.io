$(document).ready(function () {
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
    $('a[href*="#"]').click(function () {

        $('a[href*="#"]').removeClass('header-nav__active');
        let attr = $(this).attr('href');
        $page.find("[href='" + attr + "']").addClass('header-nav__active');

        $page.animate({
            scrollTop: $($.attr(this, 'href')).offset().top - 10
        }, 2000);
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

        $('.popup-content').addClass('scaleIn');

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
    };

});


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
