# M1st Design Tokens

Design tokens for the M1st Federal Credit Union design system. Central source of truth for colors, typography, spacing, theming, component styling, and **complete font integration** (Inter + DIN‑2014).

## ✨ Features

- 4-layer token architecture (Foundation → Semantic → Page → Component)
- Complete font system: Inter (variable + static + Display) & DIN‑2014 families
- Light + dark theme with automatic prefers-color-scheme fallback
- Output formats: CSS, JS (CJS + ESM), JSON, TypeScript declarations
- 88+ font assets shipped & referenced with stable relative paths
- Accessible naming + WCAG-focused palette
- Backward-compatible button background alias tokens

## Installation

```bash
npm install m1st-design-tokens
```

## Usage

### CSS Import (Recommended)

Main CSS delivers tokens + all @font-face rules:

```css
@import "m1st-design-tokens/css";
```

Includes:
- All CSS custom properties
- Inter + DIN-2014 (variable + static) + InterDisplay
- Light/dark theme tokens
- `font-display: swap` for performance

### Font-Only Imports

Need just fonts (e.g., separate layering)?

```css
/* Just Inter fonts */
@import "m1st-design-tokens/fonts/inter.css";

/* Just DIN-2014 fonts */
@import "m1st-design-tokens/fonts/din-2014.css";

/* Both fonts without tokens */
@import "m1st-design-tokens/fonts/inter.css";
@import "m1st-design-tokens/fonts/din-2014.css";
```

### JavaScript / TypeScript

```javascript
import tokens from "m1st-design-tokens";

// Access token values
console.log(tokens.color.brand.primary); // "#EE3831"
console.log(tokens.font.family.heading); // "DIN-2014"
```

### Sass / SCSS

```scss
@import "m1st-design-tokens/css";

.my-component {
  background-color: var(--color-background-primary);
  color: var(--color-text-primary);
  font-family: var(--font-family-body);
}
```

### Tailwind Integration (v3+)

This package is now **Tailwind-first** for typography. Instead of shipping custom heading classes, we extend Tailwind's `fontSize` and `letterSpacing` scales with token-driven CSS variables. That gives you themeable typography using regular Tailwind utilities.

Add to `tailwind.config.js`:

```js
// tailwind.config.js
const tokens = require('m1st-design-tokens/integrations/tailwind');

module.exports = {
  theme: {
    ...tokens.theme,           // supplies extend.fontSize + extend.letterSpacing
    extend: {
      ...tokens.theme.extend,  // (optional) add your own extensions after this
    }
  }
};
```

Use in markup:

```html
<h1 class="text-display tracking-tight font-bold">Heading</h1>
<h2 class="text-headline">Section</h2>
<p class="text-body leading-relaxed">Body copy...</p>
<span class="text-label uppercase tracking-wide">LABEL</span>
```

Available font size utilities (examples):
- `text-heading-xxl` … `text-heading-xs`
- Semantic aliases: `text-display`, `text-headline`, `text-title`, `text-body`, `text-label`
- Body scale: `text-body-l|m|s|xs`

Letter-spacing utilities reuse Tailwind's names but are token-backed:
- `tracking-tight` → `var(--font-letter-spacing-tight)`
- `tracking-normal` → `var(--font-letter-spacing-normal)`
- `tracking-wide` → `var(--font-letter-spacing-wide)`

Uppercasing: use Tailwind's `uppercase` / `normal-case` (former custom helpers removed).

If you don't need Tailwind you can still reference raw CSS variables directly:
```css
.my-title { font-size: var(--font-size-heading-l); letter-spacing: var(--font-letter-spacing-wide); }
```

**Font Features (unchanged):**
- Inter (variable + static) & InterDisplay
- DIN-2014 full family
- `font-display: swap` performance strategy
- System fallbacks for resilience

## Token Architecture (4 Layers)

1. Foundation – primitive values (neutral scale, brand, spacing, typography)
2. Semantic – intent mapping (background, text, border, state, status)
3. Page – contextual abstraction for layouts / shells
4. Component – individualized component styling (buttons, inputs, etc.)

## Theme Support

Toggle dark theme by adding `data-theme="dark"` (or `.dark`). A system preference media query provides an automatic fallback unless an explicit light override exists.

```html
<html data-theme="dark">
```

## Key Token Categories

Colors (brand, neutrals 0–1000, accents, states), typography (families, scale, weights, line-height), spacing, transitions, shadows, component tokens (buttons, inputs, cards, navigation, status indicators).

## Accessibility

WCAG-minded contrast mapping, reduced motion & high contrast considerations built into semantic / page abstractions.

## Development

```bash
npm run build         # Build all outputs
npm run dev           # Watch mode
npm run build:clean   # Clean rebuild
```

Optional integrity check idea (future): validate each font referenced in CSS exists under `dist/fonts`.

## Additional Guides

- Usage & migration: `USAGE_GUIDE.md` (supersedes prior font + consumption guides)
- (Deprecated) `FONT-MIGRATION-GUIDE.md` / `PACKAGE-CONSUMPTION-GUIDE.md`
- Changelog: `CHANGELOG.md`

> 1.3.0: Fonts now shipped only under `dist/fonts/` (old root `fonts/` removed). Use documented import paths.

## Contributing

Maintained by the M1st Federal Credit Union design system team. PRs welcome for additional component tokens, dark-mode refinements, and performance optimizations.