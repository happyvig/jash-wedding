
// scroll to page top on load
//jQuery(function($) {
//setTimeout(function() {
//$( 'html, body' ).animate( { scrollTop: 0 }, 0 );
// }, 250);
//});


jQuery(function ($) {

  // Start count down clock
  var today = new Date();
  var marriageDate = new Date('2018', '01', '26', '06', '30', '00');
  var diffInSecs = (marriageDate - today)/1000;

  var clock = $('.clock').FlipClock({
    clockFace: 'DailyCounter',
    autoStart: false,
    showSeconds: false,
    callbacks: {
      stop: function () {}
    }
  });
  clock.setTime(diffInSecs);
  clock.setCountdown(true);
  clock.start();


  // Init pictures carousel
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

  var luckyEggs = [
    'Congratulations !! You just got a chance to click an awesome selfie with us and post in your FB account :)',
    'Wear your favorite red colour dress to the function :)',
    'Gift mandatory ;)',
    'If coming as a couple, we wish to see you both in same color dress :)',
    'Wear your favorite black color dress to the function ;)',
    'Wear only ethnic or traditional dress to the function ;)',
    'Congratulations, you just got a lucky chance to take us out for lunch ;)',
    'Congratulations, you just got a lucky chance to take us out for dinner ;)',
    'Congratulations, you just got a lucky chance to take us out for a movie ;)',
    'Superb ! You just got a lucky chance to invite us to your home first !! ;)',
    'Bring a colourful wedding cake for the wedding ;)',
    'Click a funny selfie in the function and post in FB :)',
    'Lucky streak !! You just got a chance to have dinner with the couple in the marriage hall. Meet us in the back stage ;)',
    'Lucky you ! You got a chance to have breakfast with the couple in the marriage hall. Meet us in the back stage ;)',
    'Congrats ! You got a lucky chance to click the last selfie of the day with us ;)',
    'You will be the lucky person to click a selfie with us and have as your Whatsapp dp ;)',
    'You will be the lucky person to click a selfie with us and have as your Whatsapp daily status ;)',
    'Congratulations ! You are the lucky person to be bride/groom\'s friend on stage ;)'
  ];
  var randomLuckyEgg = luckyEggs[Math.floor(Math.random() * luckyEggs.length)];
  $('.flipcard-container').find('.back').text(randomLuckyEgg);

  // Card flipper
  $('section.card-container').on('click', function () {
    gtag('send', 'flipcard-flipped'); // google analytics
    $('section.card-container').find('#card').toggleClass('flipped');
  });

  // Begin heart beat after page load
  setTimeout(function () {
    $('.heart-pic').removeClass('fadeInUp').addClass('beat');
  }, 5000);

  // Reference: https://developers.google.com/analytics/devguides/collection/analyticsjs/user-timings

  // Feature detects Navigation Timing API support.
  if (window.performance) {
    // Gets the number of milliseconds since page load
    // (and rounds the result since the value must be an integer).
    var timeSincePageLoad = Math.round(performance.now());

    // Sends the timing hit to Google Analytics.
    gtag('send', 'timing', 'Asset Dependencies', 'load', timeSincePageLoad);
  }

});

