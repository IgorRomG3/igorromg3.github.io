//template.js

(function() {
  $(document).ready(function() {
    innerPage();
  });

  function innerPage() {
    lineHandler();
  }

  function lineHandler() {
    var homeLine = $('.home-line');
    
    if (homeLine.length > 0 && $(window).width() > 1400) {
      var topBlock = $('.home-header__subtitle');
      var botBlock = $('.home-platform .pill__shadow');
      var top = topBlock.offset().top;
      var bot = botBlock.offset().top + botBlock.height();
      var homeLineHeight = bot - top;
      var homeLineTop = $('.home-platform').offset().top - $('.home-header__subtitle').offset().top;

      homeLine.css('top', -homeLineTop + 'px');

      gsap.fromTo(document.querySelector('.home-line'), { y: -150, height: 0 }, { y: 0, height: homeLineHeight, duration: .7 });
    }
  }

})();