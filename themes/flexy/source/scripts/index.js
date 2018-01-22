
// scroll to page top on load
//jQuery(function($) {
//setTimeout(function() {
//$( 'html, body' ).animate( { scrollTop: 0 }, 0 );
// }, 250);
//});

// Mix Panel Events
(function(e,a){if(!a.__SV){var b=window;try{var c,l,i,j=b.location,g=j.hash;c=function(a,b){return(l=a.match(RegExp(b+"=([^&]*)")))?l[1]:null};g&&c(g,"state")&&(i=JSON.parse(decodeURIComponent(c(g,"state"))),"mpeditor"===i.action&&(b.sessionStorage.setItem("_mpcehash",g),history.replaceState(i.desiredHash||"",e.title,j.pathname+j.search)))}catch(m){}var k,h;window.mixpanel=a;a._i=[];a.init=function(b,c,f){function e(b,a){var c=a.split(".");2==c.length&&(b=b[c[0]],a=c[1]);b[a]=function(){b.push([a].concat(Array.prototype.slice.call(arguments,
  0)))}}var d=a;"undefined"!==typeof f?d=a[f]=[]:f="mixpanel";d.people=d.people||[];d.toString=function(b){var a="mixpanel";"mixpanel"!==f&&(a+="."+f);b||(a+=" (stub)");return a};d.people.toString=function(){return d.toString(1)+".people (stub)"};k="disable time_event track track_pageview track_links track_forms register register_once alias unregister identify name_tag set_config reset people.set people.set_once people.unset people.increment people.append people.union people.track_charge people.clear_charges people.delete_user".split(" ");
  for(h=0;h<k.length;h++)e(d,k[h]);a._i.push([b,c,f])};a.__SV=1.2;b=e.createElement("script");b.type="text/javascript";b.async=!0;b.src="undefined"!==typeof MIXPANEL_CUSTOM_LIB_URL?MIXPANEL_CUSTOM_LIB_URL:"file:"===e.location.protocol&&"//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js".match(/^\/\//)?"https://cdn.mxpnl.com/libs/mixpanel-2-latest.min.js":"//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js";c=e.getElementsByTagName("script")[0];c.parentNode.insertBefore(b,c)}})(document,window.mixpanel||[]);
  mixpanel.init("86087803caecfad8030692e62298b12a");

jQuery(function ($) {

  // Init count down clock
  var today = new Date();
  var marriageDate = new Date('2018', '01', '26', '06', '30', '00');
  var diffInSecs = (marriageDate - today)/1000;

  var clock = $('.clock').FlipClock({
    clockFace: 'DailyCounter',
    autoStart: false,
    showSeconds: false,
    callbacks: {
      stop: function () {
        $('.getting-married-text').text('are happily married :)')
      }
    }
  });
  clock.setTime(diffInSecs > 0 ? diffInSecs : 0);
  clock.setCountdown(true);
  clock.start();

  // Init pictures carouse
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

