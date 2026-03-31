/* ================================================
   SAVORIA — Shared Nav & Cursor Logic
================================================ */

/* ---- Custom Cursor ---- */
(function initCursor() {
  const ring = document.getElementById('cursorRing');
  const dot  = document.getElementById('cursorDot');
  if (!ring || !dot) return;
  let mx=0,my=0,rx=0,ry=0;
  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    dot.style.left = mx + 'px';
    dot.style.top  = my + 'px';
  });
  (function animRing() {
    rx += (mx - rx) * 0.14;
    ry += (my - ry) * 0.14;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(animRing);
  })();
  // cursor scale on hoverable elements
  document.querySelectorAll('a,button,.menu-item,.home-hero-tile').forEach(el => {
    el.addEventListener('mouseenter', () => {
      ring.querySelector('.cursor-ring-el').style.cssText = 'width:52px;height:52px;transform:translate(-50%,-50%);';
    });
    el.addEventListener('mouseleave', () => {
      ring.querySelector('.cursor-ring-el').style.cssText = 'width:36px;height:36px;transform:translate(-50%,-50%);';
    });
  });
})();

/* ---- Sticky nav on scroll ---- */
window.addEventListener('scroll', () => {
  const nav = document.getElementById('mainNav');
  if (nav) nav.classList.toggle('scrolled', window.scrollY > 40);
});

/* ---- Mobile burger overlay ---- */
function openNav() {
  document.getElementById('menuOverlay').classList.add('open');
}
function closeNav() {
  document.getElementById('menuOverlay').classList.remove('open');
}

/* ---- Active nav link ---- */
function setActiveNav(page) {
  document.querySelectorAll('.nav-links a[data-page]').forEach(a => {
    a.classList.toggle('active', a.dataset.page === page);
  });
}

/* ---- Scroll reveal ---- */
function initReveals() {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
}

/* ---- Footer year ---- */
document.querySelectorAll('.footer-year').forEach(el => {
  el.textContent = new Date().getFullYear();
});

/* ---- Init on load ---- */
document.addEventListener('DOMContentLoaded', () => {
  applyLang(currentLang);
  initReveals();
});
