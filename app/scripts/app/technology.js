//technology.js

(function() {
  $(document).ready(function() {
    innerPage();
    scrollHandler();
  });

  function innerPage() {
    var title = document.querySelector('.technology__animate-h1 > .animate-h1__text');
    var pillYellow = document.querySelector('.technology__animate-h1 > .animate-h1__pill_yellow');
    var pillBlue = document.querySelector('.technology__animate-h1 > .animate-h1__pill_blue');
    var pillWhite = document.querySelector('.technology__animate-h1 > .animate-h1__pill_white');
    var pillPink = document.querySelector('.technology__animate-h1 > .animate-h1__pill_pink');
    var pillGreen = document.querySelector('.technology__animate-h1 > .animate-h1__pill_green');
    var scroll = document.querySelector('.technology .scroll__block');
    var tlDur = 2;
    var stickyPars = gsap.utils.toArray('.sticky-section__textual p');
    var descSection = document.querySelector('.technology-desc');
    var tl1 = gsap.timeline();
    var tl2 = gsap.timeline( { 
    
      scrollTrigger: {
        trigger: pillPink,
        start: 100,
        scrub: true,
        markers: false,
      }
      
    });

    var tl3 = gsap.timeline( { 
    
      scrollTrigger: {
        trigger: pillYellow,
        start: 100,
        scrub: true,
        markers: false,
      }
      
    });

    var tl4 = gsap.timeline( { 
    
      scrollTrigger: {
        trigger: pillGreen,
        start: 150,
        scrub: true,
        markers: false,
      }
      
    });

    var tl5 = gsap.timeline( { 
    
      scrollTrigger: {
        trigger: title,
        start: 100,
        scrub: true,
        markers: false,
      }
      
    });

    var tl6 = gsap.timeline( { 
    
      scrollTrigger: {
        trigger: pillWhite,
        start: 100,
        scrub: true,
        markers: false,
      }
      
    });

    $(window).scrollTop(0);

    tl1.fromTo(title, { y: 100, opacity: 0 }, { y: 0, opacity: 1, ease: 'power3.out', duration: tlDur })
      .fromTo(pillYellow, { y: 100, opacity: 0, rotate: -65 }, { y: 0, opacity: 1, rotate: 0, ease: 'power3.out', duration: tlDur }, '-=' + tlDur)
      .fromTo(pillBlue, { y: 150, opacity: 0, rotate: -65 }, { y: 0, opacity: 1, rotate: 0, ease: 'power3.out', duration: tlDur }, '-=' + tlDur)
      .fromTo(pillWhite, { y: 150, opacity: 0, rotate: -65 }, { y: 0, opacity: 1, rotate: 0, ease: 'power3.out', duration: tlDur }, '-=' + tlDur)
      .fromTo(pillPink, { y: 100, opacity: 0, rotate: -65 }, { y: 0, opacity: 1, rotate: 0, ease: 'power3.out', duration: tlDur }, '-=' + tlDur)
      .fromTo(pillGreen, { y: 150, opacity: 0, rotate: -65 }, { y: 0, opacity: 1, rotate: 0, ease: 'power3.out', duration: tlDur }, '-=' + tlDur)
      .fromTo(scroll, { opacity: 0 }, { opacity: 1, duration: 1, onComplete: function() { $('body').removeClass('scroll-disable'); }}, '-=1');

    stickyPars.forEach((box, i) => {
      const tl = gsap.timeline( { 
    
        scrollTrigger: {
          trigger: box,
          start: "+=133 90%",
          end: "+=200 20%",
          scrub: true,
          markers: false,
        }
        
      });
    
    
      tl
        .to(box, { opacity: 1, duration: 1 })
        .to(box, { opacity: 0, duration: 1 }, 0.8 )
      ;
    });
  
    tl2
      .fromTo(pillPink, { rotate: 0 }, { rotate: -90 });
    tl3
      .fromTo(pillYellow, { rotate: 0, y: 0}, { rotate: -90, y: 80 });
    tl4
      .fromTo(pillGreen, { rotate: 0 }, { rotate: -90 });
    tl5
      .fromTo(title, { y: 0 }, { y: 50 });
    tl6
      .fromTo(pillWhite, { y: 0 }, { y: 50 });

    var anim = gsap.fromTo(descSection, {opacity: 0}, {opacity: 1, duration: 1.2});
    ScrollTrigger.create({
        trigger: descSection,
        animation: anim,
        start: "top center",
        once: true,
    });

    stickyImgHandler();
    setAnimationCircleBg();

  }

  function scrollHandler() {
    $(window).on('scroll', function() {
      stickyImgHandler();
    });
  }

  function stickyImgHandler() {
    var wT = $(window).scrollTop();
    var img = $('.sticky-section__img');

    if (img.length > 0) {
      img.each(function() {
        var imgH = $(this).height();
        var stickyContainer = $(this).closest('.sticky-section');
        var stickyContainerTop = stickyContainer.offset().top;
        var stickyContainerBot = stickyContainer.offset().top + stickyContainer.height();

        if (wT + imgH > stickyContainerBot) {
          $(this).addClass('sticky-section__img_is-bottom');
          $(this).removeClass('sticky-section__img_is-fixed');
        } else if (wT >= stickyContainerTop && wT < stickyContainerBot) {
          $(this).removeClass('sticky-section__img_is-bottom');
          $(this).addClass('sticky-section__img_is-fixed');
        } else if (wT < stickyContainerTop) {
          $(this).removeClass('sticky-section__img_is-bottom');
          $(this).removeClass('sticky-section__img_is-fixed');
        }
      });
    }
  }

  function tweenProperty(target, prop, min, max) {
  
    var randomDur = gsap.utils.random(5, 15, 0.2, true);
    var randomDelay = gsap.utils.random(0.6, 2, 0.2, true);
  
    gsap.to(target,  {
      [prop]: gsap.utils.random(min, max),
      duration: randomDur(), 
      delay: randomDelay(), 
      ease: 'none',
      onComplete: function() {
        if (prop == 'opacity') {
          gsap.to(target, { 
            opacity: 0.5, 
            onComplete: tweenProperty, 
            onCompleteParams: [target, prop, min, max] 
          })
        } else {
          tweenProperty(target, prop, min, max)
        }
      },
    });
  
  }

  function setAnimationCircleBg() {
    var animationCircleBg = document.querySelector('.animation-circles-bg');
    
    if (animationCircleBg !== null) {
      animationCircleBg.querySelectorAll('circle').forEach(function(item) {
        item.setAttribute('cx', gsap.utils.random(0, animationCircleBg.getBoundingClientRect().width));
        item.setAttribute('cy', gsap.utils.random(0, animationCircleBg.getBoundingClientRect().height));
        item.setAttribute('r', gsap.utils.random(5, 25));
        item.style.opacity = gsap.utils.random(0.3, 0.7);
      });
  
      // Animate the properties individually
      gsap.utils.toArray("circle").forEach(star => {
        tweenProperty(star, "x", 0, 400);
        tweenProperty(star, "y", 0, 400);
        tweenProperty(star, "opacity", 0, 0);
        tweenProperty(star, "scale", 1.5, 1.5);
      });
    }
  }
})();