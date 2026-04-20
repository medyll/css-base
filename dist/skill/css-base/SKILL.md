---
name: css-base
description: >-
  Expert guide for CSS using @medyll/css-base (v0.6.0). Use this skill whenever the user wants to write CSS, style a component, build a layout, use design tokens, define colors or typography, handle dark mode, or create components. Trigger on: "style this", "add CSS", "make it look nice", "which color token", "create a component", "add dark mode", "make a grid", "use data attributes", CSS functions, attr() utilities, responsive layouts, accessibility. Works with any framework: HTML, React, Svelte, Vue, Angular, PHP.
---

# @medyll/css-base — Expert Skill (v0.6.0)

**Browser targets:** Chrome/Edge 125+ (baseline), **139+** for `@function` and `attr()`.

**Rule:** Always use tokens, layers, and patterns — never hard-code raw values that have a token equivalent.

---

## Installation

```bash
pnpm add @medyll/css-base   # or npm/yarn
```

**HTML:**
```html
<link rel="stylesheet" href="/node_modules/@medyll/css-base/dist/app.css">
```

**CSS (with bundler):**
```css
@import "@medyll/css-base";
```

**Framework integration:** Import `app.css` in your entry point (Svelte: `src/app.css`, React: `src/index.css`, Vue: `src/assets/main.css`, Angular: `src/styles.css`, Nuxt: add to `nuxt.config.ts` css array).

---

## Layer Architecture

```css
@layer base, theme.reset, theme.theme, theme.variables, theme.tokens,
       theme.typography, theme.palette, theme.components, components;
```

Your app styles **outside** these layers override naturally. Wrap custom styles in `@layer components { }`.

---

## Design Tokens (Quick Reference)

Full list → `references/tokens.md`

### Theme customization (override in `:root` after import)
```css
:root {
  --color-primary: oklch(0.6 0.2 280);  /* Brand color */
  --default-font-size: 1rem;            /* Default: 0.875rem */
  --default-leading: 1.6;
  --default-color-text-light: oklch(0.2 0.02 265);
  --default-color-surface-light: oklch(0.98 0.01 265);
}
```

### Colors
- `--color-primary`, `--color-success`, `--color-warning`, `--color-critical`, `--color-info`
- `--color-surface`, `--color-surface-alt`, `--color-surface-raised`, `--color-surface-overlay`, `--color-surface-sunken`, `--color-surface-hover`, `--color-surface-active`
- `--color-text`, `--color-text-muted`, `--color-border`, `--color-border-strong`

**Surface guide:** page→surface | sidebar→surface-alt | card→surface-raised | popover→surface-overlay | input→surface-sunken

### Typography
- Families: `--font-sans`, `--font-mono`, `--font-serif`
- Sizes: `--text-xs` (11px) to `--text-2xl` (24px), `--text-md` (16px) default
- Weights: `--font-normal` (400), `--font-medium` (500), `--font-semibold` (600), `--font-bold` (700)
- Line heights: `--leading-none` (1) to `--leading-loose` (2)

### Spacing (4px grid)
`--gutter-xs` (4px), `--gutter-sm` (8px), `--gutter-md` (16px), `--gutter-lg` (24px), `--gutter-xl` (32px), `--gutter-2xl` (48px), `--gutter-3xl` (64px)

Aliases: `--pad-*`, `--marg-*`, `--gap-*` (same values)

### Other tokens
- Radius: `--radius-xs` to `--radius-full` (9999px)
- Shadows: `--shadow-xs` to `--shadow-2xl`
- Motion: `--duration-fast` (100ms), `--duration-normal` (150ms), `--transition-*` presets
- Layout: `--header-height` (56px), `--sidebar-width` (250px), `--z-dropdown` (100), `--z-modal` (500)

---

## Dark Mode

Automatic via `light-dark()`. Override with `data-theme` attribute:

```html
<html data-theme="dark">  <!-- force dark -->
<html data-theme="light"> <!-- force light -->
<html>                    <!-- auto (default) -->
```

```js
document.documentElement.setAttribute('data-theme', 'dark');
document.documentElement.removeAttribute('data-theme'); // auto
```

---

## CSS @function (Chrome 139+)

```css
color: --shade(var(--color-primary), 20%);           /* mix with black */
background: --tint(var(--color-primary), 30%);       /* mix with white */
background: --alpha(var(--color-primary), 0.5);      /* transparency */
border-color: --border-from(var(--color-primary));   /* auto-darken */
&:hover { background: --hover-state(var(--color-primary)); }
color: --harmony-secondary(var(--color-primary));    /* +30° hue */
color: --harmony-complementary(var(--color-primary));/* +180° hue */
```

**Fallback <139:** Use `color-mix(in oklch, var(--color) 80%, black)`.

---

## attr() Utilities (Chrome 139+)

Dynamic styling via `data-*` attributes — no classes needed.

| Attribute | Values | Effect |
|-----------|--------|--------|
| `data-rotate` | number (deg) | rotate |
| `data-opacity` | 0–1 | opacity |
| `data-scale` | number | scale |
| `data-columns` / `data-rows` | integer | grid-template |
| `data-subgrid` | (boolean) | subgrid |
| `data-elevation` | xs–2xl | box-shadow |
| `data-inset` | xs–2xl | inset shadow |
| `data-ratio` | square, portrait, landscape, video, ultrawide, golden | aspect-ratio |
| `data-pad` / `data-margin` / `data-gap` | xs–3xl | padding/margin/gap |
| `data-radius` | sm, md, lg, xl, full | border-radius |
| `data-text` / `data-weight` | xs–2xl / normal–bold | typography |
| `data-color` / `data-bg` | primary, success, warning, error, info, surface* | colors |
| `data-zindex` | dropdown, overlay, modal, toast | z-index |
| `data-blur` | sm, md, lg, xl | blur filter |
| `data-border` | none, sm, md, lg | border |

**Example:**
```html
<div data-elevation="lg" data-pad="lg" data-radius="md">Card</div>
<div class="grid" data-columns="3" data-gap="md">...</div>
<p data-text="xl" data-weight="bold" data-color="primary">Heading</p>
<div data-ratio="video">16:9</div>
```

---

## Utility Classes

**Layout:** `.flex`, `.grid`, `.block`, `.hidden`, `.inline-flex`, `.inline-grid`

**Flex:** `.flex-col`, `.items-center`, `.justify-between`, `.grow`, `.shrink`, `.flex-wrap`

**Grid:** `.grid-cols-1`–`.grid-cols-6`, `.col-span-*`

**Spacing:** `.p-*`, `.m-*`, `.gap-*` (xs–3xl), `.px-*`, `.py-*`, `.mx-auto`

**Sizing:** `.w-full`, `.h-full`, `.min-h-screen`

**Typography:** `.font-sans/mono/serif`, `.text-xs`–`.text-2xl`, `.font-normal/medium/semibold/bold`, `.text-center`, `.truncate`, `.line-clamp-*`

**Colors:** `.bg-primary/surface/surface-raised`, `.text-primary/muted/success/warning/critical`

**Borders:** `.border`, `.rounded-md/lg/full`, `.shadow-md/lg`

**Interactive:** `.hover:bg-*`, `.focus:ring`, `.transition`, `.cursor-pointer`

**Responsive prefixes:** `sm:` (640px), `md:` (768px), `lg:` (1024px), `xl:` (1280px), `2xl:` (1536px)

```html
<div class="flex flex-col md:flex-row md:items-center gap-md">
  <div class="w-full md:w-auto">Sidebar</div>
  <div class="grow">Content</div>
</div>
```

---

## Components

**Cards:**
```html
<div class="card">
  <div class="card-header">Title</div>
  <div class="card-body">Content</div>
  <div class="card-footer">Actions</div>
</div>
```

**Alerts:** `.alert`, `.alert-info`, `.alert-success`, `.alert-warning`, `.alert-error`

**Badges:** `.badge`, `.badge-primary`, `.badge-success`, `.badge-warning`, `.badge-error`, `.badge-neutral`

**Tables:**
```html
<div class="table-container">
  <table class="table table-striped">
    <thead><tr><th>Name</th></tr></thead>
    <tbody><tr><td>Item</td></tr></tbody>
  </table>
</div>
```

---

## Theme Customization & Skins

Override seed tokens **only** (not computed tokens like `--color-surface`):

```css
@import "@medyll/css-base";
:root {
  --color-primary: oklch(0.6 0.2 280);
  --default-font-size: 1rem;
  --default-color-text-light: oklch(0.2 0.02 265);
  --default-color-surface-light: oklch(0.98 0.01 265);
}
```

**Skin.css pattern (5 steps):**
1. `[data-theme="dark"] { color-scheme: dark; }`
2. Override `--color-primary`
3. Override `--default-color-surface-light/dark`
4. Override `--default-color-text-light/dark`
5. Optional: radius, font

**10 demo skins** in `dist/demo/`: Netflix, Amazon, WhatsApp, Windows 11, macOS, Spotify, Slack, GitHub, Dashboard, Terminal. Guide: `dist/demo/SKINNING.md`.

**Note:** Use `--color-critical` for errors (not `--color-error`).

---

## Authoring Rules

1. **Tokens first** — `var(--pad-md)` not `1rem`
2. **Respect layers** — wrap in `@layer components { }`
3. **No media queries for dark mode** — use `light-dark()`
4. **Use CSS nesting** — `&` for states
5. **Utilities first** — classes before custom CSS
6. **attr() for dynamic values** (Chrome 139+)
7. **OKLCH for custom colors** — derive from primary
8. **Accessibility built-in** — `:focus-visible`, `prefers-reduced-motion`, `prefers-contrast: more` — don't override

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
.status {
  display: inline-flex;
  align-items: center;
  gap: var(--gutter-xs);
  padding: var(--pad-xs) var(--pad-sm);
  border-radius: var(--radius-full);
  font-size: var(--text-xs);
  &.status--ok { background: color-mix(in oklch, var(--color-success) 15%, transparent); }
  &.status--error { background: color-mix(in oklch, var(--color-critical) 15%, transparent); }
}
```

**Hero with attr():**
```html
<section data-pad="3xl" data-bg="surface-alt" data-radius="xl">
  <h1 data-text="2xl" data-weight="bold" data-color="primary">Welcome</h1>
</section>
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

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| Dark mode not working | Use `light-dark()` or set `data-theme` attribute |
| attr() not working | Chrome 139+ required — use utility classes as fallback |
| @function not working | Chrome 139+ — use `color-mix()` directly |
| Styles not overriding | Place outside `@layer` or use later layer |
| Wrong surface color | Override seed tokens (`--default-color-surface-*`), not computed tokens |

---

**References:** Full tokens → `references/tokens.md` | Demo skins → `dist/demo/SKINNING.md`
