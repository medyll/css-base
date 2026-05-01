---
name: css-base
description: >-
  MANDATORY on every project that uses HTML. Expert guide for @medyll/css-base (v0.6.2).
  Activate for: writing CSS, styling components, layouts, tokens, colors, typography, dark mode,
  code review, refactoring raw CSS values, replacing inline styles, audit of existing code.
  Trigger on: "style this", "add CSS", "refactor CSS", "review this component", "which token",
  "create a component", "dark mode", "grid layout", "data attributes", attr() utilities,
  "clean up styles", "use design system", "migrate to tokens". Works with HTML, React, Svelte,
  Vue, Angular, PHP — any project that imports app.css.
---

# @medyll/css-base — v0.6.2

**npm:** [`@medyll/css-base`](https://www.npmjs.com/package/@medyll/css-base)

**Browsers:** Chrome/Edge 125+ (baseline) · **139+** for `@function` and `attr()`

**Token values:** [`references/tokens.md`](references/tokens.md) — source unique pour toutes les valeurs exactes

---

## MANDATORY RULES (LLM: enforce on every code generation and review)

```
NEVER  hard-code px/rem/color values that have a token equivalent
NEVER  write media queries for dark mode — use light-dark()
NEVER  use --color-error — correct token is --color-critical
NEVER  override computed tokens (--color-surface-*) — override seeds only
NEVER  write z-index integers — use --z-dropdown / --z-overlay / --z-modal / --z-toast
ALWAYS wrap custom styles in @layer components { }
ALWAYS use CSS nesting (&) for states and variants
ALWAYS prefer attr() data attributes over utility classes for dynamic values (139+)
ALWAYS use OKLCH for custom colors
ALWAYS check this skill before generating any CSS
```

---

## Installation

```bash
# Package manager
pnpm add @medyll/css-base
npm install @medyll/css-base
yarn add @medyll/css-base
```

```html
<!-- CDN (no bundler) -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@medyll/css-base/dist/app.css">

<!-- Local (after install) -->
<link rel="stylesheet" href="/node_modules/@medyll/css-base/dist/app.css">
```

```css
/* Bundler */
@import "@medyll/css-base";
```

**Framework entry points:**
- Svelte → `src/app.css`
- React → `src/index.css`
- Vue → `src/assets/main.css`
- Angular → `src/styles.css`
- Nuxt → `nuxt.config.ts` css array

---

## New Project Checklist

- [ ] Import `app.css` in entry point
- [ ] Set `--color-primary` in `:root`
- [ ] Set `data-theme` on `<html>` if forcing light/dark
- [ ] Wrap all custom CSS in `@layer components { }`
- [ ] Replace raw values with tokens (see Refactoring below)

---

## Layer Architecture

```
reset < tokens < theme < components < utilities
```

```css
/* declared in app.css */
@layer reset, tokens, theme, components, utilities;
```

- `reset` — browser reset + base HTML defaults
- `tokens` — spacing, typography, motion variables
- `theme` — color palette, surfaces, light/dark
- `components` — styled elements, cards, alerts, tables
- `utilities` — utility classes + `attr()` data attributes

Custom styles placed **outside any layer** override everything. To integrate into the cascade, declare your layer after importing `app.css`:

```css
@import "@medyll/css-base";
@layer my-overrides { /* wins over utilities */ }
```

Wrap component-level styles in `@layer components { }` to respect cascade order.

---

## Refactoring Guide

### Raw values → tokens
```css
/* BEFORE */                          /* AFTER */
padding: 16px;                        padding: var(--pad-md);
margin: 8px 16px;                     margin: var(--marg-sm) var(--marg-md);
font-size: 0.875rem;                  font-size: var(--text-sm);
border-radius: 8px;                   border-radius: var(--radius-md);
box-shadow: 0 4px 6px ...;           box-shadow: var(--shadow-md);
transition: all 150ms ease;           transition: var(--transition-normal);
z-index: 100;                         z-index: var(--z-dropdown);
color: #334155;                       color: var(--color-text);
background: white;                    background: var(--color-surface);
border: 1px solid #e2e8f0;           border: var(--border-width) solid var(--color-border);
```

### Inline styles → attr() (Chrome 139+)
```html
<!-- BEFORE -->
<div style="padding: 24px; border-radius: 8px; box-shadow: var(--shadow-lg)">

<!-- AFTER -->
<div data-pad="lg" data-radius="md" data-elevation="lg">
```

### Media queries → light-dark()
```css
/* BEFORE */
color: #0f172a;
@media (prefers-color-scheme: dark) { color: #f1f5f9; }

/* AFTER */
color: light-dark(var(--default-color-text-light), var(--default-color-text-dark));
/* or simply: */
color: var(--color-text);  /* already handles both modes */
```

### Class soup → semantic tokens
```html
<!-- BEFORE -->
<div class="p-4 rounded-lg shadow-lg bg-white border border-gray-200">

<!-- AFTER (utility classes) -->
<div class="card">

<!-- AFTER (attr, 139+) -->
<div data-pad="md" data-radius="lg" data-elevation="lg" data-bg="surface-raised">
```

---

## Design Tokens

> **Référence complète des valeurs :** [`references/tokens.md`](references/tokens.md)

### Theme seeds (only these need overriding to retheme)

```css
:root {
  --color-primary:               oklch(0.6 0.2 280);
  --default-font-size:           0.875rem;  /* 14px base */
  --default-leading:             1.5;
  --default-color-text-light:    oklch(0.141 0.005 285.823);
  --default-color-text-dark:     oklch(0.962 0.003 264.542);
  --default-color-surface-light: oklch(1 0 0);
  --default-color-surface-dark:  oklch(0.1 0 0);
}
```

### Surface system — quand utiliser quoi

| Token | Use for |
|-------|---------|
| `--color-surface` | Page background |
| `--color-surface-alt` | Sidebar, secondary panels |
| `--color-surface-raised` | Cards, elevated containers |
| `--color-surface-overlay` | Popovers, dropdowns + `backdrop-filter` |
| `--color-surface-sunken` | Inputs, inset areas |
| `--color-surface-hover` | Hover state background |
| `--color-surface-active` | Active/selected state (primary tint) |

⚠️ Override seeds (`--default-color-surface-*`), jamais les tokens computés (`--color-surface-*`).

---

## Dark Mode

```html
<html data-theme="dark">   <!-- force dark -->
<html data-theme="light">  <!-- force light -->
<html>                     <!-- auto via prefers-color-scheme -->
```

```js
document.documentElement.setAttribute('data-theme', 'dark');
document.documentElement.removeAttribute('data-theme'); // back to auto
```

---

## CSS @function (Chrome 139+)

All wrapped in `@supports` — safe to use, silently ignored below 139.

> Liste complète des fonctions → [`references/tokens.md#css-function-chrome-139`](references/tokens.md)

```css
/* Manipulation couleur */
--shade(var(--color-primary), 20%)    /* darken */
--tint(var(--color-primary), 30%)     /* lighten */
--alpha(var(--color-primary), 0.5)    /* opacity */
--hover-state(var(--color-primary))   /* -10% lightness */
--border-from(var(--color-primary))   /* auto-darken for border */

/* Palette depuis une seule couleur */
--harmony-secondary(var(--color-primary))      /* +30° */
--harmony-complementary(var(--color-primary))  /* +180° */
```

**Fallback Chrome 125–138 :** `color-mix(in oklch, var(--color-primary), black 20%)`

**Note :** `--color-secondary` et `--color-complementary` utilisent désormais la relative color syntax (Chrome 125+) — pas besoin de `@function` pour ces deux-là.

---

## attr() Utilities (Chrome 139+)

Dynamic styling via `data-*` attributes — no extra classes needed.

> Table complète des attributs → [`references/tokens.md#attr-utilities-chrome-139`](references/tokens.md)

```html
<div data-elevation="lg" data-pad="lg" data-radius="md">Card</div>
<div class="grid" data-columns="3" data-gap="md">Grid</div>
<p data-text="xl" data-weight="bold" data-color="primary">Heading</p>
<section data-pad="3xl" data-bg="surface-alt" data-ratio="video">Hero</section>
<div data-translate-x="4" data-scale="1.05" data-opacity="0.9">Shifted</div>
```

---

## Utility Classes

**Layout:** `.flex` `.grid` `.block` `.inline-flex` `.inline-grid` `.relative` `.absolute` `.sticky` `.hidden`

**Flex:** `.flex-col` `.flex-row` `.flex-wrap` `.items-center` `.items-start` `.items-end` `.items-stretch` `.justify-between` `.justify-center` `.justify-start` `.justify-end` `.flex-1` `.flex-none` `.grow` `.shrink-0`

**Grid:** `.grid-cols-1`–`.grid-cols-6` · `.col-span-*` · `.col-span-full`

**Spacing:** `.p-*` `.m-*` `.gap-*` (xs–3xl) · `.px-*` `.py-*` `.mx-auto`

**Sizing:** `.w-full` `.h-full` `.min-h-screen` `.max-w-full`

**Typography:** `.font-sans/mono/serif` · `.text-xs`–`.text-2xl` · `.font-normal/medium/semibold/bold` · `.text-center` `.text-right` `.truncate` `.whitespace-nowrap` `.uppercase` `.tabular-nums` `.line-clamp-*`

**Colors:** `.bg-primary` `.bg-surface` `.bg-surface-raised` · `.text-primary` `.text-muted` `.text-success` `.text-warning` `.text-critical`

**Borders:** `.border` `.border-b/t/l/r` `.border-none` · `.rounded` `.rounded-sm/md/lg/full` · `.shadow` `.shadow-lg`

**State/Visibility:** `.opacity-0` `.opacity-80` · `.pointer-events-none` `.pointer-events-auto` · `.overflow-hidden` `.overflow-auto` `.overflow-x-auto` `.overflow-y-auto`

**Interactive:** `.cursor-pointer` `.cursor-grab` `.cursor-not-allowed` · `.transition` `.transition-colors` · `.group` `.group-hover:*` · `.focus:ring`

**Responsive prefixes:** `sm:` (640px) · `md:` (768px) · `lg:` (1024px) · `xl:` (1280px) · `2xl:` (1536px)

---

## Components

**Buttons:** `.btn`

**Cards:**
```html
<div class="card">
  <div class="card-header">Title</div>
  <div class="card-body">Content</div>
  <div class="card-footer">Actions</div>
</div>
```

**Alerts:** `.alert` · `.alert-info` · `.alert-success` · `.alert-warning` · `.alert-error`

**Badges:** `.badge` · `.badge-primary` · `.badge-success` · `.badge-warning` · `.badge-error` · `.badge-neutral`

**Tables:**
```html
<div class="table-container">
  <table class="table table-striped">...</table>
</div>
```

---

## Theme Customization & Skins

Override **seed tokens only** after import:

```css
@import "@medyll/css-base";
:root {
  --color-primary: oklch(0.6 0.2 280);
  --default-font-size: 1rem;
  --default-color-text-light: oklch(0.2 0.02 265);
  --default-color-surface-light: oklch(0.98 0.01 265);
}
```

**Minimal skin (5 variables):**
1. `--color-primary`
2. `--default-color-surface-light` + `--default-color-surface-dark`
3. `--default-color-text-light` + `--default-color-text-dark`

Optional extras: `--radius-md`, `--font-sans`, `--color-secondary`

**10 reference skins** in `dist/demo/`: Netflix, Amazon, WhatsApp, Windows 11, macOS, Spotify, Slack, GitHub, Dashboard, Terminal.
Guide: `dist/demo/SKINNING.md`

---

## Common Patterns

**Sidebar layout:**
```css
@layer components {
  .layout {
    display: grid;
    grid-template-columns: var(--sidebar-width) 1fr;
    min-height: 100dvh;
    @media (width < 768px) { grid-template-columns: 1fr; }
  }
}
```

**Status badge:**
```css
@layer components {
  .status {
    display: inline-flex;
    align-items: center;
    gap: var(--gutter-xs);
    padding: var(--pad-xs) var(--pad-sm);
    border-radius: var(--radius-full);
    font-size: var(--text-xs);
    &.ok    { background: color-mix(in oklch, var(--color-success) 15%, transparent); }
    &.error { background: color-mix(in oklch, var(--color-critical) 15%, transparent); }
  }
}
```

**Card grid with subgrid:**
```html
<div class="grid" data-columns="3" data-gap="lg">
  <div class="card" data-subgrid>
    <div class="card-header">Title</div>
    <div class="card-body">Content</div>
    <div class="card-footer">Actions</div>
  </div>
</div>
```

**Color palette from single primary:**
```css
@layer components {
  .themed {
    background: --surface-tint(var(--color-primary));
    border-color: --border-from(var(--color-primary));
    color: --harmony-complementary(var(--color-primary));
    &:hover { background: --hover-state(var(--color-primary)); }
  }
}
```

---

## Code Review Checklist

When reviewing CSS or HTML in any project using this library:

- [ ] Raw px/rem/color values → replace with tokens
- [ ] `z-index: <number>` → replace with `--z-*` token
- [ ] Dark mode media queries → replace with `light-dark()` or `var(--color-*)`
- [ ] Inline `style=""` attributes → replace with `data-*` attributes (139+) or utility classes
- [ ] Custom CSS outside layers → wrap in `@layer components { }`
- [ ] `--color-error` usage → rename to `--color-critical`
- [ ] Computed token overrides (`--color-surface`) → move to seed tokens
- [ ] Hardcoded hex/rgb colors → convert to OKLCH or use existing token

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| Dark mode not working | Use `light-dark()` or set `data-theme` on `<html>` |
| `attr()` has no effect | Chrome 139+ only — use utility classes as fallback |
| `@function` not resolving | Chrome 139+ — fallback: `color-mix(in oklch, ...)` |
| Custom styles not overriding | Place outside `@layer` or use a later layer |
| Surface color wrong | Override seeds (`--default-color-surface-*`), not `--color-surface` |
| Error color not applying | Token is `--color-critical`, not `--color-error` |
| CDN import fails | Use `cdn.jsdelivr.net/npm/@medyll/css-base/dist/app.css` (latest) |

---

**References:**
- [`references/tokens.md`](references/tokens.md) — valeurs exactes de tous les tokens (couleurs, typographie, espacement, shadows, radius, @function, attr())
- `dist/demo/SKINNING.md` — guide de skinning et overrides
- `dist/metadata.json` — index machine-readable (layers, compat browser)
- [npm](https://www.npmjs.com/package/@medyll/css-base)
