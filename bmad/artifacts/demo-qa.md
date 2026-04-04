# Demo QA Report

**Date:** 2026-04-04
**Scope:** `dist/demo/index.html` + 10 demo pages
**Method:** Playwright smoke pass on local `file:///` pages with light/dark screenshots

## Checks performed

1. Open each demo page and wait for load completion
2. Verify the theme toggle button exists
3. Toggle theme once and confirm the dataset changes from light to dark
4. Record console errors, page errors, and failed requests
5. Save screenshots in both light and dark modes to `bmad/artifacts/screenshots/`

## Result

- 11 pages validated
- 22 screenshots generated
- 0 console errors
- 0 page errors
- 0 failed requests

## Artifacts

- Machine-readable report: `bmad/artifacts/screenshots/demo-smoke-report.json`
- Screenshots: `bmad/artifacts/screenshots/*-light.png` and `*-dark.png`
- Automation script: `css-base-workspace/screenshots/take-demo-screenshots.js`

## Notes

- The demo hub intentionally has no nav links in its top bar, so its nav link count is `0` in the smoke report.
- Editor diagnostics still flag inline styles across the demo HTML files. That is pre-existing authoring style in the demos, not a runtime failure found by QA.