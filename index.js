 
 
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
     
  
            
      (function() {
            if (!window.gsap || !window.ScrollTrigger) {
                console.warn('GSAP or ScrollTrigger missing — services will render without scroll animations');
            }
            gsap.registerPlugin(ScrollTrigger);

            const services = [{
                    id: 'software',
                    title: 'Software Development & IT Consultancy',
                    long: 'We design and deliver custom software and platforms that solve real business challenges and drive growth.',
                    features: ['Build custom software designed around your business goals', 'Develop scalable, secure, and high-performance applications', 'Integrate systems and automate processes for efficiency', 'Enable cloud adoption and digital transformation'],
                    icon: `<svg viewBox="0 0 24 24" fill="none" width="100%" height="100%"><path d="M4 7h16" stroke="#fff" stroke-width="1.6" stroke-linecap="round"/><path d="M4 12h10" stroke="#fff" stroke-width="1.6" stroke-linecap="round"/><path d="M4 17h7" stroke="#fff" stroke-width="1.6" stroke-linecap="round"/></svg>`
                },
                {
                    id: 'import',
                    title: 'Import & Export (Machinery, Equipment, Tools)',
                    long: 'We manage international trade with a focus on reliable logistics, strong vendor relationships, and quality sourcing of machinery, equipment, and tools.',
                    features: ['Efficient global logistics and shipping', 'Trusted vendor and supplier network', 'Quality assurance in sourcing and delivery'],
                    icon: `<svg viewBox="0 0 24 24" fill="none" width="100%" height="100%"><rect x="3" y="7" width="14" height="10" rx="2" stroke="#fff" stroke-width="1.6"/><path d="M7 17v2" stroke="#fff" stroke-width="1.6" stroke-linecap="round"/><path d="M17 11h3" stroke="#fff" stroke-width="1.6" stroke-linecap="round"/></svg>`
                },
                {
                    id: 'government',
                    title: 'Government Procurement & Supply',
                    long: 'We provide complete procurement lifecycle support, from sourcing and tendering to delivery and compliance.',
                    features: ['End-to-end procurement support for seamless operations.', 'Smart sourcing, transparent tendering, reliable delivery.', 'Complete lifecycle management from bid to supply.'],
                    icon: `<svg viewBox="0 0 24 24" fill="none" width="100%" height="100%"><path d="M3 20h18" stroke="#fff" stroke-width="1.6"/><path d="M12 3v6" stroke="#fff" stroke-width="1.6"/><path d="M6 9h12" stroke="#fff" stroke-width="1.6"/></svg>`
                },
                {
                    id: 'office',
                    title: 'Office Automation & Network Infrastructure',
                    long: 'Network design, automation tools, and IT infrastructure to boost productivity and connectivity.',
                    features: ['LAN/WAN Setup', 'Office Automation Tools', 'Network Security', 'IT Infrastructure Support'],
                    icon: `<svg viewBox="0 0 24 24" fill="none" width="100%" height="100%"><rect x="3" y="4" width="18" height="14" rx="2" stroke="#fff" stroke-width="1.6"/><path d="M7 20v-2h10v2" stroke="#fff" stroke-width="1.6" stroke-linecap="round"/></svg>`
                },
                {
                    id: 'web',
                    title: 'Web Development & Hosting',
                    long: 'From custom websites to scalable hosting solutions, we deliver secure, fast, and user-friendly online experiences.',
                    features: ['Custom Website Design', 'E-Commerce Solutions', 'Secure Web Hosting', 'Ongoing Maintenance'],
                    icon: `<svg viewBox="0 0 24 24" fill="none" width="100%" height="100%"><circle cx="12" cy="12" r="8" stroke="#fff" stroke-width="1.6"/><path d="M3 12h18" stroke="#fff" stroke-width="1.6" stroke-linecap="round"/></svg>`
                }
            ];

            const wr = document.getElementById('ser-roll'); // measured & clipped wrapper
            const visual = wr.querySelector('.ser-roll-visual'); // animated target (slide + rotate 360 on entrance)
            const cont = document.getElementById('service-cards'); // cards container inside visual
            const dI = document.getElementById('detail-icon');
            const dT = document.getElementById('detail-title');
            const dL = document.getElementById('detail-long');
            const dF = document.getElementById('detail-features');

            let size = {
                    w: 480,
                    h: 480
                },
                active = 0;

            function measure() {
                const r = wr.getBoundingClientRect();
                size.w = Math.max(240, Math.round(r.width || 480));
                size.h = Math.max(240, Math.round(r.height || 480));
            }
            measure();

            const ro = new ResizeObserver(() => {
                measure();
                renderCards();
            });
            ro.observe(wr);

            function calcPos(i) {
                const c = services.length;
                const cs = Math.max(72, Math.min(160, Math.round(size.w * 0.24)));
                const cx = size.w / 2,
                    cy = size.h / 2;
                const angle = (i / c) * Math.PI * 2 - Math.PI / 2;
                const radius = Math.min(size.w, size.h) / 2 - cs * 0.9;
                const x = Math.round(cx + Math.cos(angle) * radius - cs / 2);
                const y = Math.round(cy + Math.sin(angle) * radius - cs / 2);
                return {
                    top: y,
                    left: x,
                    width: cs,
                    height: cs
                };
            }

            function renderCards() {
                cont.innerHTML = '';
                services.forEach((it, i) => {
                    const p = calcPos(i);
                    const is = i === active;
                    const btn = document.createElement('button');
                    btn.type = 'button';
                    btn.className = 'service-card absolute rounded-xl flex flex-col items-center justify-center gap-2 p-3 transition-all';
                    btn.setAttribute('aria-pressed', String(is));
                    btn.style.top = p.top + 'px';
                    btn.style.left = p.left + 'px';
                    btn.style.width = p.width + 'px';
                    btn.style.height = p.height + 'px';
                    btn.style.zIndex = is ? 30 : 10;
                    btn.style.setProperty('--card-size', p.width + 'px');

                    btn.innerHTML = `
                        <div class="absolute top-3 right-3">
                            <span style="width:10px;height:10px;display:inline-block;border-radius:9999px;background:${is ? 'white' : 'rgba(255,255,255,0.28)'}"></span>
                        </div>
                        <div class="flex items-center justify-center">
                            <span style="background:var(--accent);width:calc(var(--card-size) * 0.48);height:calc(var(--card-size) * 0.48);display:flex;align-items:center;justify-content:center;min-width:40px;min-height:40px;border-radius:8px;overflow:hidden">
                                ${it.icon}
                            </span>
                        </div>
                        <h3 style="margin-top:0.5rem;font-size:clamp(10px,1.2vw,12px);text-align:center;color:white;line-height:1.05">${it.title}</h3>
                    `;

                    btn.addEventListener('click', () => {
                        active = i;
                        renderCards();
                        updateDetail(true);
                    });
                    btn.addEventListener('mouseenter', () => gsap.to(btn, {
                        scale: 1.02,
                        y: -6,
                        duration: 0.1,
                        ease: 'power2.out'
                    }));
                    btn.addEventListener('mouseleave', () => gsap.to(btn, {
                        scale: is ? 1.04 : 1,
                        y: 0,
                        duration: 0.15,
                        ease: 'power2.out'
                    }));

                    cont.appendChild(btn);
                });
            }

            function updateDetail(animate = false) {
                const cur = services[active];
                dI.innerHTML = `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center">${cur.icon}</div>`;
                dT.textContent = cur.title;
                dL.textContent = cur.long;
                dF.innerHTML = cur.features.map(f => `<li class="text-sm text-gray-200/90 p-2 rounded-lg bg-white/3 flex items-start gap-3"><span class="mt-0.5 text-xs">•</span><span style="font-size:clamp(12px,1.4vw,14px)">${f}</span></li>`).join('');
                if (animate && window.gsap) {
                    gsap.fromTo('#ser-desc', {
                        opacity: 0,
                        y: 20
                    }, {
                        opacity: 1,
                        y: 0,
                        duration: 0.6,
                        ease: 'power2.out'
                    });
                }
            }

            // keyboard navigation
            window.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowRight') {
                    active = (active + 1) % services.length;
                    renderCards();
                    updateDetail(true);
                }
                if (e.key === 'ArrowLeft') {
                    active = (active - 1 + services.length) % services.length;
                    renderCards();
                    updateDetail(true);
                }
            });

            // simple swipe
            (function attachSwipe() {
                let startX = null;
                const el = wr;
                if (!el) return;
                el.addEventListener('pointerdown', (ev) => startX = ev.clientX);
                el.addEventListener('pointerup', (ev) => {
                    if (startX == null) return;
                    const dx = ev.clientX - startX;
                    if (dx > 40) {
                        active = (active - 1 + services.length) % services.length;
                        renderCards();
                        updateDetail(true);
                    }
                    if (dx < -40) {
                        active = (active + 1) % services.length;
                        renderCards();
                        updateDetail(true);
                    }
                    startX = null;
                });
            })();

            // initial render + detail
            renderCards();
            updateDetail(false);

            gsap.timeline({
                    scrollTrigger: {
                        trigger: "#ser-roll",
                        start: "top 80%",
                        end: "top 30%",
                        endTrigger: '#p-title',
                        toggleActions: "play none play reverse",
                    }
                })

                // visual slides in from right while rotating a full 360 -> wheel-like entrance
                .from(visual, {
                    x: '100%',
                    rotation: 360,
                    transformOrigin: '50% 50%',
                    opacity: 0,
                    duration: 0.6,
                    ease: 'power3.out'
                })
                .from('#ser-desc', {
                    y: -40,
                    opacity: 0,
                    duration: 0.6,
                    ease: 'power2.out'
                }, '<0.2');

            // responsive: re-measure and re-render on resize
            window.addEventListener('resize', () => {
                measure();
                renderCards();
            });

        })();


        
