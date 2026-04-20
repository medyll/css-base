# @medyll/css-base — Complete Token Reference

> Valeurs extraites de `dist/` v0.1.22 — ne pas inventer de tokens.

## Color tokens

```css
/* Brand */
--color-primary:       #3b82f6;
--color-primary-hover: hsl(from var(--color-primary) h s calc(l - 8%));
--color-primary-muted: hsl(from var(--color-primary) h s calc(l + 28%));

/* Harmony (calculés depuis --color-primary via @function CSS) */
--color-secondary:      --harmony-secondary(var(--color-primary));
--color-complementary:  --harmony-complementary(var(--color-primary));

/* Status */
--color-success:  #10b981;
--color-warning:  #f59e0b;
--color-critical: #ef4444;
--color-info:     #3b82f6;

/* Surfaces (auto dark mode via light-dark()) */
--color-surface:         light-dark(#ffffff, #1a1a1a);                       /* fond de page, base */
--color-surface-alt:     light-dark(#f5f5f5, #252525);                       /* sidebar, panels, zones distinctes */
--color-surface-raised:  light-dark(#ffffff, #2e2e2e);                       /* cards, modals, éléments élevés */
--color-surface-overlay: light-dark(rgba(255,255,255,0.85), rgba(30,30,30,0.85)); /* drawers, popovers + backdrop-filter */
--color-surface-sunken:  light-dark(#ebebeb, #141414);                       /* inputs, zones en creux */
--color-surface-hover:   light-dark(#f0f0f0, #2a2a2a);                      /* hover sur items de liste */
--color-surface-active:  light-dark(#e6effd, #1e2d47);                      /* item sélectionné/actif (teinte primary) */

/* Text */
--color-text:       light-dark(#0f172a, #f1f5f9);
--color-text-muted: light-dark(#64748b, #94a3b8);

/* Border */
--color-border:        light-dark(#e2e8f0, #404040);  /* bordure par défaut */
--color-border-strong: light-dark(#cbd5e1, #555555);  /* hover sur inputs/cards */
/* focus  → var(--color-primary)   directement */
/* erreur → var(--color-critical)  directement */

/* Pattern standard pour éléments interactifs */
/*
border: var(--border-width) solid var(--color-border);
&:hover   { border-color: var(--color-border-strong); }
&:focus   { border-color: var(--color-primary); }
&:invalid { border-color: var(--color-critical); }
*/
```

## Shadows

```css
--shadow-color: light-dark(220 13% 10%, 0 0% 0%);  /* token intermédiaire */
--shadow-xs:    0 1px 2px  hsl(var(--shadow-color) / 0.06);
--shadow-sm:    0 2px 4px  hsl(var(--shadow-color) / 0.08);
--shadow-md:    0 4px 8px  hsl(var(--shadow-color) / 0.12);
--shadow-lg:    0 8px 24px hsl(var(--shadow-color) / 0.16);
--shadow-xl:    0 16px 48px hsl(var(--shadow-color) / 0.20);
--shadow-2xl:   0 24px 64px hsl(var(--shadow-color) / 0.24);
```

## Typography tokens

```css
/* Familles */
--font-sans:  ui-sans-serif, system-ui, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji';
--font-mono:  ui-monospace, 'Cascadia Code', 'Source Code Pro', Menlo, Consolas, monospace;
--font-serif: ui-serif, Georgia, Cambria, 'Times New Roman', Times, serif;

/* Tailles */
--text-xs:   0.6875rem;  /* 11px */
--text-sm:   0.8125rem;  /* 13px */
--text-base: 0.875rem;   /* 14px — attention : pas 16px ! */
--text-md:   1rem;       /* 16px */
--text-lg:   1.125rem;   /* 18px */
--text-xl:   1.25rem;    /* 20px */
--text-2xl:  1.5rem;     /* 24px */

/* Graisse */
--font-normal:   400;
--font-medium:   500;
--font-semibold: 600;
--font-bold:     700;

/* Hauteur de ligne */
--leading-none:    1;
--leading-tight:   1.25;
--leading-snug:    1.375;
--leading-normal:  1.5;
--leading-relaxed: 1.625;
--leading-loose:   2;

/* Espacement des lettres */
--tracking-tight:  -0.01em;
--tracking-normal: 0;
--tracking-wide:   0.03em;
--tracking-wider:  0.05em;
--tracking-caps:   0.08em;
```

## Spacing tokens

```css
/* Gutters */
--gutter-xs:  0.25rem;  /* 4px  */
--gutter-sm:  0.5rem;   /* 8px  */
--gutter-md:  1rem;     /* 16px */
--gutter-lg:  1.5rem;   /* 24px */
--gutter-xl:  2rem;     /* 32px */
--gutter-2xl: 3rem;     /* 48px */
--gutter-3xl: 4rem;     /* 64px */

/* Aliases padding */
--pad-xs: var(--gutter-xs);  --pad-sm: var(--gutter-sm);  --pad-md: var(--gutter-md);
--pad-lg: var(--gutter-lg);  --pad-xl: var(--gutter-xl);  --pad-2xl: var(--gutter-2xl);
--pad-3xl: var(--gutter-3xl);

/* Aliases margin */
--marg-xs: var(--gutter-xs);  --marg-sm: var(--gutter-sm);  --marg-md: var(--gutter-md);
--marg-lg: var(--gutter-lg);  --marg-xl: var(--gutter-xl);  --marg-2xl: var(--gutter-2xl);
--marg-3xl: var(--gutter-3xl);
```

## Icon sizes

```css
--icon-size-xs: 0.5rem;   /* 8px  */
--icon-size-sm: 1.25rem;  /* 20px */
--icon-size-md: 2rem;     /* 32px */
--icon-size-lg: 3rem;     /* 48px */
```

## Border radius

```css
--radius-sm:   0.25rem;   /* 4px  — alias gutter-xs */
--radius-md:   0.375rem;  /* 6px  */
--radius-lg:   0.5rem;    /* 8px  — alias gutter-sm */
--radius-xl:   0.75rem;   /* 12px */
--radius-full: 9999px;
```
⚠️ Pas de `--radius-none` ni `--radius-2xl`.

## Layout tokens

```css
--header-height:        3.5rem;     /* 56px */
--sidebar-width:        15.625rem;  /* 250px */
--sidebar-width-tablet: 12.5rem;    /* 200px */
--border-width:         1px;
--focus-ring-width:     0.125rem;   /* 2px */
--focus-ring-gap:       0.1875rem;  /* 3px */
--scrollbar-width:      6px;
--scrollbar-height:     6px;
```

## Transition

```css
/* Durées */
--duration-fast:    100ms;
--duration-normal:  150ms;
--duration-slow:    200ms;
--duration-slower:  300ms;
--duration-shimmer: 1.5s;   /* skeleton loaders */
--duration-spin:    1s;     /* spinners */

/* Easing */
--ease-in:       cubic-bezier(0.4, 0, 1, 1);
--ease-out:      cubic-bezier(0, 0, 0.2, 1);
--ease-in-out:   cubic-bezier(0.4, 0, 0.2, 1);
--ease-bounce:   cubic-bezier(0.16, 1, 0.3, 1);
--easing-default: cubic-bezier(0.4, 0, 0.2, 1);  /* alias ease-in-out */

/* Presets combinés */
--transition-fast:   var(--duration-fast)   var(--ease-out);
--transition-normal: var(--duration-normal) var(--ease-in-out);
--transition-slow:   var(--duration-slow)   var(--ease-in-out);
```

## Z-index

```css
--z-dropdown: 100;
--z-overlay:  200;
--z-modal:    500;
--z-toast:    600;
```
⚠️ Pas de `--z-base` / `--z-raised` / `--z-sticky`.

## CSS @function (Chrome 139+)

```css
/* Color manipulation */
--shade(color, amount%)           /* mix with black */
--tint(color, amount%)            /* mix with white */
--alpha(color, opacity)           /* set transparency */
--surface-tint(surface, tint, %) /* tint a surface color */

/* Borders */
--border-from(color)              /* auto-darken for border */
--border-alpha(color, opacity)    /* semi-transparent border */

/* Interactive */
--hover-state(color)              /* darken for hover */

/* Color harmonies (OKLCH hue rotation) */
--harmony-secondary(color)        /* +30° */
--harmony-complementary(color)    /* +180° */
--harmony-split(color)            /* ±150° */
--harmony-triadic(color)          /* +120° */
--harmony-square(color)           /* +90° */
--harmony-tetradic(color)         /* +60° */
```

## attr() utilities (Chrome 139+)

| Attribute | Type | Values |
|---|---|---|
| `data-rotate` | number (deg) | any |
| `data-opacity` | number | 0–1 |
| `data-scale` | number | any |
| `data-columns` | integer | any |
| `data-rows` | integer | any |
| `data-subgrid` | boolean | (present/absent) |
| `data-elevation` | keyword | xs, sm, md, lg, xl, 2xl |
| `data-inset` | keyword | xs, sm, md, lg, xl, 2xl |
| `data-ratio` | keyword | square, portrait, landscape, video, ultrawide, golden |
| `data-zindex` | keyword | dropdown, overlay, modal, toast |
| `data-pad` | keyword | xs – 3xl |
| `data-margin` | keyword | xs – 3xl |
| `data-gap` | keyword | xs – 3xl |
| `data-radius` | keyword | sm, md, lg, xl, full |
| `data-text` | keyword | xs – 2xl |
| `data-weight` | keyword | normal, medium, semibold, bold |
| `data-color` | keyword | primary, secondary, success, warning, error, info, muted |
| `data-bg` | keyword | surface, surface-alt, surface-raised, primary, secondary, success, warning, error, info |
| `data-blur` | keyword | sm, md, lg, xl |
| `data-border` | keyword | none, sm, md, lg |
| `data-translate-x` | number (px) | any |
| `data-translate-y` | number (px) | any |
