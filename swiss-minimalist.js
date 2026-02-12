/* ============================================
   something//nothing — Swiss Minimalist Interactions
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ------ Scroll-linked Logo Interpolation ------
  const headerLogo = document.getElementById('header-logo');
  const headerBg = document.getElementById('header-bg');

  if (headerLogo) {
    // Start & end values for the interpolation
    const SCROLL_START = 0;
    const SCROLL_END = 200; // px of scroll to complete the transition

    const FONT_SIZE_START = Math.min(window.innerWidth * 0.08, 112); // matches clamp(3rem,8vw,7rem)
    const FONT_SIZE_END = 36; // 2.25rem in px

    const TOP_START = window.innerHeight * 0.15; // 15vh
    const TOP_END = 24; // ~var(--space-4) = 1.5rem

    const WEIGHT_START = 700;
    const WEIGHT_END = 800;

    const SPACING_START = -0.04;
    const SPACING_END = -0.05;

    const lerp = (a, b, t) => a + (b - a) * t;
    const clamp = (v, min, max) => Math.min(Math.max(v, min), max);

    const handleScroll = () => {
      const scrollY = window.scrollY;
      // progress: 0 at top, 1 at SCROLL_END
      const t = clamp((scrollY - SCROLL_START) / (SCROLL_END - SCROLL_START), 0, 1);

      const fontSize = lerp(FONT_SIZE_START, FONT_SIZE_END, t);
      const top = lerp(TOP_START, TOP_END, t);
      const weight = Math.round(lerp(WEIGHT_START, WEIGHT_END, t));
      const spacing = lerp(SPACING_START, SPACING_END, t);

      headerLogo.style.fontSize = fontSize + 'px';
      headerLogo.style.top = top + 'px';
      headerLogo.style.fontWeight = weight;
      headerLogo.style.letterSpacing = spacing + 'em';

      // Fade header background in over the same range
      if (headerBg) {
        headerBg.style.opacity = t;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', () => {
      // Recalculate responsive start size on resize
      // (re-runs handleScroll with fresh values implicitly)
    });
    handleScroll(); // set initial state
  }

  // ------ Category Filter Logic ------
  const filterBar = document.getElementById('filter-bar');
  const productGrid = document.getElementById('product-grid');

  if (filterBar && productGrid) {
    const pills = filterBar.querySelectorAll('.filter-pill');
    const items = productGrid.querySelectorAll('.product-item');

    pills.forEach(pill => {
      pill.addEventListener('click', () => {
        // Update active state
        pills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');

        const filter = pill.dataset.filter;

        items.forEach(item => {
          const category = item.dataset.category;
          if (filter === 'all' || category === filter) {
            item.style.display = '';
            // Reset animation
            item.style.opacity = '0';
            item.style.transform = 'translateY(10px)';
            requestAnimationFrame(() => {
              item.style.transition = 'all 0.4s ease';
              item.style.opacity = '1';
              item.style.transform = 'translateY(0)';
            });
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }

  // ------ Smooth entrance for page load ------
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.6s ease';
  requestAnimationFrame(() => {
    document.body.style.opacity = '1';
  });

});
