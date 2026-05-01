# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

`@medyll/css-base` — pure CSS design system. No build step. All output files in `/dist/` are hand-authored CSS.

Package manager: **pnpm**. No build, test, or lint commands configured.

## Release

Releases automated via GitHub Actions (`.github/workflows/publish.yml`): push to `main` → auto-bump patch → publish via `@medyll/idae-pnpm-release`.

## Layer Architecture

`app.css` declares layer order — **sequence is load-bearing**:

```
reset < tokens < theme < components < utilities
```

Later layers win. Application styles placed outside/after all layers override everything without specificity hacks.

To extend: declare your own layer after importing `app.css`, e.g. `@layer my-overrides { }`.

## Module Map

All in `/dist/`, exported via `package.json` `exports`:

| Module | Layer | Notes |
|--------|-------|-------|
| `app.css` | — | Entry point, imports all in order |
| `base.css` | `reset` | HTML element defaults |
| `reset.css` | `reset` | Browser reset |
| `theme.css` | `theme` | `color-scheme`, `light-dark()` defaults |
| `variables.css` | `tokens` | `--gutter-*`, `--size-*` scale (4px grid) |
| `tokens.css` | `tokens` | `--pad-*`, `--marg-*`, `--gap-*`, `--radius-*`, motion, z-index |
| `typography.css` | `tokens` | Font families, `--text-*` scale, weights, line heights |
| `palette.css` | `theme` | OKLCH colors, `color-mix()` surfaces/shadows |
| `functions.css` | — | CSS `@function` inside `@supports` — **Chrome 139+ only** |
| `components.css` | `components` | Cards, alerts, badges, tables |
| `utilities.css` | `utilities` | Layout, spacing, color, responsive prefixes |
| `attr.css` | `utilities` | `attr()` data-attribute utilities — **Chrome 139+ only** |

## Key CSS Techniques

- **`@layer`** for cascade precedence — never use specificity hacks
- **`color-mix()`** for palette generation and alpha variants
- **`light-dark()`** for automatic dark mode — no class toggle needed
- **CSS nesting** (`&` selectors inside rules)
- **`attr()`** for declarative attribute-driven utilities
- **CSS custom properties** for all tokens — override at `:root` or component scope
- **OKLCH** color format throughout palette

Browser floor: Chrome 125+ / Edge 125+. `functions.css` and `attr.css` require Chrome/Edge 139+. See `/dist/metadata.json` for per-feature matrix.

## Token Hierarchy

```
--gutter-* / --size-* (variables.css)   ← raw scale
       ↓
--pad-*, --marg-*, --gap-*, --radius-*  ← semantic aliases (tokens.css)
       ↓
--color-*, --font-*, --duration-*       ← theme tokens (palette/typography/theme)
```

Override at `:root` or any scope — no source changes needed.

## Dark Mode

Automatic via `light-dark()` + `color-scheme`. Force with `data-theme` attribute:

```html
<html data-theme="dark">   <!-- force dark -->
<html data-theme="light">  <!-- force light -->
<html>                     <!-- auto (system) -->
```

## Components

Classes in `components.css`: `.card` / `.card-header` / `.card-body` / `.card-footer`, `.alert` / `.alert-{info|success|warning|error}`, `.badge` / `.badge-{primary|success|warning|error|neutral}`, `.table` / `.table-striped` / `.table-compact` (wrap in `.table-container`).

## Utilities

Responsive prefixes: `sm:` (640px), `md:` (768px), `lg:` (1024px), `xl:` (1280px), `2xl:` (1536px).

Example: `<div class="flex md:grid lg:flex">`

## attr() Utilities (Chrome 139+)

Data attributes for dynamic styling without classes — defined in `attr.css`. Key attributes: `data-pad`, `data-margin`, `data-gap`, `data-radius`, `data-color`, `data-bg`, `data-text`, `data-weight`, `data-elevation`, `data-columns`, `data-rows`, `data-ratio`, `data-rotate`, `data-scale`, `data-opacity`, `data-blur`, `data-border`, `data-zindex`.

## Skinning / Theming

Re-theming = token overrides only, no structural CSS changes. 10 reference skins in `/dist/demo/` and `/dist/demo-refactored/` (Netflix, Amazon, macOS, Windows 11, Spotify, Slack, GitHub, WhatsApp, Dashboard, Terminal).

- `/dist/demo/SKINNING.md` — skinning guide and token override patterns
- `/dist/demo/skin-template.css` — starter template

## Reference Files

- `/dist/metadata.json` — machine-readable index: all CSS files, layers, browser compat
- `/dist/skill/css-base/SKILL.md` — Claude AI skill doc (use `css-base` skill for authoring)
- `/bmad/artifacts/` — architecture doc, PRD, QA notes, sprint history
