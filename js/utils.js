window.RitikUtils = (() => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function clamp(value, min, max) { return Math.min(Math.max(value, min), max); }

  function randomFrom(array) {
    if (!Array.isArray(array) || array.length === 0) return null;
    return array[Math.floor(Math.random() * array.length)];
  }

  async function loadJSON(path, fallback = null) {
    try {
      const response = await fetch(path, { cache: 'no-store' });
      if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
      return await response.json();
    } catch (error) {
      console.warn(`Could not load ${path}:`, error);
      return fallback;
    }
  }

  function scrollToSection(selector) {
    const section = document.querySelector(selector);
    if (!section) return;
    const header = document.getElementById('site-header');
    const headerHeight = header ? header.offsetHeight : 0;
    const targetY = section.getBoundingClientRect().top + window.scrollY - headerHeight + 2;
    if (prefersReducedMotion) {
      window.scrollTo(0, targetY);
      return;
    }
    const startY = window.scrollY || window.pageYOffset;
    const distance = targetY - startY;
    const startTime = performance.now();
    function easeInOutCubic(t) {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }
    function step(now) {
      const elapsed = now - startTime;
      const progress = clamp(elapsed / 520, 0, 1);
      const eased = easeInOutCubic(progress);
      window.scrollTo(0, startY + distance * eased);
      if (progress < 1) window.requestAnimationFrame(step);
    }
    window.requestAnimationFrame(step);
  }

  return { clamp, randomFrom, loadJSON, scrollToSection };
})();
