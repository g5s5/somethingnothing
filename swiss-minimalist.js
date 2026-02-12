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

    // Process product images to make white backgrounds transparent
    // (This ensures the swirl line behind the object is visible only outside the object)
    const imgs = document.querySelectorAll('.product-item img');
    imgs.forEach(originalImg => {
      // Skip if already processed
      if (originalImg.dataset.processed) return;

      const process = () => {
        try {
          // Create a new image object for processing to handle CORS/Tainted Canvas
          const tempImg = new Image();
          tempImg.crossOrigin = "Anonymous";

          tempImg.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = tempImg.naturalWidth;
            canvas.height = tempImg.naturalHeight;
            ctx.drawImage(tempImg, 0, 0);

            try {
              const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
              const data = imgData.data;

              let hasWhite = false;
              for (let i = 0; i < data.length; i += 4) {
                const r = data[i], g = data[i + 1], b = data[i + 2];
                // If pixel is near white (>210), make it transparent
                if (r > 210 && g > 210 && b > 210) {
                  data[i + 3] = 0; // Alpha = 0
                  hasWhite = true;
                }
              }

              if (hasWhite) {
                ctx.putImageData(imgData, 0, 0);
                originalImg.src = canvas.toDataURL();
                originalImg.dataset.processed = 'true';
                // Ensure z-index is correct
                originalImg.style.position = 'relative';
                originalImg.style.zIndex = '2';
              }
            } catch (canvasError) {
              console.warn('Canvas security error (tainted):', canvasError);
              // Fallback: If canvas fails, we can't make it transparent client-side easily.
              // Just ensure z-index is set so at least the image shows (hiding swirl).
            }
          };

          tempImg.onerror = (e) => console.warn('Image load error:', e);

          // Force reload to bypass cache and ensure we get the new solid-white image
          // (Cache checks might return old checkerboard version)
          const src = originalImg.getAttribute('src').split('?')[0];
          tempImg.src = src + '?v=' + new Date().getTime();
        } catch (e) {
          console.warn('Could not setup image processing:', e);
        }
      };

      // Start processing immediately
      process();
    });
  });

  // ------ Swirly Pen Stroke Hover Effect ------
  (function initSwirlHover() {
    const NS = 'http://www.w3.org/2000/svg';
    const items = document.querySelectorAll('.product-item');

    function r(a, b) { return a + Math.random() * (b - a); }

    // Generate a random swirly, organic pen-stroke path
    function makeSwirlPath(w, h) {
      const cx = w / 2, cy = h / 2;

      // Generate 6-9 points spread around the card
      // (the transparent image will naturally mask the center)
      const pts = [];
      const n = 6 + Math.floor(Math.random() * 4);
      for (let i = 0; i < n; i++) {
        // Distribute around card — bias toward edges but allow mid-range
        const angle = (i / n) * Math.PI * 2 + r(-0.4, 0.4);
        const radius = r(0.35, 0.55) * Math.min(w, h);
        const x = cx + Math.cos(angle) * radius * (w / Math.min(w, h));
        const y = cy + Math.sin(angle) * radius * (h / Math.min(w, h));
        pts.push({
          x: Math.max(-w * 0.05, Math.min(w * 1.05, x)),
          y: Math.max(-h * 0.05, Math.min(h * 1.05, y)),
          a: angle
        });
      }

      // Sort by angle for cohesive flow
      pts.sort((a, b) => a.a - b.a);

      // Build cubic bezier path
      let d = `M${pts[0].x.toFixed(1)},${pts[0].y.toFixed(1)}`;
      for (let i = 1; i < pts.length; i++) {
        const p = pts[i - 1], q = pts[i];
        const dx = q.x - p.x, dy = q.y - p.y;
        const sw = r(-0.5, 0.5);
        const c1x = p.x + dx / 3 + dy * sw;
        const c1y = p.y + dy / 3 - dx * sw;
        const c2x = p.x + 2 * dx / 3 - dy * sw * 0.6;
        const c2y = p.y + 2 * dy / 3 + dx * sw * 0.6;
        d += ` C${c1x.toFixed(1)},${c1y.toFixed(1)} ${c2x.toFixed(1)},${c2y.toFixed(1)} ${q.x.toFixed(1)},${q.y.toFixed(1)}`;
      }
      return d;
    }

    items.forEach(item => {
      let svg = null;
      const container = item.querySelector('.image-container');
      if (!container) return;

      item.addEventListener('mouseenter', () => {
        if (svg) { svg.remove(); svg = null; }

        const w = container.offsetWidth;
        const h = container.offsetHeight;

        // Create SVG — placed inside image-container, behind the <img>
        svg = document.createElementNS(NS, 'svg');
        svg.setAttribute('viewBox', `0 0 ${w} ${h}`);
        svg.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:1;';

        // Create the swirl path (no clip-path — transparent PNG masks naturally)
        const path = document.createElementNS(NS, 'path');
        path.setAttribute('d', makeSwirlPath(w, h));
        path.setAttribute('fill', 'none');
        path.setAttribute('stroke', '#000');
        path.setAttribute('stroke-width', '2');
        path.setAttribute('stroke-linecap', 'round');
        path.setAttribute('stroke-linejoin', 'round');
        svg.appendChild(path);

        container.appendChild(svg);

        // Animate draw-in via stroke-dashoffset
        const len = path.getTotalLength();
        path.style.strokeDasharray = len;
        path.style.strokeDashoffset = len;
        requestAnimationFrame(() => {
          path.style.transition = 'stroke-dashoffset 0.8s cubic-bezier(0.4,0,0.2,1)';
          path.style.strokeDashoffset = '0';
        });
      });

      item.addEventListener('mouseleave', () => {
        if (!svg) return;
        const path = svg.querySelector('path');
        if (!path) { svg.remove(); svg = null; return; }

        const len = path.getTotalLength();
        path.style.transition = 'stroke-dashoffset 0.6s cubic-bezier(0.4,0,0.2,1)';
        path.style.strokeDashoffset = len;

        const ref = svg;
        svg = null;
        setTimeout(() => ref.remove(), 620);
      });
    });
  })();

});
