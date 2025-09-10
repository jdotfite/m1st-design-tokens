# M1st Design Tokens

Design tokens for M1st Federal Credit Union's design system. Built with Style Dictionary for consistent UI development across platforms.

## Quick Start

```bash
npm install m1st-design-tokens
```

```css
@import "m1st-design-tokens/css";

.component {
  background: var(--color-brand-primary);
  color: var(--color-text-primary);
  font-family: var(--font-family-heading);
}
```

## What's Included

- **Colors**: Brand (`#E50506`), neutrals, accents (red, green, orange, yellow, teal, blue, purple, magenta)
- **Typography**: DIN-2014, Inter, Lora with complete font assets
- **Spacing**: Consistent scale from xs to 3xl
- **Components**: Button, input, navigation, status indicators
- **Themes**: Light/dark with `data-theme="dark"` toggle

## Formats

- **CSS**: `m1st-design-tokens/css` - CSS custom properties + fonts
- **JavaScript**: `import tokens from "m1st-design-tokens"` - Token objects
- **JSON**: `m1st-design-tokens/tokens` - Raw token data
- **Tailwind**: `m1st-design-tokens/integrations/tailwind` - Tailwind config

## Architecture

4-layer token system:
1. **Foundation** - Brand colors, spacing, typography scales
2. **Semantic** - Background, text, border, status colors  
3. **Page** - Layout and shell contexts
4. **Component** - Button, input, card specific tokens

## Fonts

Three complete font families with web font optimization:

```css
/* Individual fonts */
@import "m1st-design-tokens/fonts/din-2014.css";
@import "m1st-design-tokens/fonts/inter.css";
@import "m1st-design-tokens/fonts/lora.css";
```

## Dark Theme

```html
<html data-theme="dark">
```

Automatic fallback via `prefers-color-scheme: dark` when no explicit theme is set.

## Development

```bash
npm run build       # Build all outputs
npm run dev         # Watch mode  
npm run release     # Version, commit, and publish
```

Built with [Style Dictionary](https://amzn.github.io/style-dictionary/) v3.8.0