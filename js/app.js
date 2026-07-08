document.addEventListener('DOMContentLoaded', async () => {
  window.RitikScroll.bindAnchors();
  window.RitikScroll.bindSectionObserver();

  const data = await window.RitikLoader.loadAll();
  renderAbout(data.about);
  renderResearch(data.research);
  renderProjects(data.projects);
  renderPublications(data.publications);
  renderBlog(data.blog);
  renderContact(data.contact);

  await window.RitikHero.renderHero(data.site, data.quotes);
});

function renderAbout(about) {
  const panel = document.getElementById('about-panel');
  if (!panel) return;

  const paragraphs = Array.isArray(about?.paragraphs) ? about.paragraphs : [];
  const meta = Array.isArray(about?.meta) ? about.meta : [];

  panel.innerHTML = `
    <div class="text-panel-grid">
      <div class="text-panel-copy">
        ${paragraphs.map((paragraph) => `<p>${escapeHTML(paragraph)}</p>`).join('')}
      </div>
      <div class="text-panel-meta">
        ${meta.map((item) => `
          <div class="meta-item">
            <span class="meta-label">${escapeHTML(item.label || '')}</span>
            <span class="meta-value">${escapeHTML(item.value || '')}</span>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function renderResearch(research) {
  const grid = document.getElementById('research-grid');
  if (!grid) return;
  const items = Array.isArray(research?.items) ? research.items : [];
  grid.innerHTML = items.map((item) => cardTemplate({
    kicker: 'Research',
    title: item.title,
    description: item.description,
    tags: item.tags || [],
  })).join('');
}

function renderProjects(projects) {
  const grid = document.getElementById('projects-grid');
  if (!grid) return;
  const items = Array.isArray(projects?.items) ? projects.items : [];
  grid.innerHTML = items.map((item) => cardTemplate({
    kicker: item.type || 'Project',
    title: item.title,
    description: item.description,
    tags: item.tags || [],
    note: item.note || '',
  })).join('');
}

function renderPublications(publications) {
  const grid = document.getElementById('publications-grid');
  if (!grid) return;
  const items = Array.isArray(publications?.items) ? publications.items : [];

  if (!items.length) {
    grid.innerHTML = `
      <article class="card">
        <div class="card-top"><span class="card-kicker">Future</span></div>
        <h3>No publications yet</h3>
        <p>This section is ready for papers, preprints, or conference proceedings when they are available.</p>
      </article>
    `;
    return;
  }

  grid.innerHTML = items.map((item) => cardTemplate({
    kicker: item.type || 'Publication',
    title: item.title,
    description: item.description,
    tags: item.tags || [],
    note: item.year || '',
  })).join('');
}

function renderBlog(blog) {
  const grid = document.getElementById('blog-grid');
  if (!grid) return;
  const posts = Array.isArray(blog?.posts) ? blog.posts : [];

  if (!posts.length) {
    grid.innerHTML = `
      <article class="card">
        <div class="card-top"><span class="card-kicker">Coming soon</span></div>
        <h3>No blog posts yet</h3>
        <p>Later this space can hold short academic notes, reading summaries, and research reflections.</p>
      </article>
    `;
    return;
  }

  grid.innerHTML = posts.map((item) => cardTemplate({
    kicker: item.category || 'Blog',
    title: item.title,
    description: item.description,
    tags: item.tags || [],
    note: item.date || '',
  })).join('');
}

function renderContact(contact) {
  const grid = document.getElementById('contact-grid');
  if (!grid) return;
  const items = Array.isArray(contact?.items) ? contact.items : [];

  grid.innerHTML = items.map((item) => {
    const content = item.href
      ? `<a href="${escapeAttr(item.href)}" target="${item.external ? '_blank' : '_self'}" rel="${item.external ? 'noreferrer' : ''}">${escapeHTML(item.value || item.label || '')}</a>`
      : `<span>${escapeHTML(item.value || '')}</span>`;
    return `
      <article class="contact-card">
        <div class="label">${escapeHTML(item.label || '')}</div>
        ${content}
      </article>
    `;
  }).join('');
}

function cardTemplate({ kicker, title, description, tags = [], note = '' }) {
  return `
    <article class="card">
      <div class="card-top">
        <span class="card-kicker">${escapeHTML(kicker || '')}</span>
        ${note ? `<span class="card-note">${escapeHTML(note)}</span>` : ''}
      </div>
      <h3>${escapeHTML(title || '')}</h3>
      <p>${escapeHTML(description || '')}</p>
      ${tags.length ? `
        <div class="card-taglist">
          ${tags.map((tag) => `<span class="tag-pill">${escapeHTML(tag)}</span>`).join('')}
        </div>
      ` : ''}
    </article>
  `;
}

function escapeHTML(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function escapeAttr(value) {
  return escapeHTML(value).replaceAll('`', '&#96;');
}
