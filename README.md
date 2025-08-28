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
npm install @members1stfederalcreditunion/design-tokens
```

## Usage

### CSS Import (Recommended)

Main CSS delivers tokens + all @font-face rules:

```css
@import "@members1stfederalcreditunion/design-tokens/css";
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
@import "@members1stfederalcreditunion/design-tokens/fonts/inter.css";

/* Just DIN-2014 fonts */
@import "@members1stfederalcreditunion/design-tokens/fonts/din-2014.css";

/* Both fonts without tokens */
@import "@members1stfederalcreditunion/design-tokens/fonts/inter.css";
@import "@members1stfederalcreditunion/design-tokens/fonts/din-2014.css";
```

### JavaScript / TypeScript

```javascript
import tokens from "@members1stfederalcreditunion/design-tokens";

// Access token values
console.log(tokens.color.brand.primary); // "#EE3831"
console.log(tokens.font.family.heading); // "DIN-2014"
```

### Sass / SCSS

```scss
@import "@members1stfederalcreditunion/design-tokens/css";

.my-component {
  background-color: var(--color-background-primary);
  color: var(--color-text-primary);
  font-family: var(--font-family-body);
}
```

### Typography Usage

The package includes complete typography integration:

```css
/* Use token-based font families */
.heading {
  font-family: var(--font-family-heading); /* DIN-2014 with fallbacks */
  font-size: var(--font-size-heading-xl);
  font-weight: var(--font-weight-bold);
  text-transform: uppercase; /* DIN-2014 displays best in uppercase */
}

.body-text {
  font-family: var(--font-family-body); /* Inter with fallbacks */
  font-size: var(--font-size-body-m);
  font-weight: var(--font-weight-normal);
  line-height: var(--font-line-height-normal);
}

/* Or use fonts directly */
.custom-heading {
  font-family: "DIN-2014", var(--font-family-system);
}

.custom-body {
  font-family: "Inter", var(--font-family-system);
}
```

**Font Features:**
- **Inter**: Variable font support (100-900 weight range) + static fallbacks
- **DIN-2014**: Complete professional family (Light, Regular, Demi, Bold, Extra Bold)
- **InterDisplay**: Optimized for large text and headings
- **Performance**: `font-display: swap` for optimal loading
- **Fallbacks**: System fonts ensure text is always readable

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

- Font migration: `FONT-MIGRATION-GUIDE.md`
- Consumption troubleshooting: `PACKAGE-CONSUMPTION-GUIDE.md`
- Changelog: `CHANGELOG.md`

## Contributing

Maintained by the M1st Federal Credit Union design system team. PRs welcome for additional component tokens, dark-mode refinements, and performance optimizations.