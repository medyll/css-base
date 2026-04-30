# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

`@medyll/css-base` v0.6.0 — pure CSS design system. No build step. All output files in `/dist/` are hand-authored CSS.

Package manager: **pnpm**. No build, test, or lint commands configured.

## Release

Releases are automated via GitHub Actions (`.github/workflows/publish.yml`): push to `main` → auto-bump patch → publish via `@medyll/idae-pnpm-release`.

## Architecture

12 CSS modules exported via `package.json` `exports` field, all in `/dist/`:

| Module | Purpose |
|--------|---------|
| `app.css` | Entry point — imports all layers in order |
| `reset.css` | Browser reset |
| `base.css` | Base element styles |
| `variables.css` | CSS custom property definitions |
| `tokens.css` | Semantic design tokens |
| `palette.css` | Color palette via `color-mix()` |
| `theme.css` | Theme layer (light/dark) |
| `typography.css` | Font scales and text styles |
| `functions.css` | CSS utility functions |
| `components.css` | Component-level styles |
| `utilities.css` | Utility classes |
| `attr.css` | `attr()` CSS function utilities |

All modules use **CSS `@layer`** for cascade control. Layer order matters — `app.css` defines it.

## Key CSS Techniques

- **`@layer`** for cascade precedence (not specificity-based overrides)
- **`color-mix()`** for palette generation and alpha variants
- **CSS nesting** (`&` selectors inside rules)
- **`attr()`** for declarative utilities
- **CSS custom properties** for all tokens — override at `:root` or component scope

Browser support floor: Chrome 125+ / Edge 125+. Some features require 139+. See `/dist/metadata.json` for per-feature compatibility matrix.

## Skinning / Theming

Re-theming works by **token overrides only** — no structural CSS changes needed. 10 reference skins in `/dist/demo/` (Netflix, macOS, Windows 11, Spotify, etc.) demonstrate this pattern.

- `/dist/demo/SKINNING.md` — skinning guide and token override patterns
- `/dist/demo/skin-template.css` — starter template for new skins

## Reference Files

- `/dist/metadata.json` — machine-readable index: all CSS files, layers, browser compat
- `/dist/skill/css-base/SKILL.md` — Claude AI skill doc for this library (use css-base skill for authoring)
- `/bmad/artifacts/` — architecture doc, PRD, QA notes
