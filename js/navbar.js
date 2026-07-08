window.RitikUI = (() => {
  const header = document.getElementById('site-header');
  const drawer = document.getElementById('mobile-drawer');
  const backdrop = document.getElementById('drawer-backdrop');
  const toggle = document.getElementById('menu-toggle');
  const closeBtn = document.getElementById('drawer-close');

  function setScrolledState() {
    if (!header) return;
    header.classList.toggle('is-scrolled', window.scrollY > 18);
  }

  function openDrawer() {
    if (!drawer || !backdrop || !toggle) return;
    drawer.classList.add('is-open');
    backdrop.hidden = false;
    requestAnimationFrame(() => backdrop.classList.add('is-open'));
    drawer.setAttribute('aria-hidden', 'false');
    toggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    if (!drawer || !backdrop || !toggle) return;
    drawer.classList.remove('is-open');
    backdrop.classList.remove('is-open');
    drawer.setAttribute('aria-hidden', 'true');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    setTimeout(() => { if (!backdrop.classList.contains('is-open')) backdrop.hidden = true; }, 260);
  }

  function bindDrawer() {
    if (toggle) toggle.addEventListener('click', () => {
      const isOpen = toggle.getAttribute('aria-expanded') === 'true';
      isOpen ? closeDrawer() : openDrawer();
    });
    if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
    if (backdrop) backdrop.addEventListener('click', closeDrawer);
    if (drawer) {
      drawer.querySelectorAll('a[href^="#"]').forEach((link) => link.addEventListener('click', () => setTimeout(closeDrawer, 60)));
    }
    window.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeDrawer(); });
  }

  function init() {
    setScrolledState();
    bindDrawer();
    window.addEventListener('scroll', setScrolledState, { passive: true });
  }

  return { init, openDrawer, closeDrawer };
})();

document.addEventListener('DOMContentLoaded', () => window.RitikUI.init());
