
// scroll to page top on load
//jQuery(function($) {
//setTimeout(function() {
//$( 'html, body' ).animate( { scrollTop: 0 }, 0 );
// }, 250);
//});

// Init Mix Panel Event Logger
(function (e, a) {
  if (!a.__SV) {
    var b = window; try { var c, l, i, j = b.location, g = j.hash; c = function (a, b) { return (l = a.match(RegExp(b + "=([^&]*)"))) ? l[1] : null }; g && c(g, "state") && (i = JSON.parse(decodeURIComponent(c(g, "state"))), "mpeditor" === i.action && (b.sessionStorage.setItem("_mpcehash", g), history.replaceState(i.desiredHash || "", e.title, j.pathname + j.search))) } catch (m) { } var k, h; window.mixpanel = a; a._i = []; a.init = function (b, c, f) {
      function e(b, a) {
        var c = a.split("."); 2 == c.length && (b = b[c[0]], a = c[1]); b[a] = function () {
          b.push([a].concat(Array.prototype.slice.call(arguments,
            0)))
        }
      } var d = a; "undefined" !== typeof f ? d = a[f] = [] : f = "mixpanel"; d.people = d.people || []; d.toString = function (b) { var a = "mixpanel"; "mixpanel" !== f && (a += "." + f); b || (a += " (stub)"); return a }; d.people.toString = function () { return d.toString(1) + ".people (stub)" }; k = "disable time_event track track_pageview track_links track_forms register register_once alias unregister identify name_tag set_config reset people.set people.set_once people.unset people.increment people.append people.union people.track_charge people.clear_charges people.delete_user".split(" ");
      for (h = 0; h < k.length; h++)e(d, k[h]); a._i.push([b, c, f])
    }; a.__SV = 1.2; b = e.createElement("script"); b.type = "text/javascript"; b.async = !0; b.src = "undefined" !== typeof MIXPANEL_CUSTOM_LIB_URL ? MIXPANEL_CUSTOM_LIB_URL : "file:" === e.location.protocol && "//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js".match(/^\/\//) ? "https://cdn.mxpnl.com/libs/mixpanel-2-latest.min.js" : "//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js"; c = e.getElementsByTagName("script")[0]; c.parentNode.insertBefore(b, c)
  }
})(document, window.mixpanel || []);
mixpanel.init("86087803caecfad8030692e62298b12a");

jQuery(function ($) {

  var USER_ID = null;

  /**
   *  ================  FIREBASE CONFIG AND METHODS  ======================
   */

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCgiwMGNFHLWphBoBBG7E-5dll0XgiJCD8",
    authDomain: "jash-wedding.firebaseapp.com",
    databaseURL: "https://jash-wedding.firebaseio.com",
    projectId: "jash-wedding",
    storageBucket: "jash-wedding.appspot.com",
    messagingSenderId: "860934339609"
  };
  firebase.initializeApp(config);

  // Database Instance
  var database = firebase.database();

  // Change mode to 'dev' when debugging 
  var MODE = 'prod'; 

  var databasePath = MODE + '-rsvps' + '/';

  function writeUserData(name, contact, comment) {
    firebase.database().ref(databasePath + USER_ID).set({ name: name, contact: contact, comment: comment });
  }

  function readUserData(userId) {
    var userRsvpRef = firebase.database().ref('rsvps/' + userId);
    userRsvpRef.on('value', function(snapshot) {
      console.log('Data from firebase - ', userId, ' ---> ', snapshot.val());
    });
  }

  // HTML5 LocalStorage for flags
  var dataStore = {
    localStorage: window.localStorage,
    getItem: function(tag) {
      if(this.localStorage) 
        return localStorage.getItem(tag);
    },
    setItem: function(tag, val){
      if(this.localStorage)
        localStorage.setItem(tag, val);
    }
  }

  // Check if already authenticated user?
  USER_ID = dataStore.getItem('USER_ID');
  if(!USER_ID) {

    //  Authenticate anonymously if not already visited
    firebase.auth().signInAnonymously().catch(function(err) { console.log('Error (' + err.code + ') : ', err.message); });

  } else {
    $('.notification').fadeIn('slow');
    setTimeout(function(){ $('.notification').fadeOut('slow');}, 5000);
  }

  // Update localStorage when auth is success
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) { // User is signed in.
      var isAnonymous = user.isAnonymous;
      USER_ID = user.uid;
      dataStore.setItem('USER_ID', USER_ID);
    } else { // User is signed out.
    }
  });


  /**
  *  =================  UI EVENTS  ===================
  */

  // Delayed item load
  setTimeout(function() {
    $('.flip-clock, .invitation-text, .rsvp').fadeIn('slow');
    $('.invitation-text').css({ 'display': 'inline-block' });
  }, 3500)

  // RSVP Modal Open
  $('[data-popup-open]').on('click', function (e) {
    var targeted_popup_class = jQuery(this).attr('data-popup-open');
    $('[data-popup="' + targeted_popup_class + '"]').fadeIn(350);
    e.preventDefault();
  });

  // RSVP Modal Close
  $('[data-popup-close]').on('click', function (e) {
    var targeted_popup_class = jQuery(this).attr('data-popup-close');
    $('[data-popup="' + targeted_popup_class + '"]').fadeOut(350);
    e.preventDefault();
  });

  var isSubmitClicked = false;

  // RSVP'ed already ?
  var alreadyRsvped = Boolean(+dataStore.getItem('RSVP'));
  if(alreadyRsvped) {
    $('.rsvp').html('').text('Thanks for RSVP\'ing !!');
  }

  // RSVP submit button
  $('#rsvp-submit').click(function (e) {
    e.preventDefault();
    isSubmitClicked = true;
    $('#rsvp-form').submit();
  });

  // RSVP form submit
  $('#rsvp-form').submit(function(e) {
    e.preventDefault();

    var $this = $('#rsvp-submit');
    var $parent = $this.parent();
    var $name = $parent.find('[name="rsvp-name"]');
    var $phone = $parent.find('[name="rsvp-phone"]');
    var $comment = $parent.find('[name="rsvp-comment"]');

    if(!isSubmitClicked || ($name.val().length === 0)) 
      return;

    // send & track
    mixpanel.track("RSVP", { 'Name': $name.val(), 'Phone': $phone.val() || '-------', 'Comment': $comment.val() || '---------' });
    dataStore.setItem('RSVP', '1');

    // Write to Firebase
    writeUserData($name.val(), $phone.val() || '', $comment.val() || '');

    // update ui
    $this.val('Thanks for coming !!').css({ 'background': '#80c376', color: '#fff' });

    setTimeout(function(){
     
      // clear & collapse
      $('.popup-close').trigger('click');
      $name.val(''); $phone.val(''); $comment.val('');
      $('#rsvp-submit').val('Submit').css({ 'background': '#ccc', color: '#000' });
      isSubmitClicked = false;
      $('.rsvp').html('').text('Thanks for RSVP\'ing !!');

    }, 2000);
  })

  // Init count down clock
  var today = new Date();
  var marriageDate = new Date('2018', '01', '26', '06', '30', '00');
  var diffInSecs = (marriageDate - today) / 1000;

  var clock = $('.clock').FlipClock({
    clockFace: 'DailyCounter',
    autoStart: false,
    showSeconds: false,
    callbacks: {
      stop: function () {
        $('.getting-married-text').text('are happily married :)');
        $('.rsvp').hide();
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
    gtag('send', 'event', 'Flipcard flipped', 'flip', 'flipcard-flipped'); // google analytics
    mixpanel.track("Card Flipped", { taskName: $('.flipcard-container').find('.back').text() }); // mixpanel
    $('section.card-container').find('#card').toggleClass('flipped');
  });

  // Begin heart beat after page load
  setTimeout(function () {
    $('.heart-pic').removeClass('fadeInUp').addClass('beat');
  }, 4000);

  if (window.performance) {
    // Gets the number of milliseconds since page load (and rounds the result since the value must be an integer).
    var timeSincePageLoad = Math.round(performance.now());

    // Sends the timing hit to Google Analytics.
    gtag('send', 'event', 'Asset Dependencies', 'load', timeSincePageLoad);

    // Log pageview with load time in MixPanel
    mixpanel.track("Page View", { timeSincePageLoad: timeSincePageLoad + ' ms' });
  }

  // Track places link clicks in MixPanel
  $('.to-do-in-cbe ul li').on('click', 'a', function (e) {
    mixpanel.track("Places Link Clicked", { place: $(e.currentTarget).attr('data-val') });
  });

  // Track repo link clicks in MixPanel
  $('#repo-link').on('click', function () {
    mixpanel.track("Repo Link Clicked");
  });
});

