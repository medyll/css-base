# Skinning css-base Demos

`@medyll/css-base` skins work by overriding a small set of root custom properties after `app.css` is loaded. The demos in this repository prove that most visual identity changes come from a compact token set rather than component-specific CSS.

## Minimal skin set

These are the variables that produced the majority of visual differentiation across the 10 demos:

| Variable | Why it matters |
|---|---|
| `--color-primary` | Main accent for buttons, links, badges, highlights |
| `--color-primary-hover` | Keeps interactive states brand-aligned |
| `--color-primary-muted` | Tints cards, pills, and subtle surfaces |
| `--default-color-surface-light` | Base canvas in light mode |
| `--default-color-surface-dark` | Base canvas in dark mode |
| `--default-color-text-light` | Primary text color in light mode |
| `--default-color-text-dark` | Primary text color in dark mode |
| `--radius-sm` | Changes control sharpness |
| `--radius-md` | Changes default component feel |
| `--radius-lg` | Changes large panel/card feel |
| `--radius-xl` | Useful for pill buttons or chat bubbles |
| `--font-family-base` | Fastest route to a new voice |
| `--color-secondary` | Optional second brand hue when one accent is not enough |

## Demo override matrix

| Demo | Primary | Surface seeds | Text seeds | Radius | Font | Secondary |
|---|---|---|---|---|---|---|
| Netflix | yes | yes | yes | yes | no | no |
| Amazon | yes | yes | yes | yes | no | yes |
| WhatsApp | yes | yes | yes | yes | no | no |
| Windows 11 | yes | yes | yes | yes | no | no |
| macOS | yes | yes | yes | yes | no | no |
| Spotify | yes | yes | yes | yes | no | no |
| Slack | yes | yes | yes | yes | no | no |
| GitHub | yes | yes | yes | yes | no | no |
| Dashboard | yes | yes | yes | no | no | no |
| Terminal | yes | yes | yes | yes | yes | no |

## How to make a new skin

1. Copy [skin-template.css](./skin-template.css) into a new demo folder as `skin.css`.
2. Pick whether the brand is light-first or dark-first by choosing the two `--default-color-surface-*` values.
3. Set text seeds with enough contrast for both surface modes.
4. Add one primary color and derive hover/muted states from it.
5. Adjust radius and font only if the brand personality needs it.
6. Load the skin after `../../app.css` in the demo page.

## Guidance from the 10 shipped demos

1. Override the seed tokens, not `--color-surface` or `--color-text` directly. Those are computed in `palette.css`.
2. Dark-first skins can still use `--default-color-surface-light` for a dark value. The variable name describes the `color-scheme` branch, not the brightness.
3. A single primary hue plus surface/text seeds is enough for most brands.
4. Use `--color-secondary` sparingly. Amazon is the only current demo that needs it.
5. Avoid layout token overrides in skins. Spacing changes make skins feel like forks instead of themes.

## Gaps found while extracting the system

1. Semantic naming is slightly inconsistent: library components use `--color-critical`, while it is easy for demo authors to guess `--color-error`. Prefer `--color-critical` today.
2. There is no formal generated skin manifest yet. The comparison table in this document is still hand-maintained.
3. There is still no npm-packaged demo entry point or generated demo index outside the repository tree, so skinning remains a repository-level showcase rather than a published package feature.
