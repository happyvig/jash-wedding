
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

  var luckyEggs = [
    'Congratulations, you just for a chance to click an awesome selfie with us and post in your FB account :)',
    'Wear your favorite red colour dress to the function :)',
    'Gift mandatory ;)',
    'If coming as a couple, we wish to see you both in same color dress :)',
    'Wear your favorite black color dress to the function ;',
    'Wear any ethnic or traditional dress to the function ;)',
    'Congratulations, you just got a lucky chance to take us out for lunch ;)',
    'Congratulations, you just got a lucky chance to take us out for dinner ;)',
    'Congratulations, you just got a lucky chance to take us out for a movie ;)',
    'Super ! you just got a lucky chance to invite us to your home first.',
    'Bring a colourful wedding cake for the wedding ;)',
    'Click a funny selfie in the function and post in FB :)',
    'Lucky streak !! You just got a chance to have dinner with the couple in the marriage hall. Meet us in the back stage ;)',
    'Lucky you ! You got a chance to have breakfast with the couple in the marriage hall. Meet us in the back stage ;)',
    'Congrats ! You got a lucky chance to click the last selfie of the day with us ;)',
    'You are the lucky person to click a selfie and have as your Whatsapp dp ;)',
    'You are the lucky person to click a selfie and have as your Whatsapp daily status ;)',
    'Congratulations ! You are the lucky person to be bride/groom\'s friend on stage ;)'
  ];
  var randomLuckyEgg = luckyEggs[Math.floor(Math.random() * luckyEggs.length)];
  $('.flipcard-container').find('.back').text(randomLuckyEgg);

  // Create a new scratch card on load

  $('section.card-container').on('click', function () {
    $('section.card-container').find('#card').toggleClass('flipped');
  });


});

