window.RitikLoader = (() => {
  const cache = new Map();

  async function load(path, fallback = null) {
    if (cache.has(path)) return cache.get(path);
    const data = await window.RitikUtils.loadJSON(path, fallback);
    cache.set(path, data);
    return data;
  }

  async function loadAll() {
    const [site, about, research, projects, publications, blog, contact, quotes] = await Promise.all([
      load('data/site.json', {}),
      load('data/about.json', {}),
      load('data/research.json', {}),
      load('data/projects.json', {}),
      load('data/publications.json', {}),
      load('data/blog.json', {}),
      load('data/contact.json', {}),
      load('data/quotes.json', { quotes: [] }),
    ]);
    return { site, about, research, projects, publications, blog, contact, quotes };
  }

  return { load, loadAll };
})();
