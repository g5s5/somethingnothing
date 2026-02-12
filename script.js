/* ============================================
   something//nothing — Interactions
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ------ Interactive Logo Transition ------
  const headerLogo = document.getElementById('header-logo');
  const headerBg = document.getElementById('header-bg');

  if (headerLogo) {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const triggerPoint = 50; // Pixels to scroll before transition starts

      if (scrollY > triggerPoint) {
        headerLogo.classList.add('scrolled');
        if (headerBg) headerBg.classList.add('scrolled');
      } else {
        headerLogo.classList.remove('scrolled');
        if (headerBg) headerBg.classList.remove('scrolled');
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

  // ------ Dynamic Header Text on Hover ------
  const headerCenterText = document.getElementById('header-center-text');
  const productItems = document.querySelectorAll('.product-item');

  if (headerCenterText && productItems.length > 0) {
    productItems.forEach(item => {
      const info = item.querySelector('.product-info');
      if (info) {
        const productText = info.textContent;

        item.addEventListener('mouseenter', () => {
          headerCenterText.textContent = productText;
          headerCenterText.classList.add('visible');
        });

        item.addEventListener('mouseleave', () => {
          headerCenterText.classList.remove('visible');
          // Optional: clear text after transition
          setTimeout(() => {
            if (!headerCenterText.classList.contains('visible')) {
              headerCenterText.textContent = '';
            }
          }, 300);
        });
      }
    });
  }

});
