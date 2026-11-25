// Nalbaki Games site script. Plain JS, loaded with `defer`. No dependencies.
// 1. Header: border once scrolled, hides on scroll down, returns on scroll up; phone menu.
// 2. Scroll reveals ([data-reveal]) and pointer tilt (.tilt), both off under reduced motion.
// 3. Home hero gameplay loop (lazy, pausable) and key-art zoom on scroll.
// 4. Gameplay clips play only while on screen, never under reduced motion or Save-Data; each gets a pause button.
// 5. The services page fills its prices from pricing.js.
// 6. Anonymous visit counting through t.js, and the opt-out on /privacy.
(() => {
  const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const saveData = navigator.connection?.saveData === true;

  // 1. header
  const head = document.querySelector('.site-head');
  const menuBtn = document.querySelector('.menu-btn');
  const panel = document.getElementById('menu');
  let lastY = scrollY;
  let menuOpen = false;
  if (head) {
    addEventListener(
      'scroll',
      () => {
        const y = scrollY;
        head.classList.toggle('is-scrolled', y > 8);
        if (!still && !menuOpen) head.classList.toggle('is-hidden', y > 320 && y > lastY + 4);
        if (y < lastY - 4 || y < 320) head.classList.remove('is-hidden');
        lastY = y;
      },
      { passive: true },
    );
    head.addEventListener('focusin', () => head.classList.remove('is-hidden'));
  }
  if (menuBtn && panel) {
    const setMenu = (open) => {
      menuOpen = open;
      menuBtn.setAttribute('aria-expanded', String(open));
      menuBtn.querySelector('.label').textContent = open ? 'Close' : 'Menu';
      panel.classList.toggle('is-open', open);
      panel.inert = !open;
      document.body.classList.toggle('menu-open', open);
    };
    panel.inert = true;
    menuBtn.addEventListener('click', () => setMenu(!menuOpen));
    addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && menuOpen) {
        setMenu(false);
        menuBtn.focus();
      }
    });
    matchMedia('(min-width: 901px)').addEventListener('change', (e) => e.matches && setMenu(false));
  }

  // 2. reveals and tilt
  const reveals = document.querySelectorAll('[data-reveal]');
  if (reveals.length && !still && 'IntersectionObserver' in window) {
    const ro = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            ro.unobserve(e.target);
          }
        }),
      { rootMargin: '0px 0px -8% 0px' },
    );
    reveals.forEach((el) => ro.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add('in'));
  }
  if (!still && matchMedia('(hover: hover) and (pointer: fine)').matches) {
    document.querySelectorAll('.tilt').forEach((el) => {
      const max = Number(el.dataset.tilt || 5);
      el.addEventListener('pointermove', (e) => {
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        el.classList.add('is-tilting');
        el.style.setProperty('--ry', `${(x * max * 2).toFixed(2)}deg`);
        el.style.setProperty('--rx', `${(-y * max * 2).toFixed(2)}deg`);
      });
      el.addEventListener('pointerleave', () => {
        el.classList.remove('is-tilting');
        el.style.setProperty('--ry', '0deg');
        el.style.setProperty('--rx', '0deg');
      });
    });
  }

  // 3. home hero: the gameplay loop starts after the page has loaded (the key art is the first paint),
  //    pauses off screen, and has its own pause button.
  const hero = document.querySelector('video[data-hero]');
  const addToggle = (v, host) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'clip-toggle';
    let off = false;
    const label = () => {
      b.textContent = off ? 'Play' : 'Pause';
      b.setAttribute('aria-label', off ? 'Play video' : 'Pause video');
    };
    label();
    b.addEventListener('click', () => {
      off = !off;
      if (off) v.pause();
      else v.play().catch(() => {});
      label();
    });
    host.appendChild(b);
    return () => off;
  };
  if (hero && !still && !saveData) {
    const start = () => {
      hero.querySelectorAll('source[data-src]').forEach((s) => (s.src = s.dataset.src));
      hero.load();
      hero.addEventListener('playing', () => hero.classList.add('is-playing'), { once: true });
      const isOff = addToggle(hero, hero.closest('.hero'));
      if ('IntersectionObserver' in window)
        new IntersectionObserver(([e]) => (e.isIntersecting && !isOff() ? hero.play().catch(() => {}) : hero.pause())).observe(hero);
      else hero.play().catch(() => {});
    };
    const later = () => ('requestIdleCallback' in window ? requestIdleCallback(start, { timeout: 2500 }) : setTimeout(start, 1200));
    if (document.readyState === 'complete') later();
    else addEventListener('load', later, { once: true });
  }
  const kas = document.querySelectorAll('[data-reveal-ka]');
  if (kas.length && 'IntersectionObserver' in window && !still) {
    const ko = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && (e.target.classList.add('in'), ko.unobserve(e.target))), { threshold: 0.15 });
    kas.forEach((k) => ko.observe(k));
  } else kas.forEach((k) => k.classList.add('in'));

  // 4. clips
  const clips = document.querySelectorAll('video[data-clip]');
  // Posters and metadata wait until a clip is near the screen, so nothing below the fold competes with the first paint.
  const arm = (v) => {
    if (v.dataset.poster) v.poster = v.dataset.poster;
    if (!still && !saveData) v.preload = 'metadata';
  };
  if ('IntersectionObserver' in window) {
    const near = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && (arm(e.target), near.unobserve(e.target))), { rootMargin: '600px 0px' });
    clips.forEach((v) => near.observe(v));
  } else clips.forEach(arm);
  if (clips.length && !still && !saveData && 'IntersectionObserver' in window) {
    const paused = new WeakSet();
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          const v = e.target;
          if (e.isIntersecting && !paused.has(v)) v.play().catch(() => {});
          else v.pause();
        }),
      { threshold: 0.35 },
    );
    clips.forEach((v) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'clip-toggle';
      const label = (playing) => {
        b.textContent = playing ? 'Pause' : 'Play';
        b.setAttribute('aria-label', playing ? 'Pause clip' : 'Play clip');
      };
      label(true);
      b.addEventListener('click', () => {
        if (paused.has(v)) {
          paused.delete(v);
          v.play().catch(() => {});
          label(true);
        } else {
          paused.add(v);
          v.pause();
          label(false);
        }
      });
      v.parentElement.appendChild(b);
      io.observe(v);
    });
  }

  // 4b. one clip, two cameras: third person leads; the visitor can switch to first person.
  document.querySelectorAll('[data-views]').forEach((fig) => {
    const vids = [...fig.querySelectorAll('video[data-view]')];
    const btns = [...fig.querySelectorAll('[data-to]')];
    const live = !still && !saveData;
    let cur = vids[0].dataset.view;
    let visible = false;
    const show = (to) => {
      cur = to;
      vids.forEach((v) => {
        const on = v.dataset.view === to;
        v.classList.toggle('on', on);
        if (on && visible && live && !paused) v.play().catch(() => {});
        else v.pause();
      });
      btns.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.to === to)));
    };
    let paused = false;
    if (live) {
      const pb = document.createElement('button');
      pb.type = 'button';
      pb.className = 'clip-toggle';
      const label = () => {
        pb.textContent = paused ? 'Play' : 'Pause';
        pb.setAttribute('aria-label', paused ? 'Play clip' : 'Pause clip');
      };
      label();
      pb.addEventListener('click', () => {
        paused = !paused;
        show(cur);
        label();
      });
      fig.appendChild(pb);
    }
    btns.forEach((b) =>
      b.addEventListener('click', () => {
        show(b.dataset.to);
      }),
    );
    if (!('IntersectionObserver' in window)) {
      vids.forEach((v) => v.dataset.poster && (v.poster = v.dataset.poster));
      return;
    }
    new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (e.isIntersecting) vids.forEach((v) => { if (v.dataset.poster && !v.poster) v.poster = v.dataset.poster; if (live) v.preload = 'metadata'; });
        }),
      { rootMargin: '600px 0px' },
    ).observe(fig);
    new IntersectionObserver(
      ([e]) => {
        visible = e.isIntersecting;
        show(cur);
      },
      { threshold: 0.35 },
    ).observe(fig);
  });

  // 4c. buy us a coffee: each amount fills the cup a little more; ?amount=5 (from a game or the old /donate link) pre-picks one.
  document.querySelectorAll('[data-cup]').forEach((card) => {
    const chips = [...card.querySelectorAll('.cup-chip')];
    const hint = card.querySelector('[data-cup-hint]');
    const hearts = card.querySelector('.hearts');
    const cta = card.querySelector('.cup-cta');
    const base = hint.textContent;
    const level = { 3: 0.5, 5: 0.66, 10: 0.82, 25: 0.97 };
    let picked = null;
    const say = (amt) => {
      if (!amt) { hint.textContent = base; return; }
      hint.innerHTML = 'On itch.io, press <b>Download Now</b> or <b>Donate</b> and enter <b>$' + amt + '</b>. Thank you!';
    };
    const fill = (amt) => card.style.setProperty('--fill', amt ? level[amt] || 0.97 : 0.42);
    const pick = (amt) => {
      picked = amt;
      chips.forEach((c) => c.classList.toggle('is-picked', c.dataset.amount === amt));
      fill(amt);
      say(amt);
    };
    const burst = () => {
      if (still || !hearts) return;
      for (let i = 0; i < 6; i++) {
        const h = document.createElement('i');
        h.textContent = '\u2665';
        h.style.setProperty('--x', 30 + Math.random() * 40 + '%');
        h.style.setProperty('--dx', (Math.random() - 0.5) * 80 + 'px');
        h.style.animationDelay = i * 0.08 + 's';
        hearts.appendChild(h);
        setTimeout(() => h.remove(), 1600 + i * 80);
      }
    };
    chips.forEach((c) => {
      const amt = c.dataset.amount;
      c.addEventListener('pointerenter', () => fill(amt));
      c.addEventListener('pointerleave', () => fill(picked));
      c.addEventListener('focus', () => fill(amt));
      c.addEventListener('blur', () => fill(picked));
      c.addEventListener('click', () => { pick(amt); burst(); });
    });
    cta.addEventListener('click', burst);
    const q = new URLSearchParams(location.search).get('amount');
    if (q && level[q]) pick(q);
  });

  // 5. prices
  const pricing = window.NALBAKI_PRICING;
  if (pricing) {
    const fmt = new Intl.NumberFormat('en-US', { style: 'currency', currency: pricing.currency, maximumFractionDigits: 0 });
    document.querySelectorAll('[data-package]').forEach((el) => {
      const p = pricing.packages[el.dataset.package];
      if (!p) return;
      const price = el.querySelector('[data-price]');
      const days = el.querySelector('[data-days]');
      if (price) {
        if (typeof p.price === 'number') {
          price.replaceChildren(fmt.format(p.price));
          const small = document.createElement('small');
          small.textContent = p.unit;
          price.append(' ', small);
        } else {
          price.innerHTML = '<span class="tbd">Price TBD</span>';
        }
      }
      if (days && p.days) days.textContent = `${p.days} working days`;
    });
  }
  // 6. Anonymous visit counting (what it counts and how to switch it off: /privacy). t.js defines window.nbStats and sends nothing
  // until init() gets an endpoint; it stays off for Global Privacy Control, automated browsers, ?nostats and a stored opt-out.
  const stats = window.nbStats;
  const OFF_KEY = 'nb_off';
  const storedOff = () => {
    try {
      return localStorage.getItem(OFF_KEY) === '1';
    } catch {
      return false;
    }
  };
  if (stats && /(^|\.)nalbakigames\.com$/.test(location.hostname)) {
    stats.init({ endpoint: 'https://stats.nalbakigames.com/v1/b', game: 'site', build: 'site-1' });
    stats.track('page_view', { path: location.pathname });
    const GAMES = { 'parkinglot.nalbakigames.com': 'parking-lot', 'hazefall.nalbakigames.com': 'lcs', 'floor42.nalbakigames.com': 'floor-42' };
    const whereOf = (a) => {
      const marked = a.closest('[data-where]');
      if (marked) return marked.dataset.where;
      if (a.closest('.site-head')) return 'header';
      if (a.closest('.site-foot')) return 'footer';
      const s = a.closest('section');
      return (s && (s.id || (s.className || '').split(' ')[0])) || 'page';
    };
    // Attribution travels as UTM tags on the link (never an id): the game reads them when its own session starts.
    const onLink = (e) => {
      if (e.button > 1) return;
      const a = e.composedPath().find((n) => n.tagName === 'A' && n.href);
      if (!a) return;
      let u;
      try {
        u = new URL(a.href, location.href);
      } catch {
        return;
      }
      const game = GAMES[u.hostname];
      if (game) {
        const where = whereOf(a);
        stats.track('play_click', { game, where });
        if (!u.searchParams.has('utm_source')) {
          u.searchParams.set('utm_source', 'site');
          u.searchParams.set('utm_content', where);
          a.href = u.href;
        }
      } else if (u.hostname === 'mergeconflictgames.itch.io' && u.pathname.startsWith('/support')) {
        stats.track('support_click', { where: location.pathname === '/support' ? 'support-page' : location.pathname === '/' ? 'home' : whereOf(a) });
      }
    };
    document.addEventListener('click', onLink, true);
    document.addEventListener('auxclick', onLink, true);
  }
  const toggle = document.querySelector('[data-stats-toggle]');
  const status = document.querySelector('[data-stats-status]');
  if (toggle && status) {
    const off = () => (stats ? stats.isOptedOut() : storedOff());
    const show = () => {
      toggle.textContent = off() ? 'Start counting this device again' : 'Stop counting this device';
      status.textContent = navigator.globalPrivacyControl
        ? 'Your browser sends Global Privacy Control, so counting is already off.'
        : off()
          ? 'Counting is off on this device. Nothing is sent and nothing is stored.'
          : 'Counting is on for this device.';
    };
    toggle.addEventListener('click', () => {
      if (off()) {
        if (stats) stats.optIn();
        else
          try {
            localStorage.removeItem(OFF_KEY);
          } catch {}
      } else if (stats) stats.optOut();
      else
        try {
          localStorage.setItem(OFF_KEY, '1');
        } catch {}
      show();
    });
    show();
  }
})();
