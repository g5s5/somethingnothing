/* ============================================
   something//nothing — Interactions
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ------ Sticky Logo Animation ------
  const headerLogo = document.getElementById('header-logo');
  const heroSection = document.getElementById('hero-section');

  if (headerLogo && heroSection) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        // If hero is NOT intersecting (scrolled past), show header logo
        if (!entry.isIntersecting) {
          headerLogo.style.opacity = '1';
          headerLogo.style.pointerEvents = 'auto';
        } else {
          headerLogo.style.opacity = '0';
          headerLogo.style.pointerEvents = 'none';
        }
      });
    }, {
      root: null,
      threshold: 0.1, // Trigger when 10% of hero is visible
      rootMargin: '-100px 0px 0px 0px' // Offset to trigger slightly before/after
    });

    observer.observe(heroSection);
  }


  // ------ Smooth entrance for page load ------
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.6s ease';
  requestAnimationFrame(() => {
    document.body.style.opacity = '1';
  });

});
