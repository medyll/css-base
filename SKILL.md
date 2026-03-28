# @medyll/css-base — AI Assistant Skill

## Overview

This skill provides expert assistance for the **@medyll/css-base** design system — a modern CSS library using cutting-edge CSS features (Chrome/Edge 125+, with `@function`/`attr()` support for 139+).

## When to Activate

Activate this skill when the user:
- Asks about CSS architecture, tokens, or theming
- Needs help customizing colors, spacing, or typography
- Wants to understand `light-dark()`, `color-mix()`, or OKLCH colors
- Is building components with this design system
- Needs help with dark mode implementation
- Asks about CSS `@layer`, CSS functions, or `attr()` utilities

## Core Knowledge

### Architecture

```
@layer base, theme.reset, theme.theme, theme.variables, theme.tokens, 
       theme.typography, theme.palette, theme.components, utilities, attr;
```

### File Structure

| File | Purpose |
|------|---------|
| `theme.css` | Default theme values (font, colors) — **customize here** |
| `variables.css` | Spacing scale (`--gutter-*`, `--size-*`) |
| `tokens.css` | Semantic tokens (padding, margin, radius, motion, z-index) |
| `typography.css` | Font families, sizes, weights, line heights |
| `palette.css` | Colors, surfaces, shadows (all derived from primary) |
| `functions.css` | CSS `@function` for color manipulation (Chrome 139+) |
| `components.css` | Base components (buttons, cards, alerts, badges, tables) |
| `utilities.css` | Utility classes (flex, grid, spacing, colors, responsive) |
| `attr.css` | Dynamic styling via `data-*` attributes (Chrome 139+) |

### Theme Customization

Users customize the design system by overriding variables in their own CSS **after** importing the library:

```css
@import "@medyll/css-base";

:root {
  /* Font properties */
  --default-font-size: 1rem;
  --default-leading: 1.6;
  --default-font-weight: 400;
  --default-tracking: 0.02em;

  /* Text colors (OKLCH format) */
  --default-color-text-light: oklch(0.2 0.02 265);
  --default-color-text-dark: oklch(0.95 0.01 265);

  /* Surface colors (OKLCH format) */
  --default-color-surface-light: oklch(0.98 0.01 265);
  --default-color-surface-dark: oklch(0.15 0.01 265);

  /* Primary brand color */
  --color-primary: oklch(0.6 0.2 280); /* Purple instead of blue */
}
```

### Dark Mode

**Automatic** (default):
```html
<html> <!-- Follows system preference -->
```

**Manual override** (via app's JavaScript):
```html
<html data-theme="dark">
<html data-theme="light">
```

```js
// App's JS controls this
document.documentElement.setAttribute('data-theme', 'dark');
```

### Key Features

#### 1. OKLCH Colors
All colors use OKLCH for perceptual uniformity:
```css
--color-primary: oklch(0.546 0.245 262.881); /* Blue */
--color-success: oklch(0.627 0.194 149.214);  /* Green */
--color-warning: oklch(0.705 0.213 79.98);    /* Amber */
--color-critical: oklch(0.637 0.237 25.331);  /* Red */
```

#### 2. Relative Color Syntax
Colors derive from primary automatically:
```css
--color-border: light-dark(
  oklch(from var(--color-primary) 0.85 0.04 265 / 0.35),
  oklch(from var(--color-primary) 0.55 0.15 265 / 0.5)
);
```

#### 3. CSS Functions (Chrome 139+)
```css
--shade(var(--color), 20%)      /* Mix with black */
--tint(var(--color), 30%)       /* Mix with white */
--alpha(var(--color), 0.5)      /* Apply transparency */
--border-from(var(--color))     /* Darken for borders */
--harmony-secondary(var(--color)) /* +30° hue rotation */
```

#### 4. attr() Utilities (Chrome 139+)
Dynamic styling without classes:
```html
<div data-rotate="45" data-opacity="0.8" data-elevation="lg">
<div data-columns="3" data-subgrid data-gap="md">
<div data-text="xl" data-weight="bold" data-color="primary">
```

### Spacing Scale

```
--gutter-xs:  0.25rem  (4px)
--gutter-sm:  0.5rem   (8px)
--gutter-md:  1rem     (16px)
--gutter-lg:  1.5rem   (24px)
--gutter-xl:  2rem     (32px)
--gutter-2xl: 3rem     (48px)
--gutter-3xl: 4rem     (64px)
```

### Responsive Breakpoints

| Prefix | Min-width |
|--------|-----------|
| `sm:`  | 640px     |
| `md:`  | 768px     |
| `lg:`  | 1024px    |
| `xl:`  | 1280px    |
| `2xl:` | 1536px    |

## Common Tasks

### Change Primary Brand Color
```css
:root {
  --color-primary: oklch(0.6 0.2 280); /* Purple */
}
```

### Adjust Base Font Size
```css
:root {
  --default-font-size: 1rem; /* 16px instead of 14px */
}
```

### Customize Spacing Scale
```css
:root {
  --gutter-md: 1.25rem; /* 20px instead of 16px */
}
```

### Force Dark Mode
```html
<html data-theme="dark">
```

### Use attr() for Dynamic Grid
```html
<div class="grid" data-columns="3" data-gap="lg">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>
```

## Best Practices

1. **Always import in order** — Layers are ordered by cascade priority
2. **Override in `:root`** — Custom variables go after the import
3. **Use OKLCH** — All colors should use OKLCH for consistency
4. **Derive, don't duplicate** --color-border* derives from primary automatically
5. **Test both themes** — Check light and dark mode with `data-theme`
6. **Respect browser support** — `@function` and `attr()` need Chrome 139+

## Troubleshooting

### Colors don't change in dark mode
→ Ensure `light-dark()` is used, not static values

### Borders are wrong color
→ Check that `--color-border` derives from `--color-primary`

### attr() not working
→ Requires Chrome 139+ or use utility classes instead

### CSS functions not working
→ Requires Chrome 139+ or use `color-mix()` directly

## Response Guidelines

- **Be specific** — Reference exact files and line numbers
- **Show code** — Always provide working CSS examples
- **Explain why** — Describe the CSS feature being used
- **Consider browser support** — Mention Chrome 125+ vs 139+ requirements
- **Prefer derivation** — Show how to derive colors from primary, not hardcode
