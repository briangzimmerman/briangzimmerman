var $hamburger = $('.hamburger');
var $slide_in = $('.slide-in');
var $overlay = $('.overlay');
var $slide_in_close = $('#close', $slide_in);

$hamburger.click(toggleSlideIn);
$overlay.click(toggleSlideIn);
$slide_in_close.click(toggleSlideIn);

//--------------------------------- Functions ----------------------------------

function toggleSlideIn() {
    $slide_in.toggleClass('out');
    $overlay.toggleClass('show')
}