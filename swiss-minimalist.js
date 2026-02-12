/* ============================================
   something//nothing — Swiss Minimalist Interactions
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ------ Interactive Logo Scroll Transition ------
  const headerLogo = document.getElementById('header-logo');
  const headerBg = document.getElementById('header-bg');

  if (headerLogo) {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const triggerPoint = 50;

      if (scrollY > triggerPoint) {
        headerLogo.classList.add('scrolled');
        if (headerBg) headerBg.classList.add('scrolled');
      } else {
        headerLogo.classList.remove('scrolled');
        if (headerBg) headerBg.classList.remove('scrolled');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
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
