# @medyll/css-base — Complete Token Reference

> Valeurs extraites de `dist/` v0.6.2 — ne pas inventer de tokens.

## Color tokens

```css
/* Brand */
--color-primary:       oklch(0.546 0.245 262.881);  /* #3b82f6 */
--color-primary-hover: oklch(from var(--color-primary) calc(l - 0.08) c h);
--color-primary-muted: oklch(from var(--color-primary) calc(l + 0.28) c h);

/* Harmony (relative color syntax — Chrome 125+) */
--color-secondary:     oklch(from var(--color-primary) l c calc(h + 30));
--color-complementary: oklch(from var(--color-primary) l c calc(h + 180));

/* Status */
--color-success:  oklch(0.627 0.194 149.214);  /* #10b981 */
--color-warning:  oklch(0.705 0.213 79.98);    /* #f59e0b */
--color-critical: oklch(0.637 0.237 25.331);   /* #ef4444 */
--color-info:     var(--color-primary);
/* ⚠️ Pas de --color-error — utiliser --color-critical */

/* Surfaces (auto dark mode via light-dark()) */
--color-surface:         light-dark(oklch(1 0 0), oklch(0.1 0 0));
--color-surface-alt:     light-dark(color-mix(in srgb, white, black 3%), color-mix(in srgb, oklch(0.1 0 0), white 5%));
--color-surface-raised:  var(--color-surface);
--color-surface-overlay: light-dark(oklch(1 0 0 / 0.85), oklch(0.1 0 0 / 0.85));
--color-surface-sunken:  light-dark(color-mix(in srgb, white, black 7%), color-mix(in srgb, oklch(0.1 0 0), black 25%));
--color-surface-hover:   light-dark(color-mix(in srgb, white, black 6%), color-mix(in srgb, oklch(0.1 0 0), white 40%));
--color-surface-active:  light-dark(color-mix(in srgb, var(--color-primary) 8%, white), color-mix(in srgb, var(--color-primary) 15%, oklch(0.1 0 0)));

/* Text */
--color-text:       light-dark(oklch(0.141 0.005 285.823), oklch(0.962 0.003 264.542));
--color-text-muted: light-dark(oklch(0.551 0.045 264.364), oklch(0.696 0.044 265.755));

/* Border */
--color-border:        light-dark(oklch(0.85 0.04 265 / 0.35), oklch(0.55 0.15 265 / 0.5));
--color-border-strong: light-dark(oklch(0.75 0.06 265 / 0.6), oklch(0.45 0.18 265 / 0.7));
/* focus  → var(--color-primary)  directement */
/* erreur → var(--color-critical) directement */

/* Pattern standard pour éléments interactifs */
/*
border: var(--border-width) solid var(--color-border);
&:hover   { border-color: var(--color-border-strong); }
&:focus   { border-color: var(--color-primary); }
&:invalid { border-color: var(--color-critical); }
*/
```

### Seeds de thème (seuls tokens à surcharger pour re-themer)

```css
:root {
  --color-primary:                oklch(0.6 0.2 280);
  --default-font-size:            0.875rem;   /* 14px base */
  --default-leading:              1.5;
  --default-color-text-light:     oklch(0.141 0.005 285.823);
  --default-color-text-dark:      oklch(0.962 0.003 264.542);
  --default-color-surface-light:  oklch(1 0 0);
  --default-color-surface-dark:   oklch(0.1 0 0);
}
```

---

## Shadows

```css
--shadow-color: light-dark(
  oklch(from var(--color-text) 0.25 0.01 h),
  oklch(from var(--color-text) 0.15 0 h)
);

--shadow-xs:  0 1px 2px  color-mix(in oklch, var(--shadow-color), transparent 95%);
--shadow-sm:  0 2px 4px  color-mix(in oklch, var(--shadow-color), transparent 92%);
--shadow-md:  0 4px 8px  color-mix(in oklch, var(--shadow-color), transparent 88%);
--shadow-lg:  0 8px 24px color-mix(in oklch, var(--shadow-color), transparent 84%);
--shadow-xl:  0 12px 32px color-mix(in oklch, var(--shadow-color), transparent 80%);
--shadow-2xl: 0 16px 48px color-mix(in oklch, var(--shadow-color), transparent 75%);
```

---

## Typography tokens

```css
/* Familles */
--font-sans:  ui-sans-serif, system-ui, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji';
--font-mono:  ui-monospace, 'Cascadia Code', 'Source Code Pro', Menlo, Consolas, monospace;
--font-serif: ui-serif, Georgia, Cambria, 'Times New Roman', Times, serif;

/* Tailles (base = --default-font-size = 0.875rem = 14px) */
--text-xs:   calc(var(--default-font-size) * 0.786);  /* 11px */
--text-sm:   calc(var(--default-font-size) * 0.929);  /* 13px */
--text-base: var(--default-font-size);                /* 14px — attention : pas 16px ! */
--text-md:   calc(var(--default-font-size) * 1.143);  /* 16px */
--text-lg:   calc(var(--default-font-size) * 1.286);  /* 18px */
--text-xl:   calc(var(--default-font-size) * 1.429);  /* 20px */
--text-2xl:  calc(var(--default-font-size) * 1.714);  /* 24px */
--text-3xl:  calc(var(--default-font-size) * 2.286);  /* 32px — hero headings */
--text-4xl:  calc(var(--default-font-size) * 2.857);  /* 40px — display headings */
--text-5xl:  calc(var(--default-font-size) * 3.429);  /* 48px — display/hero */

/* Graisse */
--font-normal:   400;
--font-medium:   500;
--font-semibold: 600;
--font-bold:     700;
--font-black:    900;  /* hero/display */

/* Hauteur de ligne */
--leading-none:    1;      /* boutons, chips */
--leading-tight:   1.25;   /* headings */
--leading-snug:    1.375;  /* sous-titres */
--leading-normal:  1.5;    /* body default */
--leading-relaxed: 1.625;  /* paragraphes lisibles */
--leading-loose:   2;

/* Espacement des lettres */
--tracking-tight:  -0.01em;
--tracking-normal: 0;
--tracking-wide:   0.03em;
--tracking-wider:  0.05em;
--tracking-caps:   0.08em;
```

---

## Spacing tokens

```css
/* Gutters — grille 4px */
--gutter-xs:  0.25rem;  /* 4px  */
--gutter-sm:  0.5rem;   /* 8px  */
--gutter-md:  1rem;     /* 16px */
--gutter-lg:  1.5rem;   /* 24px */
--gutter-xl:  2rem;     /* 32px */
--gutter-2xl: 3rem;     /* 48px */
--gutter-3xl: 4rem;     /* 64px */

/* Aliases padding */
--pad-xs: var(--gutter-xs);   --pad-sm: var(--gutter-sm);   --pad-md: var(--gutter-md);
--pad-lg: var(--gutter-lg);   --pad-xl: var(--gutter-xl);   --pad-2xl: var(--gutter-2xl);
--pad-3xl: var(--gutter-3xl);

/* Aliases margin */
--marg-xs: var(--gutter-xs);  --marg-sm: var(--gutter-sm);  --marg-md: var(--gutter-md);
--marg-lg: var(--gutter-lg);  --marg-xl: var(--gutter-xl);  --marg-2xl: var(--gutter-2xl);
--marg-3xl: var(--gutter-3xl);

/* Aliases gap */
--gap-xs: var(--gutter-xs);   --gap-sm: var(--gutter-sm);   --gap-md: var(--gutter-md);
--gap-lg: var(--gutter-lg);   --gap-xl: var(--gutter-xl);   --gap-2xl: var(--gutter-2xl);
--gap-3xl: var(--gutter-3xl);
```

---

## Border radius

```css
/* ⚠️ Valeurs larges — dérivées de --size-* (16px base), pas de Tailwind */
--radius-xs:   0.25rem;  /* 4px  */
--radius-sm:   0.5rem;   /* 8px  */
--radius-md:   1rem;     /* 16px — default panels, cards */
--radius-lg:   1.5rem;   /* 24px — medium panels */
--radius-xl:   2rem;     /* 32px — large panels */
--radius-full: 9999px;   /* cercle / pill */
```

⚠️ Pas de `--radius-none` ni `--radius-2xl`.

---

## Icon sizes

```css
--icon-size-xs: 0.5rem;   /* 8px  */
--icon-size-sm: 1.25rem;  /* 20px */
--icon-size-md: 2rem;     /* 32px */
--icon-size-lg: 3rem;     /* 48px */
```

---

## Layout tokens

```css
--border-width:      1px;
--focus-ring-width:  0.125rem;   /* 2px */
--focus-ring-gap:    0.1875rem;  /* 3px */
--scrollbar-width:   6px;
--scrollbar-height:  6px;
```

---

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
--ease-in:        cubic-bezier(0.4, 0, 1, 1);
--ease-out:       cubic-bezier(0, 0, 0.2, 1);
--ease-in-out:    cubic-bezier(0.4, 0, 0.2, 1);
--ease-bounce:    cubic-bezier(0.16, 1, 0.3, 1);
--easing-default: cubic-bezier(0.4, 0, 0.2, 1);  /* alias ease-in-out */

/* Presets combinés */
--transition-fast:   var(--duration-fast)   var(--ease-out);
--transition-normal: var(--duration-normal) var(--ease-in-out);
--transition-slow:   var(--duration-slow)   var(--ease-in-out);
```

---

## Z-index

```css
--z-dropdown: 100;
--z-overlay:  200;
--z-modal:    500;
--z-toast:    600;
```

⚠️ Pas de `--z-base` / `--z-raised` / `--z-sticky`.

---

## CSS @function (Chrome 139+)

Toutes wrappées dans `@supports` — ignorées silencieusement sous 139.

```css
/* Manipulation couleur */
--shade(color, amount%)    /* mix with black — assombrir */
--tint(color, amount%)     /* mix with white — éclaircir */
--alpha(color, opacity)    /* transparence */
--surface-tint(color)      /* 12% color overlay */
--border-from(color)       /* auto-darken pour border */
--border-alpha(color, op)  /* border semi-transparent */
--hover-state(color)       /* -10% lightness pour hover */

/* Harmonies couleur (OKLCH hue rotation) */
--harmony-secondary(color)        /* +30° */
--harmony-secondary-soft(color)   /* +30° soft */
--harmony-complementary(color)    /* +180° */
--harmony-analogous-plus(color)   /* +30° */
--harmony-analogous-minus(color)  /* -30° */
--harmony-split-1(color)          /* +150° */
--harmony-split-2(color)          /* +210° */
--harmony-triad-1(color)          /* +120° */
--harmony-triad-2(color)          /* +240° */
--harmony-square-1(color)         /* +90° */
--harmony-square-2(color)         /* +180° */
--harmony-square-3(color)         /* +270° */
--harmony-tetradic-2(color)       /* +60° */
```

**Fallback Chrome 125–138 :** utiliser `color-mix(in oklch, ...)` ou relative color syntax directement.

---

## attr() utilities (Chrome 139+)

| Attribute | Type | Valeurs |
|---|---|---|
| `data-rotate` | number (deg) | any |
| `data-opacity` | number | 0–1 |
| `data-scale` | number | any |
| `data-columns` | integer | any |
| `data-rows` | integer | any |
| `data-subgrid` | boolean | présent/absent |
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
| `data-duration` | keyword | fast, normal, slow, slower |
