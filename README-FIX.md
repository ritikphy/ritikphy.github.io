# Hero image fix — what to do with this

This zip contains ONLY code files: `index.html`, `css/`, `js/`, `data/`.
It does NOT contain `images/` — your real hero and profile photos are not
touched. Do not delete or replace your existing `images/` folder.

## How to apply

1. Unzip this.
2. Copy `index.html`, the `css/` folder, the `js/` folder, and the `data/`
   folder into your repo, overwriting the existing files of the same name.
3. Leave your `images/` folder exactly as it is.
4. Commit and push:

   git add index.html css js data
   git commit -m "Fix hero background flashing/disappearing"
   git push

5. Wait a minute or two for GitHub Pages to rebuild, then hard refresh
   the live site (Cmd+Shift+R on Mac) to bypass cached CSS/JS.

## What was actually broken

`layout.css` had two separate rules for the hero background: a plain
`.hero-media` rule with a hardcoded image, and a `.hero-media.has-image`
rule that depended on a CSS variable (`--hero-image`) that JavaScript
(`hero.js`) set at runtime. That variable had no fallback value defined
anywhere. The instant `has-image` got applied (as soon as the JS image
preload resolved), the browser tried to compute `var(--hero-image)`,
found nothing valid, and per the CSS spec that invalidates the ENTIRE
`background-image` declaration — not just that one layer. It silently
became `none`. No console error, nothing wrong in the Network tab.
That's the flash-then-disappear you were seeing.

## The fix

- `variables.css` now defines a real default:
  `--hero-image: url("../images/hero/hero01.jpg");`
- `layout.css` now has a single `.hero-media` rule that always reads
  from `var(--hero-image)` — which is now always valid, even before
  any JavaScript runs.
- `hero.js` no longer needs to toggle a class at all. It just updates
  `--hero-image` if a different random hero image successfully
  preloads; otherwise the CSS default (your real hero01.jpg) stays put.

Also included: `css/app-additions.css`, a small stylesheet with rules
for the `.text-panel-grid` / `.text-panel-copy` / `.text-panel-meta` /
`.card-note` classes your `app.js` generates for the About section —
these weren't in your original CSS files, so that section would
otherwise render unstyled. It's linked from `index.html` right after
`components.css`.
