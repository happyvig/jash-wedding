
// scroll to page top on load
//jQuery(function($) {
   //setTimeout(function() {
        //$( 'html, body' ).animate( { scrollTop: 0 }, 0 );
  // }, 250);
//});

$(document).ready(function(){
  $('.slider').bxSlider({
    mode: 'fade',
    captions: false,
    responsive: true,
    preloadImages: 'visible',
    touchEnabled: true,
    adaptiveHeight: false,
    auto: true,
    shrinkItems: true
  });
});

