---
name: css-base
description: >
  Expert guide for writing CSS using @medyll/css-base as a foundation.
  Use this skill whenever the user wants to write CSS, style a component,
  build a layout, use design tokens, define colors or typography, handle dark mode,
  animate elements, or extend the design system — even if they just say
  "style this", "add CSS", "make it look nice", "which color token should I use",
  "create a component", "add dark mode", "make a grid", or "use data attributes".
  Trigger any time CSS authoring, HTML styling, design token usage, or component
  creation is involved, in any project that imports @medyll/css-base.
  Also trigger when the user asks about CSS functions, attr() utilities,
  color manipulation, responsive layouts, or accessibility styling.
  Trigger when the user wants to install or integrate @medyll/css-base into any
  framework: HTML, React, Svelte, Vue, Angular, PHP, or any other.
---

# @medyll/css-base — Expert Skill

You are working with the **@medyll/css-base** design system (v0.1.22).
Always use its tokens, layers, and patterns as the single source of truth —
never hard-code raw values that have a token equivalent.

**Browser targets:** Chrome/Edge 125+ (baseline), 139+ for `@function` and `attr()`.

---

## 0. Installation

### Vérifier si déjà installé
Avant d'installer, vérifier si le package est déjà présent :
```bash
# Chercher dans node_modules ou package.json
grep "@medyll/css-base" package.json
```

### Installer
Si pas encore installé, **demander à l'utilisateur** quel gestionnaire de paquets il utilise (pnpm, npm, yarn, bun) avant de proposer la commande. Sinon détecter via `package-lock.json` (npm), `pnpm-lock.yaml` (pnpm), `yarn.lock` (yarn), `bun.lockb` (bun).

```bash
pnpm add @medyll/css-base   # pnpm (recommandé)
npm install @medyll/css-base
yarn add @medyll/css-base
bun add @medyll/css-base
```

---

## 1. Intégration par framework

### HTML pur / PHP / templates serveur

**Option A — Chemin local (dev, pas de bundler) :**
```html
<link rel="stylesheet" href="/node_modules/@medyll/css-base/dist/app.css">
```
> ⚠️ Ne pas utiliser `@import "@medyll/css-base"` dans un `<link>` ou dans un CSS chargé via `file://` — le bare module specifier ne se résout qu'avec un bundler ou un serveur npm-aware.

**Option B — Avec un bundler (Vite, Webpack, Parcel) :**
```css
/* Dans votre fichier CSS/SCSS entry point */
@import "@medyll/css-base";
```

**Option C — CDN (si pas de node_modules) :**
```html
<!-- Pas encore disponible sur CDN public — utiliser l'option A ou B -->
```

**PHP (Laravel Blade, templates classiques) :**
```html
{{-- layout.blade.php --}}
<link rel="stylesheet" href="{{ asset('node_modules/@medyll/css-base/dist/app.css') }}">
{{-- Ou après compilation avec Vite/Mix : --}}
@vite(['resources/css/app.css'])
```
```css
/* resources/css/app.css */
@import "@medyll/css-base";
```

---

### Svelte 5 / SvelteKit

```css
/* src/app.css ou src/app.postcss */
@import "@medyll/css-base";

/* Vos overrides */
:root {
  --color-primary: oklch(0.6 0.2 280);
}
```

```js
// src/routes/+layout.svelte
<script>
  import '../app.css';
</script>
```

Ou dans `svelte.config.js` si vous utilisez un preprocessor :
```js
// vite.config.js — Vite résout automatiquement @medyll/css-base depuis node_modules
```

Dans les composants Svelte, utilisez les tokens directement :
```svelte
<div class="card flex flex-col gap-md" data-elevation="md">
  <h2 data-text="xl" data-weight="bold">{title}</h2>
  <p data-color="muted">{description}</p>
</div>

<style>
  /* Styles scoped — les tokens globaux sont accessibles */
  .my-component {
    background: var(--color-surface-raised);
    padding: var(--pad-lg);
  }
</style>
```

---

### React / Next.js

```css
/* src/index.css ou app/globals.css (Next.js) */
@import "@medyll/css-base";
```

```jsx
// src/main.jsx ou app/layout.tsx
import './index.css';
```

```jsx
// Composant React — utiliser les classes utilitaires et data-* attrs
function Card({ title, children }) {
  return (
    <div className="card" data-elevation="md" data-pad="lg">
      <h2 data-text="xl" data-weight="semibold">{title}</h2>
      <div data-color="muted">{children}</div>
    </div>
  );
}
```

CSS Modules compatible :
```css
/* Card.module.css */
.card {
  background: var(--color-surface-raised);
  border-radius: var(--radius-md);
  padding: var(--pad-lg);
}
```

---

### Vue 3 / Nuxt 3

```css
/* src/assets/main.css */
@import "@medyll/css-base";
```

```js
// src/main.js
import './assets/main.css'
```

```vue
<!-- Composant Vue -->
<template>
  <div class="card flex flex-col gap-md" data-elevation="md">
    <h2 data-text="xl" data-weight="bold">{{ title }}</h2>
    <p data-color="muted">{{ description }}</p>
  </div>
</template>

<style scoped>
/* Les variables globales restent accessibles dans les styles scoped */
.card {
  background: var(--color-surface-raised);
}
</style>
```

Nuxt 3 — dans `nuxt.config.ts` :
```ts
export default defineNuxtConfig({
  css: ['@medyll/css-base']
})
```

---

### Angular

```css
/* src/styles.css */
@import "@medyll/css-base";
```

```json
// angular.json — alternative
"styles": [
  "node_modules/@medyll/css-base/dist/app.css",
  "src/styles.css"
]
```

```html
<!-- Composant Angular template -->
<div class="card flex flex-col gap-md" data-elevation="md">
  <h2 data-text="xl" data-weight="bold">{{ title }}</h2>
  <p data-color="muted">{{ description }}</p>
</div>
```

```css
/* component.css — ViewEncapsulation.None pour accéder aux tokens */
:host {
  display: block;
  background: var(--color-surface-raised);
  padding: var(--pad-lg);
}
```

---

## 2. Imports modulaires

```css
/* Full system — recommended */
@import "@medyll/css-base";

/* Modular — pick what you need */
@import "@medyll/css-base/theme";       /* customization entry point */
@import "@medyll/css-base/base";        /* html resets, font defaults */
@import "@medyll/css-base/reset";       /* element resets */
@import "@medyll/css-base/variables";   /* spacing scale, sizes */
@import "@medyll/css-base/tokens";      /* semantic tokens */
@import "@medyll/css-base/typography";  /* font families, sizes, weights */
@import "@medyll/css-base/palette";     /* colors, surfaces, shadows */
@import "@medyll/css-base/functions";   /* CSS @function (Chrome 139+) */
@import "@medyll/css-base/components";  /* buttons, cards, alerts, badges, tables */
@import "@medyll/css-base/utilities";   /* utility classes */
@import "@medyll/css-base/attr";        /* data-* attribute styling (Chrome 139+) */
```

HTML link alternative:
```html
<link rel="stylesheet" href="node_modules/@medyll/css-base/dist/app.css">
```

---

## 2. Layer Architecture

```
@layer base, theme.reset, theme.theme, theme.variables, theme.tokens,
       theme.typography, theme.palette, theme.components, utilities, attr;
```

Later layers override earlier ones. **Always wrap custom CSS in a layer:**

```css
@layer components {
  .my-widget { /* inherits correct cascade position */ }
}
```

Your app styles outside these layers will naturally override the system — no specificity hacks needed.

---

## 3. Design Tokens Quick-Reference

Full token lists → `references/tokens.md`. Most-used values below.

### Colors (OKLCH)

| Token | Purpose | Light/Dark |
|---|---|---|
| `--color-primary` | Brand accent (blue) | Same both modes |
| `--color-success` | Positive feedback | Same both modes |
| `--color-warning` | Caution | Same both modes |
| `--color-critical` | Error/danger | Same both modes |
| `--color-info` | Informational | Same both modes |
| `--color-surface` | Page background | auto light-dark |
| `--color-surface-alt` | Sidebar, panels | auto light-dark |
| `--color-surface-raised` | Cards, modals | auto light-dark |
| `--color-surface-overlay` | Drawers, popovers | auto light-dark |
| `--color-surface-sunken` | Inputs, recessed areas | auto light-dark |
| `--color-surface-hover` | List item hover | auto light-dark |
| `--color-surface-active` | Selected item (primary tinted) | auto light-dark |
| `--color-text` | Primary text | auto light-dark |
| `--color-text-muted` | Secondary text | auto light-dark |
| `--color-border` | Default border | auto light-dark |
| `--color-border-strong` | Hover/emphasized border | auto light-dark |

Computed variants: `--color-primary-hover`, `--color-primary-muted`, harmony colors (`--harmony-secondary`, `--harmony-complementary`, `--harmony-analogous`, etc.)

#### Surface selection guide
```
page / body             → --color-surface
sidebar / panel         → --color-surface-alt
card / modal            → --color-surface-raised
popover / drawer        → --color-surface-overlay  (+ backdrop-filter: blur(8px))
input / recessed zone   → --color-surface-sunken
list item :hover        → --color-surface-hover
selected / active item  → --color-surface-active
```

### Typography
```css
/* Families */
font-family: var(--font-sans);    /* system UI stack */
font-family: var(--font-mono);    /* Cascadia Code / Source Code Pro */
font-family: var(--font-serif);

/* Sizes: xs(11px) sm(13px) base(14px) md(16px) lg(18px) xl(20px) 2xl(24px) */
font-size: var(--text-md);

/* Weights: --font-normal(400) --font-medium(500) --font-semibold(600) --font-bold(700) */
font-weight: var(--font-semibold);

/* Line heights: --leading-none(1) tight(1.25) snug(1.375) normal(1.5) relaxed(1.625) loose(2) */
line-height: var(--leading-normal);

/* Letter spacing: --tracking-tight(-0.025em) normal(0) wide(0.025em) */
letter-spacing: var(--tracking-normal);
```

### Spacing (4px grid)
```css
--gutter-xs:  0.25rem  /* 4px  */    Aliases: --pad-xs, --marg-xs, --gap-xs
--gutter-sm:  0.5rem   /* 8px  */    Aliases: --pad-sm, --marg-sm, --gap-sm
--gutter-md:  1rem     /* 16px */    Aliases: --pad-md, --marg-md, --gap-md
--gutter-lg:  1.5rem   /* 24px */    Aliases: --pad-lg, --marg-lg, --gap-lg
--gutter-xl:  2rem     /* 32px */    Aliases: --pad-xl, --marg-xl, --gap-xl
--gutter-2xl: 3rem     /* 48px */    Aliases: --pad-2xl, --marg-2xl, --gap-2xl
--gutter-3xl: 4rem     /* 64px */    Aliases: --pad-3xl, --marg-3xl, --gap-3xl
```

### Border Radius
```css
--radius-xs: 0.25rem   /* 4px — subtle rounding */
--radius-sm: 0.375rem  /* 6px */
--radius-md: 0.5rem    /* 8px — default */
--radius-lg: 0.75rem   /* 12px */
--radius-xl: 1rem      /* 16px */
--radius-full: 9999px  /* pill shape */
```

### Shadows
```css
--shadow-xs   /* subtle */
--shadow-sm   /* light */
--shadow-md   /* default cards */
--shadow-lg   /* modals */
--shadow-xl   /* dropdowns */
--shadow-2xl  /* popovers */
```

### Transitions & Motion
```css
/* Duration: --duration-fast(100ms) normal(150ms) slow(200ms) slower(300ms) */
/* Easing: --ease-in, --ease-out, --ease-in-out, --ease-bounce */
/* Presets: --transition-fast, --transition-normal, --transition-slow */
/* Special: --duration-shimmer(1.5s) --duration-spin(1s) */
transition: var(--transition-normal);
```

### Layout Constants
```css
--header-height: 3.5rem;      /* 56px */
--sidebar-width: 15.625rem;   /* 250px */
--scrollbar-size: 6px;
--border-width: 1px;
--focus-ring-width: 2px;
--focus-ring-gap: 3px;
```

### Z-index Scale
```css
--z-dropdown: 100;  --z-overlay: 200;  --z-modal: 500;  --z-toast: 600;
```

### Icon Sizes
```css
--icon-size-xs: 0.5rem;   /* 8px */
--icon-size-sm: 1.25rem;  /* 20px */
--icon-size-md: 2rem;     /* 32px */
--icon-size-lg: 3rem;     /* 48px */
```

---

## 4. Dark Mode

Handled automatically via `light-dark()` and `color-scheme`. No `prefers-color-scheme` media query needed.

```html
<!-- Auto (follows system) — default -->
<html>

<!-- Force light -->
<html data-theme="light">

<!-- Force dark -->
<html data-theme="dark">
```

```js
// Toggle via JS
document.documentElement.setAttribute('data-theme', 'dark');
document.documentElement.removeAttribute('data-theme'); // back to auto
```

When writing custom colors, always use `light-dark()`:
```css
color: light-dark(oklch(0.3 0.02 265), oklch(0.9 0.01 265));
```

---

## 5. CSS @function (Chrome 139+)

These are real CSS functions defined with `@function` — use them in property values:

### Color Manipulation
```css
/* Shade — mix with black */
color: --shade(var(--color-primary), 20%);

/* Tint — mix with white */
background: --tint(var(--color-primary), 30%);

/* Alpha — apply transparency */
background: --alpha(var(--color-primary), 0.5);

/* Surface tint — subtle primary tint on a surface */
background: --surface-tint(var(--color-surface), var(--color-primary), 8%);
```

### Border Helpers
```css
/* Auto-darken a color for use as border */
border-color: --border-from(var(--color-primary));

/* Semi-transparent border */
border-color: --border-alpha(var(--color-primary), 0.3);
```

### Interactive States
```css
/* Generate a hover-darkened variant */
&:hover { background: --hover-state(var(--color-primary)); }
```

### Color Harmonies (OKLCH hue rotation)
```css
/* +30° hue rotation */
color: --harmony-secondary(var(--color-primary));

/* +180° complementary */
color: --harmony-complementary(var(--color-primary));

/* Also: --harmony-split(), --harmony-triadic(), --harmony-square(), --harmony-tetradic() */
```

> **Fallback for <139:** Use `color-mix()` directly:
> ```css
> background: color-mix(in oklch, var(--color-primary) 80%, black);
> ```

---

## 6. attr() Utilities (Chrome 139+)

Dynamic styling via HTML `data-*` attributes — no classes needed. These use the CSS `attr()` function to read values at runtime.

### Complete Reference

| Attribute | Values | Effect |
|---|---|---|
| `data-rotate` | Any number (deg) | `transform: rotate()` |
| `data-opacity` | 0–1 | `opacity` |
| `data-scale` | Any number | `transform: scale()` |
| `data-columns` | Any integer | `grid-template-columns: repeat(N, 1fr)` |
| `data-rows` | Any integer | `grid-template-rows: repeat(N, 1fr)` |
| `data-subgrid` | (boolean attr) | `grid-template-rows: subgrid` |
| `data-elevation` | xs, sm, md, lg, xl, 2xl | `box-shadow` |
| `data-inset` | xs, sm, md, lg, xl, 2xl | Inset shadow (sunken) |
| `data-ratio` | square, portrait, landscape, video, ultrawide, golden | `aspect-ratio` |
| `data-zindex` | dropdown, overlay, modal, toast | `z-index` |
| `data-pad` | xs – 3xl | `padding` |
| `data-margin` | xs – 3xl | `margin` |
| `data-radius` | sm, md, lg, xl, full | `border-radius` |
| `data-gap` | xs – 3xl | `gap` |
| `data-text` | xs – 2xl | `font-size` |
| `data-weight` | normal, medium, semibold, bold | `font-weight` |
| `data-color` | primary, secondary, success, warning, error, info, muted | `color` |
| `data-bg` | surface, surface-alt, surface-raised, primary, secondary, success, warning, error, info | `background` |
| `data-blur` | sm, md, lg, xl | `filter: blur()` |
| `data-border` | none, sm, md, lg | `border` |
| `data-translate-x` | Any number (px) | `transform: translateX()` |
| `data-translate-y` | Any number (px) | `transform: translateY()` |

### HTML Examples
```html
<!-- Card with elevation and padding -->
<div data-elevation="lg" data-pad="lg" data-radius="md">
  Card content
</div>

<!-- Dynamic grid -->
<div class="grid" data-columns="3" data-gap="md">
  <div>A</div><div>B</div><div>C</div>
</div>

<!-- Styled text -->
<p data-text="xl" data-weight="bold" data-color="primary">
  Highlighted heading
</p>

<!-- Aspect ratio container -->
<div data-ratio="video">16:9 video</div>

<!-- Combined transforms -->
<div data-rotate="6" data-scale="1.05" data-opacity="0.9" data-elevation="xl">
  Fancy tilted card
</div>

<!-- Subgrid alignment -->
<div class="grid" data-columns="3">
  <div class="card" data-subgrid>
    <div>Header</div>
    <div>Body</div>
    <div>Footer</div>
  </div>
</div>
```

> **Fallback for <139:** Use utility classes or inline CSS variables instead.

---

## 7. Utility Classes

Use these in HTML before writing custom CSS. They follow a Tailwind-like naming.

### Layout
`.flex`, `.inline-flex`, `.grid`, `.inline-grid`, `.block`, `.inline-block`, `.hidden`

### Flex
`.grow`, `.shrink`, `.items-center`, `.items-start`, `.items-end`, `.items-stretch`
`.justify-start`, `.justify-center`, `.justify-end`, `.justify-between`, `.justify-around`
`.flex-col`, `.flex-row`, `.flex-wrap`, `.flex-nowrap`

### Grid
`.grid-cols-1` … `.grid-cols-6`, `.col-span-1` … `.col-span-6`

### Gap / Spacing
`.gap-xs` … `.gap-3xl`
`.p-xs` … `.p-3xl`, `.px-*`, `.py-*`, `.pt-*`, `.pb-*`, `.pl-*`, `.pr-*`
`.m-xs` … `.m-3xl`, `.mx-*`, `.my-*`, `.mt-*`, `.mb-*`, `.ml-*`, `.mr-*`
`.mx-auto` (center horizontally)

### Sizing
`.w-full`, `.h-full`, `.w-screen`, `.h-screen`, `.min-h-screen`

### Position
`.relative`, `.absolute`, `.fixed`, `.sticky`, `.inset-0`

### Typography
`.font-sans`, `.font-mono`, `.font-serif`
`.text-xs` … `.text-2xl`
`.font-normal`, `.font-medium`, `.font-semibold`, `.font-bold`
`.text-left`, `.text-center`, `.text-right`
`.uppercase`, `.lowercase`, `.capitalize`, `.truncate`, `.line-clamp-2` … `.line-clamp-4`

### Colors
`.bg-primary`, `.bg-surface`, `.bg-surface-alt`, `.bg-surface-raised`
`.text-primary`, `.text-muted`, `.text-success`, `.text-warning`, `.text-critical`

### Borders
`.border`, `.border-0`, `.rounded`, `.rounded-md`, `.rounded-lg`, `.rounded-full`

### Shadows
`.shadow`, `.shadow-md`, `.shadow-lg`, `.shadow-none`

### Interactive / State
`.hover:bg-primary`, `.hover:bg-surface-hover`, `.hover:text-muted`
`.focus:ring`, `.ring`, `.ring-primary`, `.ring-offset`
`.disabled:opacity-50`, `.cursor-pointer`, `.cursor-default`
`.transition`, `.transition-colors`, `.transition-transform`

### Responsive Prefixes
| Prefix | Min-width |
|--------|-----------|
| `sm:` | 640px |
| `md:` | 768px |
| `lg:` | 1024px |
| `xl:` | 1280px |
| `2xl:` | 1536px |

```html
<div class="flex flex-col md:flex-row md:items-center gap-md">
  <div class="w-full md:w-auto">Sidebar</div>
  <div class="grow">Content</div>
</div>
```

---

## 8. Built-in Components

### Cards
```html
<div class="card">
  <div class="card-header">Title</div>
  <div class="card-body">Content here</div>
  <div class="card-footer">Actions</div>
</div>
```

### Alerts
```html
<div class="alert alert-info">Information message</div>
<div class="alert alert-success">Success!</div>
<div class="alert alert-warning">Warning...</div>
<div class="alert alert-error">Error occurred</div>
```

### Badges
```html
<span class="badge badge-primary">New</span>
<span class="badge badge-success">Active</span>
<span class="badge badge-warning">Pending</span>
<span class="badge badge-error">Failed</span>
<span class="badge badge-neutral">Draft</span>
```

### Tables
```html
<div class="table-container">
  <table class="table table-striped">
    <thead><tr><th>Name</th><th>Status</th></tr></thead>
    <tbody><tr><td>Item</td><td><span class="badge badge-success">Active</span></td></tr></tbody>
  </table>
</div>
<!-- Also: .table-compact for denser rows -->
```

### App Shell
```html
<div class="app-shell">
  <header class="shell-header">App Name</header>
  <aside class="shell-sidebar">
    <div class="sidebar-header">Section</div>
    <a class="sidebar-item" href="#">Link</a>
    <button class="sidebar-tile">Tile</button>
  </aside>
  <main class="workspace-view">
    <div class="asset-grid"><!-- auto-fit minmax(240px, 1fr) --></div>
  </main>
</div>
```

---

## 9. Theme Customization

Override variables **after** the import in `:root`:

```css
@import "@medyll/css-base";

:root {
  /* Brand color — everything derives from this */
  --color-primary: oklch(0.6 0.2 280); /* purple instead of blue */

  /* Typography base */
  --default-font-size: 1rem;       /* 16px instead of default 14px */
  --default-leading: 1.6;
  --default-font-weight: 400;
  --default-tracking: 0.02em;

  /* Text colors (OKLCH) */
  --default-color-text-light: oklch(0.2 0.02 265);
  --default-color-text-dark: oklch(0.95 0.01 265);

  /* Surface colors (OKLCH) */
  --default-color-surface-light: oklch(0.98 0.01 265);
  --default-color-surface-dark: oklch(0.15 0.01 265);

  /* Adjust spacing if needed */
  --gutter-md: 1.25rem; /* 20px instead of 16px */
}
```

All other tokens (surfaces, borders, shadows, hover states) recalculate automatically from these base values.

### Brand Skins (skin.css pattern)

A **skin** is a standalone `skin.css` file that overrides the design system to reproduce a recognizable brand identity — without touching the base library or HTML structure.

**Critical rule: override seed tokens only, never computed tokens.**

`palette.css` uses `light-dark()` to derive all surface, border, and text variants from a small set of seed tokens. If you override `--color-surface` directly, your value gets silently replaced by the cascade. Override the seeds instead:

```css
/* ✅ Correct — override seeds */
:root {
  --default-color-surface-light: oklch(0.98 0 0);    /* near-white */
  --default-color-surface-dark:  oklch(0.13 0.01 0); /* near-black */
  --default-color-text-light:    oklch(0.15 0.01 0);
  --default-color-text-dark:     oklch(0.95 0.01 0);
}

/* ❌ Wrong — computed token, overridden by light-dark() */
:root { --color-surface: #fff; }
```

**5-step skin.css template:**

```css
/* Step 1 — map data-theme to color-scheme (required for light-dark()) */
[data-theme="dark"]  { color-scheme: dark; }
[data-theme="light"] { color-scheme: light; }

/* Step 2 — brand primary */
:root { --color-primary: oklch(0.65 0.25 280); }

/* Step 3 — surface seeds */
:root {
  --default-color-surface-light: oklch(0.97 0.005 265);
  --default-color-surface-dark:  oklch(0.14 0.01 265);
}

/* Step 4 — text seeds */
:root {
  --default-color-text-light: oklch(0.18 0.015 265);
  --default-color-text-dark:  oklch(0.93 0.01 265);
}

/* Step 5 — optional: radius, font, brand-specific tokens */
:root {
  --radius-md: 0.25rem;
  --default-font-family: 'Inter', sans-serif;
}
```

All 10 reference skins live in `dist/demo/{netflix,amazon,whatsapp,windows,macos,spotify,slack,github,dashboard,terminal}/skin.css`. A starter template with inline comments is at `dist/demo/skin-template.css`. The full guide with override matrix is at `dist/demo/SKINNING.md`.

**`--color-critical` is the correct token for error/danger states** — `--color-error` does not exist.

---

## 10. Authoring Rules

1. **Always prefer tokens** — `var(--color-primary)` not `#3b82f6`, `var(--pad-md)` not `1rem`.
2. **Respect layers** — wrap custom rules in `@layer components { }` or `@layer utilities { }`.
3. **No media queries for dark mode** — `light-dark()` handles it. Write: `color: light-dark(lightVal, darkVal);`
4. **Use CSS nesting** — `&` for child/state selectors inside rules.
5. **Utilities first** — use HTML utility classes before writing custom CSS.
6. **attr() for dynamic values** — when values come from data or need runtime flexibility, use `data-*` attributes (Chrome 139+).
7. **OKLCH for custom colors** — derive from primary for consistency:
   ```css
   --my-accent: oklch(from var(--color-primary) l c calc(h + 30));
   ```
8. **Semantic surface selection** — match surfaces to their role (see surface guide above).
9. **Accessibility** — the system includes `:focus-visible`, `prefers-reduced-motion`, and `prefers-contrast: more`. Don't override these.

---

## 11. Common Patterns

### Responsive sidebar layout
```css
@layer components {
  .layout {
    display: grid;
    grid-template-columns: var(--sidebar-width) 1fr;
    min-height: 100dvh;

    @media (width < 768px) {
      grid-template-columns: 1fr;
    }
  }
}
```

### Status badge with tinted background
```css
@layer components {
  .status {
    display: inline-flex;
    align-items: center;
    gap: var(--gutter-xs);
    padding: var(--pad-xs) var(--pad-sm);
    border-radius: var(--radius-full);
    font-size: var(--text-xs);
    font-weight: var(--font-medium);

    &.status--ok      { background: color-mix(in oklch, var(--color-success) 15%, transparent); color: var(--color-success); }
    &.status--warn    { background: color-mix(in oklch, var(--color-warning) 15%, transparent); color: var(--color-warning); }
    &.status--error   { background: color-mix(in oklch, var(--color-critical) 15%, transparent); color: var(--color-critical); }
  }
}
```

### Hero section with attr()
```html
<section data-pad="3xl" data-bg="surface-alt" data-radius="xl">
  <h1 data-text="2xl" data-weight="bold" data-color="primary">Welcome</h1>
  <p data-text="lg" data-color="muted">Subtitle text here</p>
</section>
```

### Card grid with subgrid
```html
<div class="grid" data-columns="3" data-gap="lg">
  <div class="card" data-subgrid>
    <div class="card-header">Title</div>
    <div class="card-body">Variable-length content...</div>
    <div class="card-footer">Actions</div>
  </div>
  <!-- More cards — headers/footers align across columns -->
</div>
```

### Custom color with @function (Chrome 139+)
```css
@layer components {
  .cta-button {
    background: var(--color-primary);
    color: white;
    padding: var(--pad-sm) var(--pad-lg);
    border-radius: var(--radius-md);
    border: 1px solid --border-from(var(--color-primary));
    transition: var(--transition-fast);

    &:hover {
      background: --hover-state(var(--color-primary));
    }

    &:focus-visible {
      outline: var(--focus-ring-width) solid var(--color-primary);
      outline-offset: var(--focus-ring-gap);
    }
  }
}
```

### Full-page HTML skeleton
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="node_modules/@medyll/css-base/dist/app.css">
  <link rel="stylesheet" href="app.css"> <!-- your overrides -->
  <title>My App</title>
</head>
<body>
  <div class="app-shell">
    <header class="shell-header">
      <h1 data-text="lg" data-weight="semibold">App Name</h1>
    </header>
    <aside class="shell-sidebar">
      <nav>
        <a class="sidebar-item" href="#">Dashboard</a>
        <a class="sidebar-item" href="#">Settings</a>
      </nav>
    </aside>
    <main class="workspace-view">
      <div class="flex flex-col gap-lg p-lg">
        <div class="grid" data-columns="3" data-gap="md">
          <div class="card" data-elevation="md">
            <div class="card-header">Metric</div>
            <div class="card-body" data-text="2xl" data-weight="bold">1,234</div>
          </div>
        </div>
      </div>
    </main>
  </div>
</body>
</html>
```

---

## 12. Troubleshooting

| Problem | Fix |
|---|---|
| Colors don't change in dark mode | Use `light-dark()`, not static values |
| Borders wrong color | Ensure `--color-border` derives from `--color-primary` |
| `attr()` not working | Requires Chrome 139+ — fall back to utility classes |
| CSS `@function` not working | Requires Chrome 139+ — use `color-mix()` directly |
| Custom styles don't override | Place them outside `@layer` or in a later layer |
| Spacing feels off | Check you're using `--gutter-*` / `--pad-*` tokens, not raw values |

---

## Further Reference

- Full token list with every CSS variable → `references/tokens.md`
- Source dist files → `D:\boulot\dev\html\css-base\dist/` (theme.css, utilities.css, attr.css, functions.css, etc.)
- When uncertain about a token, read the relevant dist file to verify current values.
