/* ============================================
   something//nothing — Interactions
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ------ Scroll-triggered Animations ------
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -60px 0px',
    threshold: 0.1
  };

  const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        scrollObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.animate-on-scroll').forEach(el => {
    scrollObserver.observe(el);
  });


  // ------ Category Filter ------
  const filterBar = document.getElementById('filter-bar');
  const productGrid = document.getElementById('product-grid');

  if (filterBar && productGrid) {
    const pills = filterBar.querySelectorAll('.filter-pill');
    const cards = productGrid.querySelectorAll('.product-card');

    pills.forEach(pill => {
      pill.addEventListener('click', () => {
        // Update active state
        pills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');

        const filter = pill.dataset.filter;

        cards.forEach(card => {
          const category = card.dataset.category;
          if (filter === 'all' || category === filter) {
            card.style.display = '';
            // Re-trigger animation
            card.classList.remove('visible');
            requestAnimationFrame(() => {
              requestAnimationFrame(() => {
                card.classList.add('visible');
              });
            });
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }


  // ------ Mobile Navigation ------
  const hamburger = document.getElementById('nav-hamburger');
  const mobileOverlay = document.getElementById('nav-mobile-overlay');

  if (hamburger && mobileOverlay) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      mobileOverlay.classList.toggle('active');
      document.body.style.overflow = mobileOverlay.classList.contains('active') ? 'hidden' : '';
    });

    // Close on link click
    mobileOverlay.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileOverlay.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }


  // ------ Nav Background on Scroll ------
  const nav = document.getElementById('nav');
  if (nav) {
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
      const scroll = window.scrollY;
      if (scroll > 50) {
        nav.style.boxShadow = 'var(--shadow-sm)';
      } else {
        nav.style.boxShadow = 'none';
      }
      lastScroll = scroll;
    }, { passive: true });
  }


  // ------ Toast Notification ------
  function showToast(message) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    if (message) toast.textContent = message;
    toast.classList.add('visible');
    setTimeout(() => {
      toast.classList.remove('visible');
    }, 3000);
  }


  // ------ Hero Subscribe Form ------
  const heroForm = document.getElementById('hero-form');
  if (heroForm) {
    heroForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = heroForm.querySelector('input');
      if (input && input.value) {
        showToast('Thanks for subscribing! 🎉');
        input.value = '';
      }
    });
  }


  // ------ Newsletter Form ------
  const newsletterForm = document.getElementById('newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = newsletterForm.querySelector('input');
      if (input && input.value) {
        showToast('You\'re on the list! 🎉');
        input.value = '';
      }
    });
  }


  // ------ Contact Form ------
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast('Message sent! We\'ll be in touch. ✨');
      contactForm.reset();
    });
  }


  // ------ Smooth entrance for page load ------
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.4s ease';
  requestAnimationFrame(() => {
    document.body.style.opacity = '1';
  });

});
