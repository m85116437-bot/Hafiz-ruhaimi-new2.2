// ===== Split-flap "conversion board" =====
// Three flaps, each cycling through a themed list, staggered like an
// old airport departure board — the visual thesis of the page.
const flapData = [
  ["USD → IDR", "EUR → IDR", "SGD → IDR"],
  ["EN → ID", "AR → ID", "ID → EN"],
  ["ETHIOPIA", "GAYO", "TORAJA"]
];

const boardRow = document.getElementById('boardRow');

if (boardRow) {
  const flapEls = flapData.map((list) => {
    const flap = document.createElement('div');
    flap.className = 'flap';
    const span = document.createElement('span');
    span.className = 'flap__text';
    span.textContent = list[0];
    flap.appendChild(span);
    boardRow.appendChild(flap);
    return { el: flap, span, list, index: 0 };
  });

  flapEls.forEach((flap, i) => {
    setInterval(() => {
      flap.index = (flap.index + 1) % flap.list.length;
      // restart animation
      flap.span.style.animation = 'none';
      // force reflow so the animation can restart
      void flap.span.offsetWidth;
      flap.span.style.animation = '';
      flap.span.textContent = flap.list[flap.index];
    }, 2200 + i * 550);
  });
}

// ===== Mobile nav toggle =====
const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelector('.nav__links');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// ===== Scroll reveal =====
const revealTargets = document.querySelectorAll(
  '.about__copy, .about__media, .card, .timeline__item, .contact h2, .contact__sub'
);
revealTargets.forEach((el) => el.classList.add('reveal'));

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);
revealTargets.forEach((el) => observer.observe(el));

// ===== Footer year =====
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();
