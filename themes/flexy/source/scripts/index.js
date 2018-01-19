
// scroll to page top on load
//jQuery(function($) {
//setTimeout(function() {
//$( 'html, body' ).animate( { scrollTop: 0 }, 0 );
// }, 250);
//});


jQuery(function ($) {

  //Init pictures carousel
  $('.slider').bxSlider({
    mode: 'fade',
    captions: false,
    responsive: true,
    preloadImages: 'visible',
    touchEnabled: true,
    adaptiveHeight: false,
    auto: true,
    shrinkItems: true,
    speed: 1000
  });

  // Create a new scratch card on load

  $('section.card-container').on('click', function () {
    $('section.card-container').find('#card').toggleClass('flipped');
  });


});

