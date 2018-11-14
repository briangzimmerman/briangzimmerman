var $hamburger = $('.hamburger');
var $slide_in = $('.slide-in');
var $overlay = $('.overlay');
var $slide_in_close = $('#close', $slide_in);
var $title = $('title');
var $parallax = $('#parallax1');
var titles = {
    'about_me': 'About Me',
    'contact': 'Contact Me',
    'resume': 'Experience',
    'skills': 'Skills',
    'parallax1': 'Brian Zimmerman'
};

$hamburger.click(toggleSlideIn);
$overlay.click(toggleSlideIn);
$slide_in_close.click(toggleSlideIn);

if(window.innerWidth <= 560) {
    $parallax.css({height: window.innerHeight});
    $('.section').css({height: window.innerHeight});
}

var positions = getPositions();
setCurrentLink();

$(window).resize(function() {
    positions = getPositions();
});

$(window).scroll(setCurrentLink);

$('.section-link').click(function() {
    var id = $(this).data('target');
    var padding = px2num($('#'+id).css('padding-top'));
    $('html, body').animate({scrollTop: (positions[id])+'px'});
});

$('.slide-in-link').click(function() {
    toggleSlideIn();
    var id = $(this).data('target');
    var padding = px2num($('#'+id).css('padding-top'));
    $('html, body').animate({scrollTop: (positions[id])+'px'});
});

//--------------------------------- Functions ----------------------------------

function toggleSlideIn() {
    $slide_in.toggleClass('out');
    $overlay.toggleClass('show')
}

function getPositions() {
    var positions = {};

    $('.section, .parallax').each(function() {
        positions[$(this).attr('id')] = $(this).offset().top;
    });

    return positions;
}

function setCurrentLink() {
    var last_top = 0;
    var last_height = 0;


    Object.keys(positions).forEach(function(id) {
        var $elem = $('#'+id);
        var padding_top = $elem.css('padding-top');
        var padding_bottom = $elem.css('padding-bottom');
        var height = $elem.height() + px2num(padding_top) + px2num(padding_bottom);
        var top = positions[id];

        if($(window).scrollTop() >= last_top + (last_height - ($(window).height() / 3))
            && $(window).scrollTop() < top + (height - ($(window).height() / 3))
        ) {
            $('.section-link.current, #menu span.current').removeClass('current');
            $('#expanded span[data-target="'+id+'"], .slide-in-link[data-target="'+id+'"]').addClass('current');
            $title.text(titles[id]);
        }

        last_top = positions[id];
        last_height = height;
    });
}

function px2num(pixels) {
    var num = pixels.substr(0, pixels.length - 2);
    return num * 1;
}