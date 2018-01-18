
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
  const scContainer = document.getElementById('js--sc--container')
  const sc = new ScratchCard('#js--sc--container', {
    scratchType: SCRATCH_TYPE.CIRCLE,
    containerWidth: scContainer.offsetWidth,
    containerHeight: 300,
    imageForwardSrc: '/images/scratcher.jpg',
    imageBackgroundSrc: '/images/carousel-r-1.jpg',
    clearZoneRadius: 30,
    percentToFinish: 90, // When the percent exceeds 90 on touchend event the callback will be exec.
    callback: function () {
      // alert('Success !!')
    }
  })
  sc.init().then(() => {
    sc.canvas.addEventListener('scratch.move', () => {
      this.percent = sc.getPercent().toFixed(2)
    })
  })



});

