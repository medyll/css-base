# css-base — Status Report

**Generated:** 2026-04-06 03:20  
**Phase:** Development (15%)  
**Active Role:** Architect

---

## 📊 Product Overview

**@medyll/css-base** est un design system CSS moderne avec tokens sémantiques, dark mode automatique, et capacités avancées (CSS @function, attr()). Version actuelle : v0.1.30.

**Fonctionnalités clés :**
- Tokens sémantiques (seed + computed)
- Dark mode via `light-dark()` — pas de media queries
- CSS `@function` (Chrome 139+) — color manipulation
- `attr()` utilities (Chrome 139+) — dynamic styling
- 10 démos de skins (Netflix, Amazon, Spotify, GitHub, etc.)

---

## 📈 Dimensions

### Marketing
- Design system CSS moderne avec tokens sémantiques
- 10 démos de skins (Netflix, Amazon, Spotify, etc.)
- Dark mode automatique via light-dark()

### Product
- v0.1.30 — @medyll/css-base
- Seed tokens + computed tokens
- @function CSS (Chrome 139+) pour color manipulation
- attr() utilities (Chrome 139+) pour dynamic styling

### Far Vision
- Référence design system CSS
- Skinning system communautaire
- Démos comme documentation vivante

---

## 🏃 Sprints

| Sprint | Goal | Status |
|--------|------|--------|
| S1 | Refonte complète des 10 démos avec nouvelles capacités css-base | 🔄 In Progress |

### Stories

| ID | Title | Status | Tests |
|----|-------|--------|-------|
| S1-01 | Refonte démos css-base | TODO | ❌ Not run |

---

## 🔧 Development Details

**Stack technique :**
- CSS pur (layers, tokens, @function, attr())
- HTML pour les démos
- Skill css-base pour guider le développement

**Nouvelles capacités à exploiter :**
1. **CSS @function** — `--shade()`, `--tint()`, `--alpha()`, `--hover-state()`, harmonies color
2. **attr() utilities** — `data-elevation`, `data-pad`, `data-text`, `data-color`, etc.
3. **light-dark()** — dark mode automatique sans media queries
4. **Seed tokens** — override `--default-color-surface-*`, `--default-color-text-*`, pas les tokens calculés

**Démos existantes (10) :**
1. netflix — Dark-first, rouge Netflix, Barlow font
2. amazon — Light-first, orange + secondary color
3. whatsapp — Vert WhatsApp, light/dark
4. windows — Windows 11, bleu + rounded
5. macos — macOS, light-first, blur effects
6. spotify — Dark, vert Spotify
7. slack — Purple Slack, light-first
8. github — GitHub light/dark
9. dashboard — Dashboard générique
10. terminal — Terminal, monospace, vert/ambre

**Prochaines actions :**
1. **S1-01** — Refonte complète des démos
   - Phase 1 : Audit (Designer)
   - Phase 2 : Refonte (Designer + Developer)
   - Phase 3 : Index + Docs
   - Phase 4 : Tests visuels

---

## 📁 Artifacts

- `bmad/artifacts/stories/S1-01.md` — Story refonte démos
- `dist/demo/SKINNING.md` — Guide de skinning (à mettre à jour)
- `dist/demo/*/skin.css` — Skins actuels (à améliorer)
- `dist/skill/css-base/references/inspiration/` — References visuelles

---

## 🎯 Critères d'acceptation (S1-01)

- [ ] Chaque démo utilise les seed tokens (pas les tokens calculés)
- [ ] Skinning cohérent avec SKINNING.md
- [ ] Nouvelles capacités exploitées (@function, attr(), light-dark())
- [ ] References inspiration utilisées
- [ ] Chaque démo a un skin.css propre
- [ ] Index des démos généré — page d'accueil avec liens
- [ ] Tests visuels — screenshots avant/après
- [ ] Documentation mise à jour — SKINNING.md + README

---

**Next:** `bmad continue` → Designer pour audit des démos existantes
