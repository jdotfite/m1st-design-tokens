# M1st Design Token System - Complete Rebuild

This design token system has been completely rebuilt from the original CSS to follow the M1st 4-layer token architecture.

## 🏗️ 4-Layer Token Architecture

### Layer 1: Foundation Tokens (Raw Values)
- **Neutral Scale**: 25 steps from white (#ffffff) to black (#000000) with calculated middle values
- **Brand Colors**: M1st brand red (#EE3831) and accent palette
- **Typography**: DIN-2014 + Inter font families, type scale, weights
- **Spacing**: Base spacing scale from 0.25rem to 4rem
- **Transitions**: Smooth theme change animations

### Layer 2: Semantic Tokens (Color Intentions)
- **Text Colors**: Primary, secondary, tertiary, placeholder, disabled, inverse
- **Background Colors**: Primary, secondary, tertiary, canvas, overlay
- **Surface Colors**: Primary, secondary, elevated, sunken
- **Border Colors**: Primary, secondary, tertiary, focus, danger
- **State Colors**: Hover, active, focus, selected, disabled
- **Status Colors**: Success, warning, danger, info (with emphasis and subtle variants)

### Layer 3: Page-Level Tokens (Page Context) **Key Innovation**
- Maps semantic tokens to specific page usage contexts
- **Examples**: `--page-background`, `--page-text-primary`, `--page-surface`
- **Benefits**: Easy theme switching, consistent page-level styling
- **Usage**: Perfect for pages, sections, and layout components

### Layer 4: Component Tokens (Component-Specific)
- **Button variants**: Primary, secondary, ghost, danger, info, success, warning
- **Input controls**: Background, borders, text, placeholders
- **Card components**: Backgrounds, borders, shadows
- **Modal components**: Overlays, backgrounds, borders
- **Navigation**: Backgrounds, links, states
- **Loading spinners**: Brand colors and states

## 🎨 Theme Support

### Light Theme (Default)
- Clean, minimal design with M1st brand colors
- Extended neutral scale for precise control
- Professional color palette

### Dark Theme
- **Inverted Neutral Scale**: Automatically maps light tokens to dark equivalents
- **Preserved Brand Colors**: M1st red stays consistent across themes
- **Enhanced Status Colors**: Optimized for dark backgrounds
- **Automatic System Detection**: Respects `prefers-color-scheme: dark`

## 📁 File Structure

```
src/tokens/
├── base.json              # Layer 1: Foundation tokens
├── colors.json            # Layer 2: Semantic color tokens  
├── typography.json        # Layer 1: Typography tokens
├── page.json             # Layer 3: Page-level tokens
├── components.json       # Layer 4: Component tokens
├── button.json           # Layer 4: Button-specific tokens
├── utilities.json        # Utility tokens
├── dark-theme.json       # Dark theme overrides
└── dark-components.json  # Dark component overrides
```

## 🔧 Generated Outputs

### CSS Variables (`dist/css/tokens.css`)
- Organized by layer with clear comments
- Light theme in `:root`
- Dark theme in `.dark` and `[data-theme="dark"]`
- System preference support with `@media (prefers-color-scheme: dark)`

### JavaScript/TypeScript (`dist/js/`)
- ES6 modules and CommonJS
- TypeScript declarations
- Flat token object for programmatic access

### JSON (`dist/tokens.json`)
- Flat structure for build tools
- All resolved token values

## 🚀 Usage Examples

### CSS Custom Properties
```css
/* Layer 3: Page-level tokens (recommended) */
.my-component {
  background-color: var(--page-background);
  color: var(--page-text-primary);
  border: 1px solid var(--page-border);
}

/* Layer 4: Component tokens for specific components */
.my-button {
  background-color: var(--button-primary-background);
  color: var(--button-primary-text);
  border-radius: var(--button-border-radius);
}
```

### JavaScript/TypeScript
```javascript
import tokens from '@members1stfederalcreditunion/design-tokens';

// Access any token programmatically
const brandColor = tokens.brandPrimary; // "#EE3831"
const pageBackground = tokens.pageBackground; // "#ffffff"
```

## 🎯 Best Practices

1. **Components should primarily use page-level tokens (Layer 3)**
   - `var(--page-text-primary)` instead of `var(--color-text-primary)`
   - `var(--page-background)` instead of `var(--color-background-primary)`

2. **Use semantic tokens (Layer 2) for component-specific needs**
   - When page-level tokens don't provide enough specificity

3. **Never use foundation tokens (Layer 1) directly in components**
   - Use `var(--page-text-primary)` not `var(--neutral-900)`

4. **Component tokens (Layer 4) only when specialized styling is needed**
   - Button variants, specific component requirements

## 🌟 Benefits of This Architecture

### For Designers
- **Clear token hierarchy** following design system principles
- **Easy theme creation** by overriding semantic tokens
- **Consistent naming** across all design tools

### For Developers  
- **Reduced CSS specificity issues** with layered approach
- **Type-safe tokens** with TypeScript support
- **Automatic dark mode** with intelligent token mapping
- **Easy maintenance** with clear token relationships

### For Product Teams
- **Faster iteration** with page-level token flexibility
- **Consistent experiences** across all touchpoints
- **Scalable design system** that grows with the product

## 📝 Migration from Original CSS

The tokens now perfectly match your original CSS variable names and values, but with improved organization and automatic theme generation. All your existing CSS using M1st design tokens should work without changes.

## 🔄 Build Process

```bash
# Install dependencies
npm install

# Build all token formats
npm run build

# Watch for changes during development  
npm run dev
```

The build process uses Style Dictionary with a custom formatter that maintains the M1st 4-layer architecture and generates properly organized CSS with theme support.
