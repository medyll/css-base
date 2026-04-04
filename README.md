# css-base

A modern CSS design system library targeting the latest Chrome and Edge browsers.
Built exclusively with cutting-edge CSS features — no preprocessor, no build step required.

## Browser support

- Chrome 125+
- Edge 125+

**Note:** CSS `@function` and `attr()` features require Chrome 139+ / Edge 139+

## File structure

```
dist/
  app.css          Entry point — import this file only
  theme.css        Default theme values (font, colors)
  base.css         HTML resets and font defaults
  variables.css    Spacing scale and size scale
  tokens.css       Semantic tokens (padding, margin, radius, motion, z-index)
  typography.css   Font families, sizes, weights, line heights
  functions.css    CSS @functions for color manipulation (Chrome 139+)
  palette.css      Colors, surfaces (computed), shadows (OKLCH)
  components.css   Base components (headings, buttons, inputs, cards, alerts)
  utilities.css    Utility classes for layout, spacing, color
  attr.css         Dynamic styling via attr() (Chrome 139+)
  reset.css        HTML resets and base styles
  metadata.json    Machine-readable index for IDE tooling
```

## Demo skins

The repository ships 10 static demo pages in `dist/demo/` to prove that `@medyll/css-base` can be re-skinned with token overrides only.

- Demo hub: `dist/demo/index.html`
- Included skins: Netflix, Amazon, WhatsApp, Windows 11, macOS, Spotify, Slack, GitHub, Dashboard, Terminal
- Skin authoring guide: `dist/demo/SKINNING.md`
- Starter template: `dist/demo/skin-template.css`

Each demo loads only `app.css` plus a local `skin.css`. No component markup forks and no library source changes are required.

## Installation

```bash
pnpm add @medyll/css-base
# or
npm install @medyll/css-base
# or
yarn add @medyll/css-base
```

## Usage

In your CSS entry point:

```css
@import "@medyll/css-base";
```

Or in HTML:

```html
<link rel="stylesheet" href="node_modules/@medyll/css-base/dist/app.css">
```

Import specific layers:

```css
@import "@medyll/css-base/theme";
@import "@medyll/css-base/base";
@import "@medyll/css-base/reset";
@import "@medyll/css-base/variables";
@import "@medyll/css-base/tokens";
@import "@medyll/css-base/typography";
@import "@medyll/css-base/palette";
@import "@medyll/css-base/components";
@import "@medyll/css-base/utilities";
@import "@medyll/css-base/attr";
```

## Layer architecture

The library uses `@layer` to enforce a strict cascade order:

```
base
theme.reset
theme.theme
theme.variables
theme.tokens
theme.typography
theme.palette
theme.components
components
```

Styles in later layers win over earlier ones. Your own application styles should sit
outside or above these layers to override without specificity hacks.

## CSS features used

| Feature | Purpose |
|---|---|
| `@layer` | Cascade control |
| CSS Nesting | Component scoping |
| `color-mix()` | Tints, shades, alpha variants |
| `light-dark()` | Automatic dark mode |
| Relative color syntax (`hsl/oklch from`) | Computed hover and muted colors |
| CSS Anchor Positioning | Tooltip and popover placement |
| `text-box-trim` / `text-box-edge` | Precise typographic spacing |
| `subgrid` | Aligned card layouts |
| `text-wrap: balance` | Balanced multiline text |
| `@function` (CSS Values Level 5) | Reusable color transformation functions |

## Token system

Design tokens are defined as CSS custom properties on `:root` inside the theme files.

### Theme variables (customization)

Override these variables in `theme.css` to customize the design system:

```css
:root {
  /* Font properties */
  --default-font-size: 1rem;        /* Base font size (default: 0.875rem) */
  --default-leading: 1.6;           /* Base line height (default: 1.5) */
  --default-font-weight: 400;       /* Base font weight (default: 400) */
  --default-tracking: 0.02em;       /* Base letter spacing (default: 0) */

  /* Text colors (OKLCH format) */
  --default-color-text-light: oklch(0.2 0.02 265);  /* Light mode text */
  --default-color-text-dark: oklch(0.95 0.01 265);  /* Dark mode text */

  /* Surface colors (OKLCH format) */
  --default-color-surface-light: oklch(0.98 0.01 265);  /* Light mode background */
  --default-color-surface-dark: oklch(0.15 0.01 265);   /* Dark mode background */
}
```

### Spacing tokens

**Spacing** — `--gutter-xs` through `--gutter-3xl`, with semantic aliases `--pad-*` and `--marg-*`

**Typography** — font families (`--font-sans`, `--font-mono`, `--font-serif`), size scale `--text-xs` to `--text-2xl`, weights, line heights, letter spacing

**Colors** — `--color-primary`, `--color-surface`, `--color-text`, `--color-border`, status colors (`--color-success`, `--color-warning`, `--color-critical`, `--color-info`), and their computed variants

**Motion** — duration presets (`--duration-fast/normal/slow/slower`), easing functions, transition presets

**Layout** — z-index scale, `--header-height`, `--sidebar-width`, scrollbar dimensions

## Dark mode

Dark mode is handled automatically via `light-dark()` and `color-scheme`. No class toggle required.

**Manual override:** Set `data-theme` attribute on `<html>` or `<body>` to force a specific mode:

```html
<!-- Force light mode -->
<html data-theme="light">

<!-- Force dark mode -->
<html data-theme="dark">

<!-- Auto (default) - follows system preference -->
<html>
```

Your app's JavaScript controls the attribute based on user preference:

```js
// Toggle dark mode
document.documentElement.setAttribute('data-theme', 'dark');

// Toggle light mode
document.documentElement.setAttribute('data-theme', 'light');

// Reset to auto (system preference)
document.documentElement.removeAttribute('data-theme');
```

## Utilities

The utility layer provides single-purpose classes for layout, spacing, typography, color, and hover variants:

- Layout: `flex`, `grid`, `block`, `hidden`, and alignment helpers
- Spacing: margin and padding scale matching the token system
- Typography: size, weight, color, and text-wrap helpers
- Color: background and text color variants via `color-mix()`
- Interactive: `hover:bg-*`, `hover:text-*`, group hover support
- Ring / focus: `ring-*` classes for focus indicators

### Responsive utilities

Use breakpoint prefixes for responsive styles:

| Prefix | Min-width |
|--------|-----------|
| `sm:`  | 640px     |
| `md:`  | 768px     |
| `lg:`  | 1024px    |
| `xl:`  | 1280px    |
| `2xl:` | 1536px    |

Example: `<div class="flex md:grid lg:flex">`

## Components

Pre-styled components available out of the box:

- **Cards**: `.card`, `.card-header`, `.card-body`, `.card-footer`
- **Alerts**: `.alert`, `.alert-info`, `.alert-success`, `.alert-warning`, `.alert-error`
- **Badges**: `.badge`, `.badge-primary`, `.badge-success`, `.badge-warning`, `.badge-error`, `.badge-neutral`
- **Tables**: `.table`, `.table-striped`, `.table-compact` (wrapped in `.table-container`)

## Dynamic Styling with attr() (Chrome 139+)

The `attr.css` layer enables dynamic styling directly via HTML attributes — no classes needed. These **attr-utilities** leverage the CSS `attr()` function for runtime property values.

### attr-utilities reference

| Attribute | Values | Default |
|-----------|--------|---------|
| `data-rotate` | Any number (deg) | `0deg` |
| `data-opacity` | 0–1 (number) | `1` |
| `data-scale` | Any number | `1` |
| `data-columns` | Any integer | `1` |
| `data-rows` | Any integer | `1` |
| `data-subgrid` | (boolean) | — |
| `data-elevation` | `xs`, `sm`, `md`, `lg`, `xl`, `2xl` | `md` |
| `data-inset` | `xs`, `sm`, `md`, `lg`, `xl`, `2xl` | — |
| `data-ratio` | `square`, `portrait`, `landscape`, `video`, `ultrawide`, `golden` | — |
| `data-zindex` | `dropdown`, `overlay`, `modal`, `toast` | — |
| `data-pad` | `xs` to `3xl` | — |
| `data-margin` | `xs` to `3xl` | — |
| `data-radius` | `sm`, `md`, `lg`, `xl`, `full` | — |
| `data-text` | `xs` to `2xl` | — |
| `data-weight` | `normal`, `medium`, `semibold`, `bold` | — |
| `data-color` | `primary`, `secondary`, `success`, `warning`, `error`, `info`, `muted` | — |
| `data-bg` | `surface`, `surface-alt`, `surface-raised`, `primary`, `secondary`, `success`, `warning`, `error`, `info` | — |
| `data-gap` | `xs` to `3xl` | — |
| `data-blur` | `sm`, `md`, `lg`, `xl` | — |
| `data-border` | `none`, `sm`, `md`, `lg` | — |
| `data-translate-x` | Any number (px) | `0px` |
| `data-translate-y` | Any number (px) | `0px` |

### Examples

```html
<!-- Rotation -->
<div data-rotate="45">Rotated 45°</div>

<!-- Opacity -->
<div data-opacity="0.5">50% opaque</div>

<!-- Elevation -->
<div data-elevation="lg">Large elevation</div>

<!-- Inset (sunken) -->
<div data-inset="md">Sunken element</div>

<!-- Scale -->
<div data-scale="1.1">Scaled 110%</div>

<!-- Grid Columns & Rows -->
<div class="grid" data-columns="3" data-rows="2">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
  <div>Item 4</div>
  <div>Item 5</div>
  <div>Item 6</div>
</div>

<!-- Subgrid (nested grids align with parent) -->
<div class="grid" data-columns="3">
  <div class="card" data-subgrid>
    <div>Header</div>
    <div>Content</div>
    <div>Footer</div>
  </div>
</div>

<!-- Aspect Ratio -->
<div data-ratio="video">16:9 video container</div>
<div data-ratio="square">1:1 square</div>
<div data-ratio="golden">Golden ratio</div>

<!-- Combined -->
<div data-rotate="6" data-opacity="0.95" data-elevation="lg" data-scale="1.05">
  Dynamic card
</div>
```

## Accessibility

- `:focus-visible` for keyboard focus indicators
- `prefers-reduced-motion` support
- `prefers-contrast: more` support for high contrast mode

## Dark mode

Dark mode is handled automatically via `light-dark()` and `color-scheme`. No class toggle required.
To force a mode, set `color-scheme` on the root element:

```css
:root { color-scheme: dark; }
```
  
---  
  
**Author:** Lebrun Meddy ([@medyll](https://github.com/medyll)) 
