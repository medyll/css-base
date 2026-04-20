# css-base Skin System

A skin is a single CSS file that overrides a small set of design tokens to transform the entire visual identity of an app — without touching HTML or component structure.

## How it works

`@medyll/css-base` computes all colors via `light-dark()` from two seed tokens defined in `theme.css`:

```css
--default-color-surface-light   /* surface in light mode */
--default-color-surface-dark    /* surface in dark mode */
--default-color-text-light      /* text in light mode */
--default-color-text-dark       /* text in dark mode */
```

A skin overrides these seeds. The entire color cascade — `--color-surface`, `--color-surface-alt`, `--color-border`, `--color-text`, etc. — updates automatically.

## Minimal skin template

```css
/* my-skin.css */

/* 1. Connect data-theme toggle → native color-scheme */
[data-theme="dark"]  { color-scheme: dark; }
[data-theme="light"] { color-scheme: light; }

:root {
  /* 2. Brand primary color */
  --color-primary:       oklch(L C H);
  --color-primary-hover: oklch(from var(--color-primary) calc(l - 0.08) c h);
  --color-primary-muted: oklch(from var(--color-primary) calc(l + 0.28) c h);

  /* 3. Surface seeds (light-dark() reads these) */
  --default-color-surface-light: oklch(L 0 0);
  --default-color-surface-dark:  oklch(L 0 0);

  /* 4. Text seeds */
  --default-color-text-light: oklch(L 0 0);
  --default-color-text-dark:  oklch(L 0 0);

  /* 5. Optional: radius, font overrides */
  --radius-md: 6px;
}
```

That's it. Load it after `app.css`:

```html
<link rel="stylesheet" href="../../app.css">
<link rel="stylesheet" href="./skin.css">
```

## The 10 included skins

| Skin       | Default mode | Primary               | Surface seed (light mode)      |
|------------|:---:|----------------------|-------------------------------|
| Netflix    | dark  | `oklch(0.52 0.24 27)` red     | `oklch(0.14 0 0)` near-black  |
| Amazon     | light | `oklch(0.72 0.18 65)` orange  | `oklch(1 0 0)` white          |
| WhatsApp   | light | `oklch(0.52 0.18 148)` green  | `oklch(0.97 0.01 148)` tinted |
| Windows 11 | light | `oklch(0.55 0.20 250)` blue   | `oklch(0.98 0 0)` near-white  |
| macOS      | light | `oklch(0.58 0.20 255)` blue   | `oklch(0.97 0 0)` Apple gray  |
| Spotify    | dark  | `oklch(0.72 0.22 148)` green  | `oklch(0.07 0 0)` #121212     |
| Slack      | dark  | `oklch(0.52 0.18 285)` purple | `oklch(0.17 0.02 285)` navy   |
| GitHub     | dark  | `oklch(0.58 0.15 255)` blue   | `oklch(0.13 0 0)` #0D1117     |
| Dashboard  | dark  | `oklch(0.62 0.20 255)` blue   | `oklch(0.11 0.01 255)` navy   |
| Terminal   | dark  | `oklch(0.72 0.22 148)` green  | `oklch(0.06 0 0)` black       |

## Design rules

1. **One primary color only.** Don't override `--color-secondary` unless the brand genuinely uses two distinct brand hues.
2. **Surface seeds, not surface tokens.** Override `--default-color-surface-*` not `--color-surface` — the latter is computed and your override will be silently overridden by `light-dark()`.
3. **Radius reflects brand personality.** Sharp (1–3px) = Netflix, Terminal. Medium (4–8px) = Amazon, GitHub. Soft (12–18px) = Apple, WhatsApp.
4. **Dark-first vs light-first.** For dark-first skins, set `--default-color-surface-light` to a dark value. The `light` in the variable name is the fallback for `color-scheme: light`, not a hint about the color itself.
5. **Don't override spacing.** Gutters, padding, and margin tokens are layout concerns — skins are visual identity only.

## Adding a new skin

1. Create `dist/demo/<name>/`
2. Copy `skin-template.css` (this file's template section) → `dist/demo/<name>/skin.css`
3. Create `dist/demo/<name>/index.html` using the shared nav pattern
4. Add a card to `dist/demo/index.html`
5. (Optional) Add a story to `bmad/artifacts/stories/`
