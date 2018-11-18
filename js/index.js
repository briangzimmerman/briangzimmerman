var $slide_in = $('.slide-in');
var $overlay = $('.overlay');
var $title = $('title');
var $sections = $('section, #parallax1');

// Open and close side-nav
$('.hamburger').click(toggleSlideIn);
$overlay.click(toggleSlideIn);
$('#close', $slide_in).click(toggleSlideIn);

// On mobile, don't use vh because it's jarring when scroll direction changes
if(window.innerWidth <= 560) {
    $('parallax1').css({height: window.outerHeight});
    $('section').css({'min-height': screen.availHeight});
}

setCurrentLink();

$(window).scroll(setCurrentLink);

// Go to section
$('.section-link').click(function() {
    scrollTo($(this).data('target'), 50);
});

$('.slide-in-link').click(function() {
    toggleSlideIn();
    scrollTo($(this).data('target'));
});

//--------------------------------- Functions ----------------------------------

function toggleSlideIn() {
    $slide_in.toggleClass('out');
    $overlay.toggleClass('show')
}

function setCurrentLink() {
    var last_top = 0;
    var last_height = 0;

    $sections.each(function() {
        var id = $(this).attr('id');
        var padding_top = $(this).css('padding-top');
        var padding_bottom = $(this).css('padding-bottom');
        var height = $(this).height() + px2num(padding_top) + px2num(padding_bottom);
        var top = $(this).offset().top;

        if($(window).scrollTop() >= last_top + (last_height - ($(window).height() / 3))
            && $(window).scrollTop() < top + (height - ($(window).height() / 3))
        ) {
            $('.section-link.current, #menu span.current').removeClass('current');
            $('#expanded span[data-target="'+id+'"], .slide-in-link[data-target="'+id+'"]').addClass('current');
            $title.text($(this).data('title'));
        }

        last_top = top;
        last_height = height;
    });
}

function px2num(pixels) {
    var num = pixels.substr(0, pixels.length - 2);
    return num * 1;
}

function scrollTo(id, nav_height) {
    nav_height = nav_height || 0;

    var scroll = $('#'+id).offset().top;

    $('html, body').animate({scrollTop: (scroll - nav_height) + 'px'});
}