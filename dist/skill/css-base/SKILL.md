---
name: css-base
description: >-
  MANDATORY on every project that uses HTML. Expert guide for @medyll/css-base (v0.7.4).
  Activate for: writing CSS, styling components, layouts, tokens, colors, typography, dark mode,
  code review, refactoring raw CSS values, replacing inline styles, audit of existing code.
  Trigger on: "style this", "add CSS", "refactor CSS", "review this component", "which token",
  "create a component", "dark mode", "grid layout", "data attributes", attr() utilities,
  "clean up styles", "use design system", "migrate to tokens". Works with HTML, React, Svelte,
  Vue, Angular, PHP — any project that imports app.css.
---

# @medyll/css-base — v0.7.4

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
ALWAYS put authored component CSS in @layer components { } by default
ALWAYS use a later layer or outside all layers only for intentional global overrides
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

### Default authoring rule for LLMs

When generating custom CSS, use this rule unless the prompt explicitly says "override utilities" or "global override":

```css
@import "@medyll/css-base";

@layer components {
  .your-component {
    /* default place for authored CSS */
  }
}
```

### When to leave the default

Custom styles placed **outside any layer** override everything. A custom layer declared after importing `app.css` also wins over the built-in layers:

```css
@import "@medyll/css-base";
@layer my-overrides { /* wins over utilities */ }
```

Use that only when you intentionally need to beat utilities or patch global behavior.

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

Use utilities for one-off composition. If you need repeated styling or semantic structure, prefer components or custom CSS in `@layer components`.

**Layout:** `.flex` `.grid` `.block` `.inline-flex` `.hidden` `.relative` `.absolute` `.sticky`

**Flex / Grid:** `.flex-col` `.flex-row` `.flex-wrap` `.items-center` `.items-start` `.items-end` `.items-stretch` `.justify-between` `.justify-center` `.justify-start` `.justify-end` `.flex-1` `.flex-none` `.shrink-0` `.col-span-full`

**Spacing:** `.gap-*` (xs–3xl) · `.p-*` `.px-*` `.py-*` · `.m-*` `.mt-*` `.mb-*` `.mr-*` `.ml-*` `.ml-auto`

**Sizing / Overflow:** `.w-full` `.h-full` `.h-screen` `.min-h-0` `.min-w-0` `.max-w-full` · `.overflow-hidden` `.overflow-auto` `.overflow-x-auto` `.overflow-y-auto`

**Typography:** `.text` `.text-muted` `.text-inverse` `.text-primary` `.text-success` `.text-warning` `.text-critical` `.text-on-primary` · `.text-xs` `.text-sm` `.text-base` · `.font-mono` `.font-normal` `.font-medium` `.font-semibold` `.font-bold` · `.text-center` `.text-right` `.truncate` `.whitespace-nowrap` `.uppercase` `.tabular-nums`

**Surfaces / Borders / Effects:** `.bg-surface` `.bg-surface-alt` `.bg-surface-raised` `.bg-surface-sunken` `.bg-surface-hover` `.bg-primary` `.bg-primary-soft` `.bg-success-soft` `.bg-warning-soft` `.bg-critical-soft` `.bg-transparent` · `.border` `.border-b/t/l/r` `.border-none` `.border-strong` · `.rounded` `.rounded-sm` `.rounded-md` `.rounded-lg` `.rounded-full` · `.shadow` `.shadow-lg`

**Interaction:** `.cursor-pointer` `.cursor-grab` `.cursor-grabbing` `.cursor-not-allowed` · `.opacity-0` `.opacity-80` · `.transition-colors` · `.pointer-events-none` `.pointer-events-auto`

**Helpers:** `.group` `.group-hover:flex` · `.list-disc` · `.space-y-2`

**Responsive prefixes:** `sm:` (640px) · `md:` (768px) · `lg:` (1024px) · `xl:` (1280px) · `2xl:` (1536px)

---

## Components

### Decision Tree — which component for what

```
You need to display…                  → Use
─────────────────────────────────────────────────────
A clickable list of items             → .list .list-item
A grid of records/cards               → .list.list-grid
A vertical menu (sidebar nav)         → .list.list-stack
A bordered list (settings rows)       → .list.list-bordered
A form (label + input pairs)          → .form > .field
A form with labels above              → .form.form-stack
A bar of buttons / search             → .toolbar
A surface container                   → .panel
A label + control + hint/error block  → .form-control
A prefixed/suffixed input             → .input-group
A checkbox/radio row                  → .form-check
A toggle switch                       → .toggle
A grouped form section                → .form-fieldset
A styled select                       → .form-select
A file picker wrapper                 → .form-file
A page/section heading                → .section-header
A "nothing here yet" placeholder      → .empty-state
A standalone box w/ shadow            → .card
A status pill                         → .badge
An informational banner               → .alert
Tabular data                          → .table
Page navigation                       → .pagination
```

If a component fits — use it. **Do not reinvent.** No ad-hoc `ul { list-style: none; padding: 0; }` blocks in component files.

---

### Buttons

```html
<button>Default</button>
<button class="btn-primary">Primary</button>
<button class="btn-ghost">Ghost</button>
<button class="btn-danger">Destructive</button>
<button class="btn-sm">Small</button>
<button class="btn-icon" aria-label="Close">✕</button>
<button class="btn-icon btn-sm" aria-label="More">⋯</button>
```

### Cards

```html
<div class="card">
  <div class="card-header">Title</div>
  <div class="card-body">Content</div>
  <div class="card-footer">Actions</div>
</div>
```

### List / List Item

Generic clickable list. Combine variants: `.list-stack` (default vertical), `.list-row` (horizontal), `.list-grid` (auto-fill), `.list-bordered`, `.list-compact`.

```html
<ul class="list list-stack" role="list">
  <li class="list-item is-active">
    <span class="list-item-icon">📁</span>
    <div class="list-item-content">
      <div class="list-item-title">Projects</div>
      <div class="list-item-meta">12 items</div>
    </div>
    <span class="list-item-trail">›</span>
  </li>
  <li class="list-item">Plain item</li>
</ul>

<!-- Grid of cards -->
<ul class="list list-grid" role="list" style="--list-grid-min: 200px;">
  <li class="list-item">Card 1</li>
</ul>

<!-- Settings-style bordered list -->
<ul class="list list-bordered" role="list">…</ul>
```

States: `.is-active` / `aria-current="page"` (selected) · `.is-disabled` / `aria-disabled="true"`.

### Form / Field

Two-column grid (label | control). Wrap each pair in `.field` (uses `display: contents`).

```html
<form class="form">
  <div class="field">
    <label for="name">Name</label>
    <input id="name" type="text">
  </div>
  <div class="field">
    <label for="email">Email</label>
    <input id="email" type="email">
  </div>
</form>

<!-- Labels above controls -->
<form class="form form-stack">
  <div class="field-stack">
    <label>Name</label>
    <input>
  </div>
</form>

<!-- Inline row of fields -->
<div class="form form-inline">
  <input type="search" placeholder="Search…">
  <button class="btn-primary">Go</button>
</div>
```

### Toolbar

```html
<div class="toolbar toolbar-stretch">
  <input type="search" placeholder="Search">
  <div class="toolbar-spacer"></div>
  <button class="btn-icon" aria-label="Filter">⚙</button>
  <span class="toolbar-separator"></span>
  <button class="btn-primary">New</button>
</div>
```

### Panel / Section Header

```html
<section class="panel panel-bordered">
  <header class="section-header section-header-bordered">
    <h3>Recent activity</h3>
    <a href="#">See all</a>
  </header>
  <ul class="list list-bordered" role="list">…</ul>
</section>
```

### Empty State

```html
<div class="empty-state">
  <div class="empty-state-icon">📭</div>
  <p class="empty-state-title">No projects yet</p>
  <p class="empty-state-text">Create your first project to get started.</p>
  <button class="btn-primary">New project</button>
</div>
```

### Pagination

```html
<nav class="pagination" aria-label="Pagination">
  <button class="btn btn-sm">‹ Prev</button>
  <span class="pagination-info">Page 1 of 4</span>
  <button class="btn btn-sm">Next ›</button>
</nav>
```

### Form extras

```html
<div class="form-control is-invalid">
  <label for="email">Email</label>
  <input id="email" type="email" aria-invalid="true">
  <p class="form-hint">We never share it.</p>
  <p class="form-error">Invalid email.</p>
</div>

<div class="input-group">
  <span class="input-group-text">@</span>
  <input type="text" placeholder="username">
</div>

<label class="form-check">
  <input type="checkbox">
  <span>Remember me</span>
</label>

<label class="toggle">
  <input type="checkbox">
  <span class="toggle-slider"></span>
  <span>Enable sync</span>
</label>
```

### Alerts, Badges, Tables

```html
<div class="alert alert-info">…</div>
<div class="alert alert-success">…</div>
<div class="alert alert-warning">…</div>
<div class="alert alert-error">…</div>

<span class="badge badge-primary">New</span>
<span class="badge badge-success">Done</span>

<div class="table-container">
  <table class="table table-striped">…</table>
</div>
```

---

## Anti-patterns — STOP doing these

```html
<!-- ❌ DO NOT: ad-hoc list reset in every component -->
<style>
  ul { list-style: none; padding: 0; margin: 0; }
  li:hover { background: #f5f5f5; }
</style>

<!-- ✅ DO: use .list / .list-item -->
<ul class="list list-stack" role="list">
  <li class="list-item">…</li>
</ul>
```

```svelte
<!-- ❌ DO NOT: :global(.form) — leaks across components -->
<style>:global(.form) { display: grid; grid-template-columns: max-content 1fr; }</style>

<!-- ✅ DO: use .form component -->
<form class="form">…</form>
```

```html
<!-- ❌ DO NOT: hardcoded grid magic numbers -->
<div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 0.75rem;">

<!-- ✅ DO: use .list-grid + token override -->
<ul class="list list-grid" role="list" style="--list-grid-min: 180px;">
```

```html
<!-- ❌ DO NOT: emoji button without normalization -->
<button style="background:none;border:none;font-size:1.5rem;">✕</button>

<!-- ✅ DO: btn-icon variant -->
<button class="btn-icon" aria-label="Close">✕</button>
```

```html
<!-- ❌ DO NOT: hex/rgb colors -->
<div style="color: #6b7280; border: 1px solid #e0e0e0;">

<!-- ✅ DO: tokens -->
<div style="color: var(--color-text-muted); border: var(--border-width) solid var(--color-border);">
```

```html
<!-- ❌ DO NOT: Tailwind-style named colors (removed in 0.7.0) -->
<div class="bg-purple-100 text-blue-600">

<!-- ✅ DO: semantic utilities -->
<div class="bg-primary-soft text-primary">
```

```html
<!-- ❌ DO NOT: invent .menu / .nav-list / .sidebar-list per component -->
<!-- ✅ DO: compose .list + variants -->
```

---

## Recipes

### Sidebar navigation

```html
<aside class="panel panel-flush" style="width: 240px;">
  <nav>
    <header class="section-header">
      <h3>Workspace</h3>
    </header>
    <ul class="list list-stack" role="list">
      <li class="list-item is-active">
        <span class="list-item-icon">🏠</span>
        <div class="list-item-content">Home</div>
      </li>
      <li class="list-item">
        <span class="list-item-icon">📁</span>
        <div class="list-item-content">Projects</div>
      </li>
    </ul>
  </nav>
</aside>
```

### Records grid (data list)

```html
<header class="toolbar toolbar-stretch">
  <input type="search" placeholder="Filter records…">
  <button class="btn-primary">New record</button>
</header>

<ul class="list list-grid" role="list" style="--list-grid-min: 220px;">
  {#each items as item}
    <li class="list-item panel panel-bordered">
      <div class="list-item-content">
        <div class="list-item-title">{item.name}</div>
        <div class="list-item-meta">{item.meta}</div>
      </div>
    </li>
  {/each}
</ul>

{#if items.length === 0}
  <div class="empty-state">
    <div class="empty-state-icon">📭</div>
    <p class="empty-state-title">No records</p>
  </div>
{/if}
```

### Form layout

```html
<form class="form">
  <div class="field">
    <label for="name">Name</label>
    <input id="name" required>
  </div>
  <div class="field">
    <label for="status">Status</label>
    <select id="status">…</select>
  </div>
  <div class="field">
    <span></span>
    <div class="toolbar toolbar-end" style="padding:0;">
      <button type="button" class="btn-ghost">Cancel</button>
      <button type="submit" class="btn-primary">Save</button>
    </div>
  </div>
</form>
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
- [ ] Authored custom CSS defaults to `@layer components { }`; outside layers or later layers only for intentional overrides
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
| Custom styles not overriding | If you authored CSS in `@layer components`, remember `utilities` wins after it; move the rule to a later custom layer or outside all layers only if that override is intentional |
| Surface color wrong | Override seeds (`--default-color-surface-*`), not `--color-surface` |
| Error color not applying | Token is `--color-critical`, not `--color-error` |
| CDN import fails | Use `cdn.jsdelivr.net/npm/@medyll/css-base/dist/app.css` (latest) |

---

**References:**
- [`references/tokens.md`](references/tokens.md) — valeurs exactes de tous les tokens (couleurs, typographie, espacement, shadows, radius, @function, attr())
- `dist/demo/SKINNING.md` — guide de skinning et overrides
- `dist/metadata.json` — index machine-readable (layers, compat browser)
- [npm](https://www.npmjs.com/package/@medyll/css-base)
