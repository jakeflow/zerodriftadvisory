/* ═══════════════════════════════════════════════════════════════
   ZERO DRIFT ADVISORY - MAIN JS
   Navigation, smooth scroll, scroll-triggered animations
   ═══════════════════════════════════════════════════════════════ */

(function() {
  'use strict';

  /* ── Mobile Navigation Toggle ── */
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');

  if (toggle && links) {
    toggle.addEventListener('click', function() {
      var isOpen = links.classList.toggle('open');
      toggle.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen);
    });

    links.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', function() {
        links.classList.remove('open');
        toggle.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });

    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && links.classList.contains('open')) {
        links.classList.remove('open');
        toggle.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ── Scroll-triggered fade-in animations ── */
  if ('IntersectionObserver' in window) {
    var animateEls = document.querySelectorAll('.animate-in');
    if (animateEls.length) {
      // Pause initial animations until element is in view
      animateEls.forEach(function(el) {
        el.style.animationPlayState = 'paused';
      });

      var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            entry.target.style.animationPlayState = 'running';
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

      animateEls.forEach(function(el) {
        observer.observe(el);
      });
    }
  }

  /* ── Smooth scroll for anchor links ── */
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
})();
