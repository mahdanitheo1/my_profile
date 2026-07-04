document.getElementById('year').textContent = new Date().getFullYear();

function fakeSubmit() {
  const note = document.getElementById('submitNote');
  note.textContent = 'Terkirim! (Demo tanpa backend). Kamu bisa hubungkan ke layanan email/Google Form.';
  note.style.color = 'rgba(52,211,153,0.95)';
}

const mobileNav = document.getElementById('mobileNav');
const navToggle = document.querySelector('.nav-toggle');
const navMobileClose = document.querySelector('.nav-mobile-close');
const navMobileOverlay = document.querySelector('.nav-mobile-overlay');

function setMobileNav(open) {
  if (!mobileNav) return;
  mobileNav.setAttribute('aria-hidden', open ? 'false' : 'true');
  if (navToggle) navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
}

function toggleMobileNav() {
  if (!mobileNav) return;
  const isHidden = mobileNav.getAttribute('aria-hidden') !== 'false';
  setMobileNav(isHidden);
}

if (navToggle) navToggle.addEventListener('click', toggleMobileNav);
if (navMobileClose) navMobileClose.addEventListener('click', () => setMobileNav(false));
if (navMobileOverlay) navMobileOverlay.addEventListener('click', () => setMobileNav(false));

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') setMobileNav(false);
});

document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', (e) => {
    const id = a.getAttribute('href');
    if (!id || id === '#') return;
    const el = document.querySelector(id);
    if (!el) return;
    e.preventDefault();
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    // Tutup drawer jika sedang dibuka
    setMobileNav(false);
  });
});



