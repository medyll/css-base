# PRD: css-base Demo Skins

## Problem Statement

`@medyll/css-base` needs real-world proof that its design token architecture supports radically different visual identities without changing HTML structure or base CSS. Currently there's only one generic `demo.html` — no evidence the library works as a skinnable foundation.

## Target Users

- **Library evaluators** — developers deciding whether to adopt `css-base`
- **Contributors** — developers extending the library who need visual regression references
- **Designers** — people exploring what's achievable with pure CSS custom properties

## Goal

Create 5 demo pages in `dist/demo/`, each reproducing a recognizable UI style using **only** `css-base` + a per-demo skin CSS file (variable overrides). If common patterns emerge across skins, extract a reusable skin system — but this is a discovered outcome, not a prerequisite.

---

## Features / User Stories

### Epic 1: Demo Infrastructure

**S1-01 — Demo scaffold & shared layout**
As a developer, I want a shared HTML template and index page so that all demos are discoverable and consistent.

Acceptance Criteria:
- [ ] `dist/demo/index.html` lists all 10 demos with links and thumbnails
- [ ] Each demo loads `../../dist/app.css` (the library) + its own `skin.css`
- [ ] Each demo page has a consistent nav bar with links to other demos
- [ ] Pages work offline (no external CDN dependencies except optional fonts)

---

### Epic 2: Demo Pages

**S1-02 — Netflix skin**
As a user, I want a Netflix-style dark UI with hero banner, horizontal card carousels, and a top navigation bar.

Acceptance Criteria:
- [ ] Dark background (`--color-surface` override to near-black)
- [ ] Red primary color (`--color-primary` override)
- [ ] Hero section with full-width banner and gradient overlay
- [ ] Horizontal scrollable card rows (movie thumbnails)
- [ ] Top nav bar with logo, search, and profile icon
- [ ] Hover effects on cards (scale, elevation)
- [ ] Footer with multi-column links
- [ ] Uses only `css-base` classes/data-attributes + skin.css variable overrides

**S1-03 — Amazon skin**
As a user, I want an Amazon-style e-commerce UI with search bar, product grid, and cart.

Acceptance Criteria:
- [ ] Light background, Amazon blue/orange color scheme
- [ ] Top bar: logo, search input, cart icon, account dropdown
- [ ] Category navigation bar below header
- [ ] Product grid with cards (image, title, price, stars, badge)
- [ ] Sidebar with filters (checkboxes, price range)
- [ ] "Deal of the day" alert banner
- [ ] Uses only `css-base` classes/data-attributes + skin.css variable overrides

**S1-04 — WhatsApp skin**
As a user, I want a WhatsApp-style messaging UI with contact list and chat panel.

Acceptance Criteria:
- [ ] Green primary color (`--color-primary` override)
- [ ] Two-panel layout: contact list (left) + chat (right)
- [ ] Contact list with avatar, name, last message preview, timestamp
- [ ] Chat panel: message bubbles (sent/received), input bar, attach button
- [ ] Chat header with contact info and call/video icons
- [ ] Search bar in contact list
- [ ] Uses only `css-base` classes/data-attributes + skin.css variable overrides

**S1-05 — Windows 11 skin**
As a user, I want a Windows 11-style desktop UI with taskbar, start menu, and windows.

Acceptance Criteria:
- [ ] Light/translucent surface colors with Mica-like effect (`data-blur`)
- [ ] Centered taskbar with app icons
- [ ] Start menu overlay (grid of app tiles + pinned/recommended)
- [ ] At least one "window" with title bar (minimize/maximize/close), body content
- [ ] Rounded corners (`--radius-md` / `--radius-lg`)
- [ ] System tray area (clock, wifi, battery icons)
- [ ] Uses only `css-base` classes/data-attributes + skin.css variable overrides

**S1-06 — macOS skin**
As a user, I want a macOS-style desktop UI with dock, menu bar, and windows.

Acceptance Criteria:
- [ ] Light surface with subtle gray tones, SF-like font stack
- [ ] Top menu bar (Apple logo, app name, system icons)
- [ ] Dock at bottom with app icons (magnification on hover via `data-scale`)
- [ ] At least one "window" with traffic light buttons (red/yellow/green), toolbar, content
- [ ] Finder-style sidebar (favorites, tags)
- [ ] Rounded corners, subtle shadows (`data-elevation`)
- [ ] Uses only `css-base` classes/data-attributes + skin.css variable overrides

---

**S1-08 — Spotify skin**
As a user, I want a Spotify-style music player UI with playlist sidebar, album art grid, and bottom playback bar.

Acceptance Criteria:
- [ ] Dark theme (#121212), green primary (#1DB954)
- [ ] Three-zone layout: sidebar (playlists) + main (album grid) + bottom player bar
- [ ] Album grid with cover art cards, playlist table view
- [ ] Player bar: track info, playback controls, progress bar, volume
- [ ] Uses only `css-base` classes/data-attributes + skin.css variable overrides

**S1-09 — Slack skin**
As a user, I want a Slack-style workspace UI with aubergine sidebar, message thread, and compose area.

Acceptance Criteria:
- [ ] Purple/aubergine sidebar with channel list, light main content
- [ ] Three-zone: sidebar + channel messages + optional thread panel
- [ ] Messages with avatar, username, timestamp
- [ ] Compose bar with formatting options
- [ ] Uses only `css-base` classes/data-attributes + skin.css variable overrides

**S1-10 — GitHub skin**
As a user, I want a GitHub-style repository page with file tree, README, and issue list.

Acceptance Criteria:
- [ ] Light theme with dark header, repository tabs
- [ ] File tree table, README card, sidebar (languages, releases)
- [ ] Issue list with status badges and colored labels
- [ ] Uses only `css-base` classes/data-attributes + skin.css variable overrides

**S1-11 — Dashboard Analytics skin**
As a user, I want a modern analytics dashboard with KPI cards, chart areas, and data tables.

Acceptance Criteria:
- [ ] Clean light theme with indigo accent
- [ ] Left sidebar navigation, KPI stat cards row, chart panels
- [ ] Data table with status badges, activity feed timeline
- [ ] Uses only `css-base` classes/data-attributes + skin.css variable overrides

**S1-12 — Terminal / CLI skin**
As a user, I want a retro terminal-style UI with command prompt, file manager, and system monitor.

Acceptance Criteria:
- [ ] Full dark theme, green/amber monospace text
- [ ] Terminal window with prompt output, file manager tree
- [ ] ASCII-style system monitor bars, split-pane layout
- [ ] Optional scanline CRT effect via CSS
- [ ] Uses only `css-base` classes/data-attributes + skin.css variable overrides

---

### Epic 3: Skin System Discovery

**S1-07 — Skin system extraction (optional, after demos)**
As a library maintainer, I want to identify common variable override patterns across the 10 demos and potentially extract a `skin.css` template or guide.

Acceptance Criteria:
- [ ] Document which CSS custom properties each demo overrides (comparison table)
- [ ] Identify if a minimal set of ~10-15 variables produces most of the visual differentiation
- [ ] If a pattern emerges, create a `dist/demo/skin-template.css` with annotated variable slots
- [ ] Write a short guide in `dist/demo/SKINNING.md`

---

### Exigence transversale: Light/Dark mode

**Chaque demo DOIT supporter les deux themes (light et dark).** Ceci est une exigence non-negotiable qui sert a:
- Valider que le systeme `light-dark()` + `color-scheme` de `css-base` fonctionne correctement avec des overrides de skin
- Debugger le mecanisme de theming (detection de regressions, contrastes insuffisants, surfaces mal calculees)
- Prouver que chaque skin est complete (pas juste un mode)

**Implementation attendue dans chaque `skin.css`:**
- Override des variables `--default-color-text-light` / `--default-color-text-dark`
- Override des variables `--default-color-surface-light` / `--default-color-surface-dark`
- Les surfaces derivees (`--color-surface-alt`, `--color-surface-sunken`, etc.) doivent s'adapter automatiquement via les fonctions `--shade()`
- Un toggle light/dark visible dans la nav de chaque demo (bouton avec `data-theme="light|dark"`)

**Critere d'acceptation global:** Chaque demo doit etre visuellement coherente et lisible dans les DEUX modes.

---

### Exigence transversale: Validation Playwright

**Chaque demo DOIT etre validee visuellement via Playwright** (skill `playwright-skill` / `webapp-testing`).

Pour chaque demo:
- [ ] Screenshot en mode light
- [ ] Screenshot en mode dark
- [ ] Verification des contrastes de base (texte lisible sur fond)
- [ ] Verification que tous les composants css-base utilises sont visibles et non casses

Les screenshots servent de reference visuelle et de regression testing.

### Exigence transversale: Auto-correction de la skill css-base

**Si les demos revelent des incoherences ou des lacunes dans `css-base`**, le workflow DOIT:
1. Documenter le probleme dans le rapport de la story
2. Modifier la skill `css-base` situee dans `dist/skill/css-base/SKILL.md` pour corriger/completer la documentation
3. Utiliser la skill `skiller` pour redéployer la skill modifiee vers les targets AI
4. Continuer le dev de la demo avec le fix applique

Ceci transforme les demos en **boucle de feedback** pour la qualite de la skill elle-meme.

---

## Out of Scope

- Backend or API integration
- Mobile-responsive optimization (desktop-first demos)
- Pixel-perfect reproduction of the original UIs — recognizable style is sufficient

## Risks & Dependencies

| Risk | Mitigation |
|------|-----------|
| `css-base` may lack components needed for complex UIs (e.g., no sidebar component) | Use utility classes + `data-*` attributes to compose layouts |
| Some demos may require CSS features not yet in `css-base` | Document gaps as findings — this is valuable feedback for the library |
| Skin overrides may conflict with `@layer` ordering | Test each skin in isolation; skin.css loads after app.css |
| Skill `css-base` may have documentation gaps or errors | Auto-correct: modify `dist/skill/css-base/SKILL.md` and redeploy via `skiller` |
| Playwright screenshots may differ across OS/GPU | Use consistent viewport size (1920x1080) and disable animations for screenshots |

## Success Metrics

- All 10 demos load correctly with `app.css` + their `skin.css`
- Each demo is visually recognizable as its target style
- No demo modifies `dist/app.css` or any library source file
- Skinning guide (S1-07) documents the override pattern
