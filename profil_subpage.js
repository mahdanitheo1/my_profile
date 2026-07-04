document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('[data-subpage-stage]');
  if (!container) return;

  const btnAbout = document.querySelector('[data-nav-about]') || document.querySelector('[data-side-about]');
  const btnSkill = document.querySelector('[data-nav-skill]') || document.querySelector('[data-side-skill]');
  const btnExp = document.querySelector('[data-nav-exp]') || document.querySelector('[data-side-exp]');
  const btnContact = document.querySelector('[data-nav-contact]') || document.querySelector('[data-side-contact]');


  const panels = {
    about: document.querySelector('[data-panel-about]'),
    skill: document.querySelector('[data-panel-skill]'),
    exp: document.querySelector('[data-panel-exp]'),
    contact: document.querySelector('[data-panel-contact]')
  };

  const order = ['about', 'skill', 'exp', 'contact'];

  function setActive(key) {
    if (!panels[key]) return;

    const current = container.getAttribute('data-active') || '';

    // outgoing animation
    if (current && current !== key && panels[current]) {
      const currentIndex = order.indexOf(current);
      const nextIndex = order.indexOf(key);
      const outgoing = panels[current];

      outgoing.classList.remove('anim-left-in', 'anim-right-in');
      outgoing.classList.remove('anim-left-out', 'anim-right-out');
      outgoing.classList.add(nextIndex < currentIndex ? 'anim-right-out' : 'anim-left-out');

      outgoing.addEventListener(
        'animationend',
        () => {
          outgoing.classList.remove('is-active', 'anim-left-out', 'anim-right-out');
        },
        { once: true }
      );
    }

    // incoming animation
    Object.keys(panels).forEach(k => {
      if (panels[k] && k !== key) panels[k].classList.remove('is-active');
    });

    const incoming = panels[key];
    incoming.classList.remove('anim-left-in', 'anim-right-in', 'anim-left-out', 'anim-right-out');

    if (current) {
      const currentIndex = order.indexOf(current);
      const nextIndex = order.indexOf(key);
      incoming.classList.add(nextIndex < currentIndex ? 'anim-left-in' : 'anim-right-in');
    } else {
      incoming.style.opacity = '1';
    }

    incoming.classList.add('is-active');
    container.setAttribute('data-active', key);
  }

  function bind(btn, key) {
    if (!btn) return;
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      setActive(key);
    });
  }

  bind(btnAbout, 'about');
  bind(btnSkill, 'skill');
  bind(btnExp, 'exp');
  bind(btnContact, 'contact');

  function setSideActive(key) {
    const map = {
      about: '[data-side-about]',
      skill: '[data-side-skill]',
      exp: '[data-side-exp]',
      contact: '[data-side-contact]'
    };

    Object.keys(map).forEach(k => {
      const el = map[k] && document.querySelector(map[k]);
      if (!el) return;
      el.classList.toggle('is-active', k === key);
    });
  }

  // default active (read query string if exists)
  const url = new URL(window.location.href);
  const panel = url.searchParams.get('panel');
  const initial = panel && ['about', 'skill', 'exp', 'contact'].includes(panel) ? panel : 'about';

  // side menu binding
  const sideAbout = document.querySelector('[data-side-about]');
  const sideSkill = document.querySelector('[data-side-skill]');
  const sideExp = document.querySelector('[data-side-exp]');
  const sideContact = document.querySelector('[data-side-contact]');

  if (sideAbout) sideAbout.addEventListener('click', () => { setActive('about'); setSideActive('about'); });
  if (sideSkill) sideSkill.addEventListener('click', () => { setActive('skill'); setSideActive('skill'); });
  if (sideExp) sideExp.addEventListener('click', () => { setActive('exp'); setSideActive('exp'); });
  if (sideContact) sideContact.addEventListener('click', () => { setActive('contact'); setSideActive('contact'); });

  setSideActive(initial);
  setActive(initial);
});



