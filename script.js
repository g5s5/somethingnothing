/* ============================================
   something//nothing — Interactions
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ------ Interactive Logo Transition ------
  const headerLogo = document.getElementById('header-logo');

  if (headerLogo) {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const triggerPoint = 50; // Pixels to scroll before transition starts

      if (scrollY > triggerPoint) {
        headerLogo.classList.add('scrolled');
      } else {
        headerLogo.classList.remove('scrolled');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initial check
    handleScroll();
  }


  // ------ Smooth entrance for page load ------
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.6s ease';
  requestAnimationFrame(() => {
    document.body.style.opacity = '1';
  });

});
