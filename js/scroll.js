window.RitikScroll = (() => {
  function bindAnchors() {
    document.querySelectorAll('a[href^="#"]').forEach((link) => {
      link.addEventListener('click', (event) => {
        const target = link.getAttribute('href');
        if (!target || target === '#') return;
        const section = document.querySelector(target);
        if (!section) return;
        event.preventDefault();
        window.RitikUI?.closeDrawer?.();
        window.RitikUtils.scrollToSection(target);
      });
    });
  }

  function bindSectionObserver() {
    const sections = document.querySelectorAll('.section-anchor');
    if (!('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => entry.target.classList.toggle('is-visible', entry.isIntersecting));
    }, { threshold: 0.18 });
    sections.forEach((section) => observer.observe(section));
  }

  return { bindAnchors, bindSectionObserver };
})();
