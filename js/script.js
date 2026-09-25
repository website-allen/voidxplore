/* ============================================
   HEADER SCROLL STATE
   ============================================ */
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

/* ============================================
   MOBILE NAV
   ============================================ */
const menuToggle = document.getElementById('menuToggle');
const mobileNav = document.getElementById('mobileNav');
const mobileOverlay = document.getElementById('mobileOverlay');
const mobileClose = document.getElementById('mobileClose');

const openNav = () => { mobileNav.classList.add('open'); mobileOverlay.classList.add('open'); };
const closeNav = () => { mobileNav.classList.remove('open'); mobileOverlay.classList.remove('open'); };

menuToggle.addEventListener('click', openNav);
mobileClose.addEventListener('click', closeNav);
mobileOverlay.addEventListener('click', closeNav);
mobileNav.querySelectorAll('a').forEach(a => a.addEventListener('click', closeNav));

/* ============================================
   SCROLL TO TOP
   ============================================ */
const toTop = document.getElementById('toTop');
window.addEventListener('scroll', () => {
  toTop.classList.toggle('visible', window.scrollY > 600);
}, { passive: true });
toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

/* ============================================
   REVEAL ON SCROLL
   ============================================ */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ============================================
   DYNAMIC THEME + ACTIVE NAV + SLIDING INDICATOR
   ============================================ */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
const indicator = document.getElementById('navIndicator');

const themeMap = {
  'missions':     'missions',
  'capabilities': 'tech',
  'launches':     'launch',
  'gallery':      'gallery',
  'contact':      'missions'
};

function moveIndicator(link) {
  if (!link || !indicator || !link.parentElement) return;
  const linkRect = link.getBoundingClientRect();
  const parentRect = link.parentElement.getBoundingClientRect();
  indicator.style.width = linkRect.width + 'px';
  indicator.style.transform = `translateX(${linkRect.left - parentRect.left - 4}px)`;
}

window.addEventListener('load', () => {
  const active = document.querySelector('.nav-links a.active');
  if (active) moveIndicator(active);
});

window.addEventListener('resize', () => {
  const active = document.querySelector('.nav-links a.active');
  if (active) moveIndicator(active);
}, { passive: true });

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const top = section.offsetTop - 140;
    if (window.scrollY >= top) current = section.id;
  });

  const theme = themeMap[current] || 'missions';
  if (document.body.dataset.theme !== theme) {
    document.body.dataset.theme = theme;
  }

  navLinks.forEach(link => {
    const isActive = link.getAttribute('href') === '#' + current;
    link.classList.toggle('active', isActive);
    if (isActive) moveIndicator(link);
  });
}, { passive: true });