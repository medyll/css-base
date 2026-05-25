# Changelog

## [0.7.6] - 2026-05-25
**Chores:**
- release v0.7.5 [skip ci]

**Other:**
- Merge branch 'main' of https://github.com/medyll/css-base



## [0.7.4] - 2026-05-19
**Chores:**
- release v0.7.3 [skip ci]

**Other:**
- Merge branch 'main' of https://github.com/medyll/css-base



## [0.7.2] - 2026-05-19
**Chores:**
- release v0.7.1 [skip ci]

**Other:**
- Merge branch 'main' of https://github.com/medyll/css-base



## [0.7.0] - 2026-05-19
**Features:**
- New components: `.list` / `.list-item` (variants: `-stack`, `-row`, `-grid`, `-bordered`, `-compact`; item parts: `-icon`, `-content`, `-title`, `-meta`, `-trail`; states: `.is-active`, `aria-current`, `.is-disabled`)
- New components: `.form` / `.field` / `.field-stack` (grid label/control, `-stack`, `-inline` variants)
- New components: `.toolbar` (`-stretch`, `-end`, `-center`, `-wrap`), `.toolbar-separator`, `.toolbar-spacer`
- New components: `.panel` (`-raised`, `-sunken`, `-bordered`, `-flush`)
- New components: `.section-header` (`-lg`, `-bordered`)
- New components: `.empty-state` (with `.empty-state-icon` / `-title` / `-text`)
- New components: `.pagination` (with `.pagination-info`)
- New button variants: `.btn-sm`, `.btn-icon` (sized via `--icon-button-size*`)
- Reset: `[role="list"]` resets list-style/padding/margin (semantic-aware)
- Tokens: `--list-gap`, `--list-item-pad-x/y`, `--list-item-radius`, `--list-item-gap`, `--icon-button-size{,-sm,-lg}`, `--field-gap`, `--field-label-width`, `--form-grid-gap`

**Breaking:**
- Removed Tailwind-style named-color utilities: `.bg-purple-*`, `.text-purple-*`, `.bg-orange-*`, `.text-orange-*`, `.bg-green-100`, `.text-green-700`, `.bg-gray-50/100/200`, `.text-gray-300/400/500/600`, `.bg-blue-*`, `.text-blue-*`, `.text-red-*`, `.bg-red-*`, `.bg-slate-100`, `.bg-white`, `.text-white`, named-color `.hover\:*`
- Replaced with semantic equivalents: `.bg-surface*`, `.bg-primary{,-soft}`, `.bg-success-soft`, `.bg-warning-soft`, `.bg-critical-soft`, `.text-muted`, `.text-primary`, `.text-success`, `.text-warning`, `.text-critical`, `.text-on-primary`, `.text-inverse`

**Migration:**
- `.bg-purple-100` → use status soft (`.bg-primary-soft`) or define brand token
- `.text-blue-600` → `.text-primary`
- `.text-red-600` → `.text-critical`
- `.bg-gray-50` → `.bg-surface-alt`
- `.hover\:bg-gray-100` → `.hover\:bg-surface-hover`

## [0.6.10] - 2026-05-01
**Chores:**
- release v0.6.9 [skip ci]

**Other:**
- Merge branch 'main' of https://github.com/medyll/css-base



## [0.6.8] - 2026-05-01
**Chores:**
- release v0.6.7 [skip ci]

**Other:**
- Merge branch 'main' of https://github.com/medyll/css-base



## [0.6.6] - 2026-05-01
**Chores:**
- release v0.6.5 [skip ci]

**Other:**
- Merge branch 'main' of https://github.com/medyll/css-base



## [0.6.4] - 2026-04-30
**Chores:**
- release v0.6.3 [skip ci]

**Other:**
- Merge branch 'main' of https://github.com/medyll/css-base



## [0.6.2] - 2026-04-24
**Bug Fixes:**
- update SKILL.md for v0.6.0 release, enhancing descriptions and structure

**Chores:**
- release v0.6.1 [skip ci]



## [0.5.2] - 2026-04-20
**Bug Fixes:**
- update version format to include patch in package.json

**Chores:**
- release v0.5.1 [skip ci]



## [0.1.34] - 2026-04-06
**Chores:**
- release v0.1.33 [skip ci]

**Other:**
- Merge branch 'main' of https://github.com/medyll/css-base



## [0.1.32] - 2026-04-04
**Chores:**
- release v0.1.31 [skip ci]

**Other:**
- Merge branch 'main' of https://github.com/medyll/css-base



## [0.1.30] - 2026-04-04
**Documentation:**
- add brand skins section to css-base skill

**Chores:**
- release v0.1.29 [skip ci]



## [0.1.28] - 2026-04-04
**Documentation:**
- publish demo skinning overview

**Chores:**
- release v0.1.27 [skip ci]



## [Unreleased]
**Features:**
- finalize the 10 demo skins as a complete skinnable showcase in `dist/demo/`
- add `dist/demo/SKINNING.md` and `dist/demo/skin-template.css`

**Fixes:**
- align demo semantic status colors on `--color-critical`

**Docs:**
- expose demo skinning in the README

**QA:**
- add smoke screenshots and validation report for all demos in `bmad/artifacts/screenshots/`

## [0.1.26] - 2026-04-04
**Chores:**
- release v0.1.25 [skip ci]

**Other:**
- Merge branch 'main' of https://github.com/medyll/css-base

## [0.1.24] - 2026-04-04
**Chores:**
- release v0.1.23 [skip ci]

**Other:**
- Add shared navigation and theme toggle functionality



## [0.1.22] - 2026-03-31
**Chores:**
- release v0.1.21 [skip ci]

**Other:**
- Merge branch 'main' of https://github.com/medyll/css-base



## [0.1.20] - 2026-03-31
**Chores:**
- release v0.1.19 [skip ci]

**Other:**
- Merge branch 'main' of https://github.com/medyll/css-base



## [0.1.18] - 2026-03-28
**Chores:**
- release v0.1.17 [skip ci]

**Other:**
- Merge branch 'main' of https://github.com/medyll/css-base



## [0.1.16] - 2026-03-28
**Chores:**
- release v0.1.15 [skip ci]

**Other:**
- Merge branch 'main' of https://github.com/medyll/css-base



## [0.1.14] - 2026-03-28
**Chores:**
- release v0.1.13 [skip ci]

**Other:**
- Merge branch 'main' of https://github.com/medyll/css-base



## [0.1.12] - 2026-03-28
**Chores:**
- release v0.1.11 [skip ci]

**Other:**
- Merge branch 'main' of https://github.com/medyll/css-base



## [0.1.10] - 2026-03-28
**Chores:**
- release v0.1.9 [skip ci]

**Other:**
- Merge branch 'main' of https://github.com/medyll/css-base



## [0.1.8] - 2026-03-28
**Chores:**
- release v0.1.7 [skip ci]

**Other:**
- Merge branch 'main' of https://github.com/medyll/css-base



## [0.1.6] - 2026-03-22
**Chores:**
- release v0.1.5 [skip ci]

**Other:**
- Merge branch 'main' of https://github.com/medyll/css-base


