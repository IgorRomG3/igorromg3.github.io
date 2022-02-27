//template.js

(function() {
  $(document).ready(function() {
    innerPage();
    scrollHandler();
    pushdownHandler();
    resizeHandler();
  });

  function innerPage() {
    var fadeUp = gsap.utils.toArray('.fade-up');
    var fadeTopDown = gsap.utils.toArray('.fade-top-down');
    var pillFadeUp = gsap.utils.toArray('.pill.pill_fade-up .pill__img');
    var fadeUpLadder = gsap.utils.toArray('.fade-up-ladder > *');
    var benefitsAnim = gsap.fromTo(document.querySelector('.home-benefits__poster'), {opacity: 0}, {opacity: 1, duration: .7, onComplete: function() {
      gsap.to(document.querySelector('.home-benefits__textual > p'), {opacity: 1, duration: .7})
    }});


    $('.menu__item_parent').on('mouseenter', function() {
      $('.nav').addClass('nav_active');
    });

    $('.menu__item_parent').on('mouseleave', function() {
      $('.nav').removeClass('nav_active');
    });

    $('.nav__toggle').on('click', function() {
      $(this).toggleClass('nav__toggle_active');

      if ($(this).hasClass('nav__toggle_active')) {
        $('.nav__right').addClass('nav__right_active');
        $('body').addClass('scroll-disable');
      } else {
        $('.nav__right').removeClass('nav__right_active');
        $('body').removeClass('scroll-disable');
      }
    });

    gsap.fromTo(fadeTopDown, { y: '-100%' }, { y: '0%' });

    ScrollTrigger.create({
      trigger: document.querySelector('.home-benefits__poster'),
      animation: benefitsAnim,
      start: "center bottom",
      once: true,
    });

    fadeUp.forEach((box, i) => {
      var anim = gsap.fromTo(box, {opacity: 0}, {opacity: 1, duration: 1.2});
      ScrollTrigger.create({
          trigger: box,
          animation: anim,
          start: "center bottom",
          once: true,
      });
    });

    pillFadeUp.forEach((box, i) => {
      var self = box;
      var anim = gsap.fromTo(box, {rotate: -65, opacity: 0}, {rotate: 0, opacity: 1, duration: .7, onComplete: function() {
        gsap.fromTo(self.closest('.pill').querySelector('.pill__shadow'), {opacity: 0}, {opacity: 1, duration: .7})
      }});
      ScrollTrigger.create({
          trigger: box,
          start: "center bottom",
          animation: anim,
          once: true,
      });
    });

    fadeUpLadder.forEach((box, i) => {
      var anim = gsap.fromTo(box, {opacity: 0}, {opacity: 1, duration: .7, autoAlpha: 1, delay: i / 7});
      ScrollTrigger.create({
          trigger: box,
          animation: anim,
          start: "center bottom",
          once: true,
      });
    });

    $('.scroll').find('.scroll__block').on('click', function() {
      $('html, body').stop().animate({scrollTop: $('.technology-header').height()}, 1000);
    });

    $('.pushdown__close').on('click', function() {
      $(this).closest('.pushdown').removeClass('pushdown_active');
      pushdownHandler();
    });
  }

  function scrollHandler() {
    $(window).on('scroll', function() {
      var scrollTop = $(this).scrollTop();

      if (scrollTop >= 10) {
        $('.scroll').addClass('scroll_scrolled');
      } else {
        $('.scroll').removeClass('scroll_scrolled');
      }
    });
  }

  function resizeHandler() {
    $(window).on('resize', function() {
      if ($(this).width() > 991) {
        $('body').removeClass('scroll-disable');
      } else {
        if ($('.nav__right').hasClass('nav__right_active')) {
          $('body').addClass('scroll-disable');
        }
      }

      pushdownHandler();
    })
  }

  function pushdownHandler() {
    var pushdown = $('.pushdown');
    var pushdownHeight = pushdown.outerHeight();
    var nav = $('.nav');
    var navHeight = nav.outerHeight();

    if (pushdown !== null) {
      if (pushdown.hasClass('pushdown_active')) {
        nav.css('top', pushdownHeight);
        gsap.to(document.querySelector('main'), { marginTop: navHeight + pushdownHeight + 'px' });
        gsap.to(document.querySelector('.full-screen'), { height: 'calc(100vh - ' + (navHeight + pushdownHeight) + 'px)' });
      } else {
        gsap.to(document.querySelector('.nav'), { top: 0 });
        gsap.to(document.querySelector('.pushdown'), { y: '-100%' });
        gsap.to(document.querySelector('main'), { marginTop: navHeight + 'px' });
        gsap.to(document.querySelector('.full-screen'), { height: 'calc(100vh - ' + navHeight + 'px)' });
      }
    }
  }

})();