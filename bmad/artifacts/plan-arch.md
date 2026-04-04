# Architecture: css-base Demo Skins

## High-Level Structure

```
dist/
├── app.css              (existing — the library)
├── *.css                (existing — individual modules)
└── demo/
    ├── index.html       (hub — lists all demos with links)
    ├── shared/
    │   ├── nav.html     (shared nav snippet — inlined via copy, no JS import)
    │   └── theme-toggle.js  (3-line script: toggle data-theme, persist localStorage)
    ├── netflix/
    │   ├── index.html
    │   └── skin.css
    ├── amazon/
    │   ├── index.html
    │   └── skin.css
    ├── whatsapp/
    │   ├── index.html
    │   └── skin.css
    ├── windows/
    │   ├── index.html
    │   └── skin.css
    ├── macos/
    │   ├── index.html
    │   └── skin.css
    ├── spotify/
    │   ├── index.html
    │   └── skin.css
    ├── slack/
    │   ├── index.html
    │   └── skin.css
    ├── github/
    │   ├── index.html
    │   └── skin.css
    ├── dashboard/
    │   ├── index.html
    │   └── skin.css
    └── terminal/
        ├── index.html
        └── skin.css
```

## Component Breakdown

### 1. Hub Page (`demo/index.html`)
- **Responsibility:** Entry point, lists all demos as a grid of cards
- **Loads:** `../app.css` (default css-base styling)
- **Content:** Grid of 10 cards, each with demo name, short description, link
- **Theme toggle:** Yes (proves default css-base light/dark works)

### 2. Shared Nav (copy-pasted HTML block)
- **Responsibility:** Consistent navigation across all demos
- **Content:** Demo name, links to all 10 demos + hub, theme toggle button
- **Why copy-paste, not JS include:** Zero dependencies, works with `file://`, no build step
- **The nav HTML is defined in `shared/nav.html` as a reference** — developers copy it into each demo's `index.html`

### 3. Theme Toggle (`shared/theme-toggle.js`)
- **Responsibility:** Toggle `data-theme` attribute on `<html>`, persist to `localStorage`
- **Loaded via:** `<script src="../shared/theme-toggle.js"></script>` in each demo
- **Implementation:**
```js
// theme-toggle.js
const t = localStorage.getItem('theme') || 
  (matchMedia('(prefers-color-scheme:dark)').matches ? 'dark' : 'light');
document.documentElement.dataset.theme = t;
function toggleTheme() {
  const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  document.documentElement.dataset.theme = next;
  localStorage.setItem('theme', next);
}
```

### 4. Demo Page (each `{name}/index.html`)
- **Responsibility:** Showcase a specific UI style using css-base
- **Loads:** `../../app.css` + `./skin.css` + `../shared/theme-toggle.js`
- **Structure:** Nav (copied) + demo-specific HTML content
- **No demo-specific JS** (pure CSS demos)

### 5. Skin File (each `{name}/skin.css`)
- **Responsibility:** Override CSS custom properties to achieve the target look
- **Layer:** Loads AFTER `app.css`, no `@layer` needed (cascade order wins)
- **Pattern:** Override `:root` variables for light, `[data-theme="dark"]` for dark overrides

## Skin Override Strategy

Each `skin.css` follows this structure:

```css
/* skin.css — {DemoName} skin for @medyll/css-base */

:root {
  /* ── Light mode overrides ── */
  --default-color-text-light: oklch(...);
  --default-color-surface-light: oklch(...);
  --color-primary: oklch(...);
  --color-primary-hover: oklch(from var(--color-primary) calc(l - 0.08) c h);
  
  /* ── Typography (optional) ── */
  --default-font-size: 0.875rem;
  
  /* ── Radius (optional) ── */
  --radius-sm: ...;
  --radius-md: ...;
}

/* ── Dark mode overrides ── */
:root {
  --default-color-text-dark: oklch(...);
  --default-color-surface-dark: oklch(...);
}

/* ── Demo-specific layout (minimal, non-token) ── */
/* Only structural CSS that css-base doesn't provide */
/* e.g., fixed bottom player bar height, sidebar width */
```

> Tradeoff: Skin files may need a few structural CSS rules beyond variable overrides (e.g., sidebar widths, fixed positioning). This is acceptable — the goal is to minimize them, not eliminate them entirely. The PRD constraint "variable overrides only" is aspirational; structural layout rules that css-base can't express via tokens are documented as gaps.

## Data Flow

```
Browser loads demo/netflix/index.html
  → <link> loads ../../app.css
    → @layer cascade: base → theme → variables → tokens → typography → palette → components → utilities → attr
  → <link> loads ./skin.css  
    → :root overrides replace token values
    → light-dark() + color-scheme pick correct surface/text colors
    → Derived tokens (--color-surface-alt, shadows) auto-recalculate via --shade()/oklch()
  → <script> loads ../shared/theme-toggle.js
    → Sets data-theme from localStorage or prefers-color-scheme
    → Toggle button switches data-theme, palette.css [data-theme] rules kick in
```

## Key Design Decisions

1. **No build step** — HTML files are static, opened directly. This keeps the demo accessible to anyone evaluating the library.

2. **No JS framework** — Pure HTML + CSS proves css-base works without tooling overhead.

3. **Copy-paste nav vs. JS include** — Simpler, works offline, no CORS issues with `file://`. The reference copy lives in `shared/nav.html`.

4. **skin.css after app.css** — CSS cascade order ensures skin overrides win without needing `!important` or higher-specificity selectors.

5. **Single theme-toggle.js** — The only shared JS. Minimal footprint, loaded from `shared/`.

6. **Playwright validation** — Screenshots at 1920x1080, served via `npx serve dist` to avoid `file://` limitations with Playwright.
