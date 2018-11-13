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
    'parallax1': 'Brian Zimmerman'
};

$hamburger.click(toggleSlideIn);
$overlay.click(toggleSlideIn);
$slide_in_close.click(toggleSlideIn);

var positions = getPositions();
setCurrentLink();

if(window.innerWidth <= 560) {
    $parallax.css({height: window.innerHeight});
}

$(window).resize(function() {
    positions = getPositions();
});

$(window).scroll(setCurrentLink);

$('.section-link').click(function() {
    var id = $(this).data('target');
    $('html, body').animate({scrollTop: (positions[id] - 50)+'px'});
});

$('.slide-in-link').click(function() {
    toggleSlideIn();
    var id = $(this).data('target');
    $('html, body').animate({scrollTop: (positions[id] - 50)+'px'});
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
        var height = $elem.height();
        var top = positions[id];

        if($(window).scrollTop() >= last_top + (last_height - ($(window).height() / 2))
            && $(window).scrollTop() < top + (height - ($(window).height() / 2))
        ) {
            $('.section-link.current, #menu span.current').removeClass('current');
            $('#expanded span[data-target="'+id+'"], .slide-in-link[data-target="'+id+'"]').addClass('current');
            $title.text(titles[id]);
        }

        last_top = positions[id];
        last_height = height;
    });
}