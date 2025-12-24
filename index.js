 
 
 // -------------- Navbar -----------



    (function () {
      const menuBtn = document.getElementById('menu-btn');
      const menu = document.getElementById('menu');
      const servicesBtn = document.getElementById('services-btn');
      const servicesMenu = document.getElementById('services-menu');

      if (!menuBtn || !menu) return;

      menuBtn.addEventListener('click', function () {
        try {
          const isHidden = menu.classList.contains('hidden');
          menu.classList.toggle('hidden');
          menuBtn.setAttribute('aria-expanded', String(isHidden));
          if (window.innerWidth < 768) menuBtn.textContent = isHidden ? '✕' : '☰';
        } catch (e) {
          console.error('ERR_MENU_TOGGLE', e);
        }
      });

      // mobile-only dropdown toggle for services
      servicesBtn?.addEventListener('click', function (ev) {
        try {
          if (window.innerWidth < 768) {
            ev.preventDefault();
            servicesMenu?.classList.toggle('hidden');
          }
        } catch (e) {
          console.error('ERR_SERVICES_TOGGLE', e);
        }
      });

      // keep menu state sane on resize
      window.addEventListener('resize', function () {
        try {
          if (window.innerWidth >= 768) {
            menu.classList.remove('hidden');
            menuBtn.textContent = '☰';
            menuBtn.setAttribute('aria-expanded', 'false');
          } else {
            if (!menu.classList.contains('hidden')) menu.classList.add('hidden');
            menuBtn.setAttribute('aria-expanded', 'false');
          }
        } catch (e) {
          console.error('ERR_RESIZE', e);
        }
      });
    })();


            // --------------------------- Hero Section -------------------------------------------


    document.addEventListener('DOMContentLoaded', function () {
      try {
        // Respect user preference for reduced motion
        if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        if (typeof gsap === 'undefined') return;

        // Register ScrollTrigger if available (fail-safe)
        try { if (gsap.registerPlugin) gsap.registerPlugin(window.ScrollTrigger); } catch (e) { /* ignore */ }

        const tl = gsap.timeline();

        const title = document.getElementById('title');
        const text = document.getElementById('text');
        const startBtn = document.getElementById('start-project');
        const seeWork = document.getElementById('see-work');
        const img = document.getElementById('img');

        if (title) {
          try { tl.fromTo(title, { rotateX: 20, opacity: 0 }, { rotateX: 0, opacity: 1, duration: 0.8 }); } catch (e) { console.error('ERR_ANIM_TITLE', e); }
        }
        if (text) {
          try { tl.from(text, { x: '18%', opacity: 0, duration: 0.6 }, '-=0.5'); } catch (e) { console.error('ERR_ANIM_TEXT', e); }
        }
        if (startBtn || seeWork) {
          try { tl.from([startBtn, seeWork], { y: -10, opacity: 0, stagger: 0.08, duration: 0.45 }, '-=0.35'); } catch (e) { console.error('ERR_ANIM_CTA', e); }
        }
        if (img) {
          try { tl.from(img, { scale: 0.98, opacity: 0, duration: 0.8 }, '-=0.45'); } catch (e) { console.error('ERR_ANIM_IMG', e); }
        }

        // ABOUT section reveal using ScrollTrigger if present
        try {
          if (window.ScrollTrigger) {
            gsap.from('#ab-content', {
              scrollTrigger: {
                trigger: '#ab-content',
                start: 'top 80%',
                toggleActions: 'play none none none'
              },
              x: -30,
              opacity: 0,
              duration: 0.7
            });
          }
        } catch (e) {
          console.error('ERR_SCROLL_AB', e);
        }

      } catch (e) {
        console.error('ERR_GSAP_INIT', e);
      }
    });

