 
 
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

    // Elements
    const title = document.querySelector('#h-title');
    const text = document.querySelector('#text');
    const seeWork = document.querySelector('#see-work');
    const img = document.querySelector('#img');

    // Split title into lines
    const split = title ? new SplitText(title, { type: 'lines' }) : null;

    const tl = gsap.timeline();

    tl.from(split.lines,{
      y:20,
      opacity:0,
      stagger:0.2,
      duration:0.5
    })
    tl.from(text,{
      x:50,
      opacity:0
    })
    tl.from(seeWork,{
      y:-20,
      opacity:0
    })
    tl.from(img,{
      opacity:0
    })

 
 
    //---------------- ABOUT section reveal using ScrollTrigger-------------------------------
            
      
               gsap.from('#ab-content', {
              scrollTrigger: {
                trigger: '#ab-content',
                start: 'top 80%',
                toggleActions: 'play none play reverse',
              },
              x: -30,
              opacity: 0,
              duration: 0.4
            });
     
  

