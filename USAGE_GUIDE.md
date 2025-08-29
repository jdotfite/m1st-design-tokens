# Usage & Migration Guide

Unified reference for installing, importing, migrating, and troubleshooting the M1st design tokens (fonts + themes + variables).

## Quick Start

Install:
```bash
npm install m1st-design-tokens
```

Recommended CSS import (tokens + all @font-face + themes):
```css
@import "m1st-design-tokens/css";
```

JavaScript / TypeScript:
```js
import tokens from "m1st-design-tokens";
console.log(tokens.color.brand.primary);
```

## Import Patterns

| Goal | Import |
|------|--------|
| Everything (fonts + tokens) | `@import "m1st-design-tokens/css";` |
| Fonts only (Inter) | `@import "m1st-design-tokens/fonts/inter.css";` |
| Fonts only (DIN‑2014) | `@import "m1st-design-tokens/fonts/din-2014.css";` |
| Both font families (no tokens) | `@import "m1st-design-tokens/fonts/inter.css";` then `@import "m1st-design-tokens/fonts/din-2014.css";` |

All font-face rules use `font-display: swap` and relative URLs pointing to `../fonts/` which resolve to `dist/fonts/` in the published package (as of v1.3.0).

## Typography (v3+ Tailwind-First)

Typography utilities previously shipped as custom classes (.heading-xxl, etc.). In **v3.0.0** these were removed in favor of Tailwind's native `text-*` utilities extended via tokens.

Tailwind config:
```js
const tokens = require('m1st-design-tokens/integrations/tailwind');
module.exports = {
   theme: {
      ...tokens.theme,
      extend: { ...tokens.theme.extend }
   }
};
```

Usage examples:
```html
<h1 class="text-display tracking-tight font-bold">Page Title</h1>
<h2 class="text-headline">Section</h2>
<h3 class="text-title">Subsection</h3>
<p class="text-body">Paragraph text...</p>
<small class="text-label uppercase tracking-wide">LABEL</small>
```

Scale mapping (tokens → Tailwind utilities):
- `--font-size-heading-xxl` → `text-heading-xxl` / `text-display`
- `--font-size-heading-xl`  → `text-heading-xl` / `text-headline`
- `--font-size-heading-l`   → `text-heading-l` / `text-title`
- `--font-size-heading-m`   → `text-heading-m` / `text-body` (semantic heading body)
- `--font-size-heading-xs`  → `text-heading-xs` / `text-label`
- Body sizes: `--font-size-body-(l|m|s|xs)` → `text-body-(l|m|s|xs)`

Letter spacing (token-backed):
`tracking-tight`, `tracking-normal`, `tracking-wide` map to corresponding CSS variables.

Uppercase: use Tailwind `uppercase` (former `.is-caps` removed). Normal case: `normal-case`.

Non-Tailwind usage still possible via raw variables:
```css
.custom-title { font-size: var(--font-size-heading-l); }
```

## Theming

Light tokens live under `:root`. Dark overrides activate when you add `[data-theme="dark"]` or `.dark` to a root element. A `prefers-color-scheme: dark` media query provides a system fallback when no explicit theme is set.

## Package Structure (v1.3.0+)
```
node_modules/m1st-design-tokens/
├─ dist/
│  ├─ css/tokens.css        # Fonts + variables + themes
│  ├─ js/tokens.(js|esm.js) # JS exports
│  ├─ js/tokens.d.ts        # Types
│  ├─ tokens.json           # Raw token data
│  └─ fonts/                # All font assets + inter.css + din-2014.css
└─ CHANGELOG.md
```

> Note: Prior to v1.3.0 a duplicate root `fonts/` folder existed. It was removed for size optimization. Always rely on the documented import paths which map to `dist/*` via package exports.

## Migration (≤1.1.x → 1.2.x / 1.3.x)

1. Update package:
   ```bash
   npm install m1st-design-tokens@latest
   ```
2. Remove legacy external font imports (e.g. Google Fonts, manual DIN includes).
3. Add unified import:
   ```css
   @import "m1st-design-tokens/css";
   ```
4. Replace hard‑coded font-family usages with tokens:
   ```css
   /* Before */ font-family: 'Inter', sans-serif;
   /* After  */ font-family: var(--font-family-body);
   ```

## Troubleshooting

### 404 Font Errors
Check that `node_modules/m1st-design-tokens/dist/fonts/` exists and contains Inter / DIN files. If missing: reinstall dependencies.

### Version Verification
```bash
npm list m1st-design-tokens
# Expect 1.3.0 or higher
```

### Clean Reinstall
```bash
rm -rf node_modules package-lock.json
npm install
```

### Build Tool Notes
| Tool | Note |
|------|------|
| Vite / Webpack | Ensure CSS handling of `@import` is enabled before postcss processing |
| Next.js | Import in `app/globals.css` or `pages/_app.(js|tsx)` global stylesheet |
| CRA | Import in `src/index.css` or top-level App stylesheet |

### TypeScript Module Resolution
If your config cannot resolve the module types (should be rare since d.ts is exported):
```ts
declare module "m1st-design-tokens" { const tokens: any; export default tokens; }
```

## Font Integrity Check (Repo Dev Only)

When working inside this repository you can verify that every referenced font file exists:
```bash
npm run verify:fonts
```
Expected success message: `All referenced font files are present.`

## Edge Cases & Notes
* Custom bundlers that rewrite relative URLs must preserve `../fonts/` relationships.
* If self-hosting assets via a CDN, copy `dist/fonts/` as-is; the relative paths remain valid if `tokens.css` and `fonts/` keep the same parent directory.
* Dark theme tokens only apply when the selector is present; they do not auto-override explicit light context.

## Changelog Highlights
* 1.2.0 – Added full font system + embedded `@font-face` rules.
* 1.2.1 – Fixed relative font path resolution (`../fonts/`).
* 1.2.2 – Added copy step ensuring fonts exist under `dist/fonts/`.
* 1.3.0 – Removed duplicate root `fonts/`; all imports resolve to `dist/fonts/`.

## Need Help?
Open an issue with:
* Version number
* Import snippet
* Console 404s (if any)
* Snippet of generated CSS around a failing `@font-face`

---
This guide supersedes the previous `FONT-MIGRATION-GUIDE.md` and `PACKAGE-CONSUMPTION-GUIDE.md` files.
