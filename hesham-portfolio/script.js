const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', isOpen);
  });
  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  }));

  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    status.textContent = 'Message ready — connect a backend (e.g. Formspree) to send it live.';
    form.reset();
  });

  // Scroll reveal
  const revealEls = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        entry.target.classList.add('in-view');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(el => io.observe(el));

  // Card cursor-glow (stat cards)
  document.querySelectorAll('.stat-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', (e.clientX - r.left) + 'px');
      card.style.setProperty('--my', (e.clientY - r.top) + 'px');
    });
  });

  // Hero canvas — resolving latent grid + mouse parallax
  const canvas = document.getElementById('latent-canvas');
  const ctx = canvas.getContext('2d');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let W, H, cols, rows, cell = 22, tiles = [], t = 0, mx = 0.5, my = 0.5;

  // Soft ambient orbs drifting slowly — calm atmosphere instead of a
  // busy hard-edged grid.
  let orbs = [];
  function resize() {
    W = canvas.width = canvas.offsetWidth * devicePixelRatio;
    H = canvas.height = canvas.offsetHeight * devicePixelRatio;
    const palette = ['110,91,255', '255,111,89', '198,255,61'];
    orbs = palette.map((color, i) => ({
      color,
      baseX: W * (0.2 + i * 0.32),
      baseY: H * (0.35 + (i % 2) * 0.25),
      r: Math.min(W, H) * (0.3 + i * 0.05),
      phase: i * 2.1
    }));
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    const px = (mx - 0.5) * 60, py = (my - 0.5) * 40;
    orbs.forEach((o, i) => {
      const drift = reduceMotion ? 0 : Math.sin(t * 0.004 + o.phase) * 40;
      const bob = reduceMotion ? 0 : Math.cos(t * 0.003 + o.phase) * 30;
      const x = o.baseX + drift + px * (i + 1) * 0.4;
      const y = o.baseY + bob + py * (i + 1) * 0.4;
      const grad = ctx.createRadialGradient(x, y, 0, x, y, o.r);
      grad.addColorStop(0, `rgba(${o.color}, 0.16)`);
      grad.addColorStop(1, `rgba(${o.color}, 0)`);
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(x, y, o.r, 0, Math.PI * 2);
      ctx.fill();
    });
    t++;
    requestAnimationFrame(draw);
  }

  document.querySelector('.hero').addEventListener('mousemove', (e) => {
    const r = canvas.getBoundingClientRect();
    mx = (e.clientX - r.left) / r.width;
    my = (e.clientY - r.top) / r.height;
  });

  resize();
  window.addEventListener('resize', resize);
  draw();
