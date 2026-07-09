# Your Name — Academic Website

A clean, single-page academic website built for a physics PhD application:
hero with rotating background + quote, intro, about, research, projects,
publications, blog and contact sections, with a smooth-scrolling desktop
nav and a slide-in mobile drawer.

No build tools, no framework, no dependencies to install — it's plain
HTML/CSS/JS, so it runs by opening `index.html` and deploys anywhere that
can serve static files (GitHub Pages, Netlify, your university server).

---

## 1. Folder structure

```
academic-website/
├── index.html                 ← the whole page lives here (one file)
├── README.md                  ← you are here
├── assets/
│   ├── css/
│   │   ├── variables.css      ← colours, fonts, spacing — edit this first
│   │   ├── base.css           ← reset + base typography (rarely needs edits)
│   │   ├── style.css          ← every section's styling, in page order
│   │   └── responsive.css     ← mobile/tablet breakpoints
│   ├── js/
│   │   ├── data.js            ← EDIT: your quotes + hero image list
│   │   └── main.js            ← site behaviour (rarely needs edits)
│   ├── images/
│   │   ├── hero/               ← background photos for the hero section
│   │   ├── profile/             ← your headshot
│   │   ├── projects/            ← optional images for project/blog cards
│   │   └── icons/                ← favicon
│   └── documents/                ← put your CV.pdf here
```

**Rule of thumb:** content lives in `index.html` and `assets/js/data.js`.
Design lives in `assets/css/variables.css`. You will rarely need to touch
`base.css` or `main.js`.

---

## 2. Preview it locally

Any static file server works. From this folder:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000` in a browser. (Opening `index.html`
directly by double-clicking also mostly works, but a local server avoids
a couple of browser quirks with loading local files.)

---

## 3. Add your own content

### Your name, bio, nav brand
Search `index.html` for `Your Name` and `Your University` — every place
those placeholders appear is listed in HTML comments (`<!-- EDIT ME -->`)
right above the relevant block: the nav brand, the Intro section, the
About timeline, and the footer copyright line.

### Your photo
Replace `assets/images/profile/profile-placeholder.svg` with a real photo,
e.g. `profile.jpg`, then update the `src` on the `.intro__photo` `<img>`
in `index.html` to match. A 4:5 portrait crop (taller than wide) fits the
layout best.

### Hero background photos
1. Add your photo(s) to `assets/images/hero/` (1900px+ wide recommended).
2. Open `assets/js/data.js` and add the filename(s) to the `HERO_IMAGES`
   array. One is picked at random on every page load.
3. You can delete the three generated placeholder SVGs once you have at
   least one real photo, or just leave them mixed in.

### Quotes
Also in `assets/js/data.js` — the `QUOTES` array. Each entry is
`{ text: "...", author: "..." }`. Add, remove, or rewrite freely; one is
picked at random on load, independent of the hero image.

### Research interests
In `index.html`, find `id="research"`. There are four `.research-card`
blocks — rewrite the title/text in each, or copy a block to add a fifth.

### Projects
Find `id="projects"`. Each `.project-card` is a self-contained template —
copy one, edit the tag / title / description / link, and set
`data-category` to match one of the filter buttons above it
(`notes`, `internship`, `research`, `course`) so filtering keeps working.
Add a `<img>` inside `.project-card__media` if you want a real image
there instead of the default icon.

### Publications
Find `id="publications"`. It ships with a clean "nothing yet" empty
state. When you have a first paper: delete the `.empty-state` div and
uncomment the `.pub-item` template right below it (instructions are in
the HTML comment) — duplicate that block per publication.

### Blog
Same pattern as Publications — find `id="blog"`, delete the empty state
once you have a first post, and duplicate the commented-out `.blog-card`
template.

### Contact links
Find `id="contact"` for your email/LinkedIn/GitHub/Scholar/ORCID links.
**Also update the same links in the mobile drawer footer** near the top
of `index.html` (search `mobile-drawer__footer`) so desktop and mobile
stay in sync.

### CV download button
Drop your CV into `assets/documents/CV.pdf` (exact filename) and the
"Download CV" button in the Intro section will work immediately.

---

## 4. Customize the look

Almost every colour and font is a variable in `assets/css/variables.css`.
For example, to change the accent colour from brass/gold to something
else, change this one line and it updates everywhere (buttons, links,
underlines, icons):

```css
--color-accent: #B8925A;   /* try a different hex here */
```

Fonts are loaded from Google Fonts in the `<head>` of `index.html`
(Fraunces for headings/quotes, Inter for body text, IBM Plex Mono for
small labels). Swap the `<link>` there and the `--font-*` variables in
`variables.css` together if you want different typefaces.

---

## 5. Deploy to GitHub Pages

1. Create a new repository on GitHub (e.g. `yourname.github.io` for a
   root domain, or any name for a project site).
2. Push this folder's contents to the repository root:
   ```bash
   git init
   git add .
   git commit -m "Initial site"
   git branch -M main
   git remote add origin https://github.com/your-username/your-repo.git
   git push -u origin main
   ```
3. On GitHub: **Settings → Pages → Source → Deploy from a branch →
   `main` / `root`** → Save.
4. Your site will be live at `https://your-username.github.io/your-repo/`
   (or `https://yourname.github.io/` if you used the special repo name)
   within a minute or two.

No build step is required — GitHub Pages serves the HTML/CSS/JS as-is.

---

## 6. Notes

- The animated line-and-star background is generated in the browser
  (`buildTrajectorySVG` in `main.js`), so it's free — no image assets
  needed for that effect, and it also appears faintly behind the Contact
  section for visual continuity.
- Motion respects `prefers-reduced-motion` — visitors with that OS
  setting enabled get a static, non-animated version automatically.
- The quotes shipped in `data.js` are widely-quoted lines from historical
  physicists (Wheeler, Feynman, Bohr, Einstein, Curie, etc.) — swap in
  your own favourites any time.
