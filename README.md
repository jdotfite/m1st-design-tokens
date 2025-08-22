# M1st Design Tokens

Design tokens for the M1st Federal Credit Union design system. This package provides a centralized source of truth for all design decisions including colors, typography, spacing, and component styling.

## Installation

```bash
npm install @members1stfederalcreditunion/design-tokens
```

## Usage

### CSS Import

```css
@import "@members1stfederalcreditunion/design-tokens/css";
```

### JavaScript/TypeScript

```javascript
import tokens from "@members1stfederalcreditunion/design-tokens";

// Access token values
console.log(tokens.color.brand.primary); // "#EE3831"
console.log(tokens.font.family.heading); // "DIN-2014"
```

### Sass/SCSS

```scss
@import "@members1stfederalcreditunion/design-tokens/css";

.my-component {
  background-color: var(--color-background-primary);
  color: var(--color-text-primary);
  font-family: var(--font-family-body);
}
```

## Token Architecture

This package follows a 4-layer token architecture:

1. **Foundation Tokens** - Raw values (colors, fonts, sizes)
2. **Semantic Tokens** - Purpose-driven mappings (primary, secondary, etc.)
3. **Page-level Tokens** - Context-specific tokens for different page types
4. **Component Tokens** - Component-specific styling tokens

## Theme Support

The tokens include comprehensive dark theme support. Apply dark theme by adding the `data-theme="dark"` attribute to your root element:

```html
<html data-theme="dark">
```

## Token Categories

### Colors
- **Neutrals**: Extended 0-1000 scale for precise control
- **Brand**: Primary brand color (#EE3831)
- **Accent**: Warm and cool accent colors
- **Semantic**: Success, warning, danger, info states
- **Interactive**: Hover, active, focus, disabled states

### Typography
- **Families**: DIN-2014, Inter, system fonts
- **Sizes**: Heading and body scales
- **Weights**: Light to bold
- **Line Heights**: Tight, normal, relaxed

### Components
Pre-configured tokens for common components:
- Buttons (primary, secondary, tertiary, danger)
- Inputs and forms
- Cards and surfaces
- Navigation and tabs
- Badges and labels
- Modals and overlays
- Tables and data display

## Accessibility

All tokens are designed with accessibility in mind:
- WCAG AA contrast ratios
- High contrast mode support
- Reduced motion preferences
- Semantic color mappings

## Development

```bash
# Build tokens
npm run build

# Watch for changes
npm run dev

# Clean build
npm run build:clean
```

## Contributing

This package is maintained by the M1st Federal Credit Union design team. For questions or contributions, please reach out to the design system team.