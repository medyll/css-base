# css-base

A modern CSS design system library targeting the latest Chrome and Edge browsers.
Built exclusively with cutting-edge CSS features — no preprocessor, no build step required.

## Browser support

- Chrome 125+
- Edge 125+

## File structure

```
dist/
  app.css          Entry point — import this file only
  base.css         HTML resets and font defaults
  theme.css        Design tokens, typography, palette, base components
  workspace.css    Application shell layout and UI components
  utilities.css    Utility classes for layout, spacing, color, and hover variants
  metadata.json    Machine-readable index for IDE tooling
```

## Usage

```html
<link rel="stylesheet" href="dist/app.css">
```

Or import in CSS:

```css
@import "dist/app.css";
```

## Layer architecture

The library uses `@layer` to enforce a strict cascade order:

```
base
theme.reset
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

Design tokens are defined as CSS custom properties on `:root` inside `theme.css`.

**Spacing** — `--gutter-xs` through `--gutter-3xl`, with semantic aliases `--pad-*` and `--marg-*`

**Typography** — font families (`--font-sans`, `--font-mono`, `--font-serif`), size scale `--text-xs` to `--text-2xl`, weights, line heights, letter spacing

**Colors** — `--color-primary`, `--color-surface`, `--color-text`, `--color-border`, status colors (`--color-success`, `--color-warning`, `--color-critical`, `--color-info`), and their computed variants

**Motion** — duration presets (`--duration-fast/normal/slow/slower`), easing functions, transition presets

**Layout** — z-index scale, `--header-height`, `--sidebar-width`, scrollbar dimensions

## Dark mode

Dark mode is handled automatically via `light-dark()` and `color-scheme`. No class toggle required.
To force a mode, set `color-scheme` on the root element:

```css
:root { color-scheme: dark; }
```

## Utilities

The utility layer provides single-purpose classes for common needs:

- Layout: `flex`, `grid`, `block`, `hidden`, and alignment helpers
- Spacing: margin and padding scale matching the token system
- Typography: size, weight, color, and text-wrap helpers
- Color: background and text color variants via `color-mix()`
- Interactive: `hover:bg-*`, `hover:text-*`, group hover support
- Ring / focus: `ring-*` classes for focus indicators
