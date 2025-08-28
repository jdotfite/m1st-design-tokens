# Font Migration Guide - M1st Design Tokens

## Overview

The M1st Design Token system now includes comprehensive font support with embedded @font-face declarations and distributed font files.

## ✅ What's Complete

### Font Files Included
- **Inter Font Family**: Complete variable and static font collection (88 font files)
  - InterVariable.woff2 (variable font)
  - Inter static fonts (Thin to Black, Regular + Italic)
  - InterDisplay fonts for large text
- **DIN-2014 Font Family**: Complete professional font collection
  - Regular, Light, Demi, Bold, Extra Bold
  - Condensed and Narrow variants
  - All with italic variants
  - Both .woff2, .woff, and .otf formats for maximum compatibility

### Build System Integration
- ✅ @font-face declarations automatically included in `dist/css/tokens.css`
- ✅ Font files distributed in `fonts/` directory
- ✅ Package exports configured for font access
- ✅ Build process integrates font CSS seamlessly

## 📦 Package Usage

### Installation
```bash
npm install @members1stfederalcreditunion/design-tokens
```

### Usage Options

#### Option 1: Complete CSS (Recommended)
Import the main tokens.css file which includes fonts + tokens:
```css
@import "@members1stfederalcreditunion/design-tokens/css";
```

#### Option 2: Separate Font Import
Import fonts separately if you need more control:
```css
@import "@members1stfederalcreditunion/design-tokens/fonts/inter.css";
@import "@members1stfederalcreditunion/design-tokens/fonts/din-2014.css";
@import "@members1stfederalcreditunion/design-tokens/css";
```

#### Option 3: Individual Font Families
```css
/* Just Inter */
@import "@members1stfederalcreditunion/design-tokens/fonts/inter.css";

/* Just DIN-2014 */
@import "@members1stfederalcreditunion/design-tokens/fonts/din-2014.css";
```

### Using the Fonts

```css
.heading {
  font-family: var(--font-family-heading); /* DIN-2014 */
}

.body-text {
  font-family: var(--font-family-body); /* Inter */
}

/* Or use directly */
.custom-heading {
  font-family: "DIN-2014", var(--font-family-system);
}

.custom-body {
  font-family: "Inter", var(--font-family-system);
}
```

## 🔧 Technical Details

### Font Loading Strategy
- `font-display: swap` for optimal loading performance
- Progressive enhancement with fallback fonts
- Variable fonts preferred where supported

### Font Stack Hierarchy
```css
--font-family-heading: "DIN-2014", -apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans", Helvetica, Arial, sans-serif;
--font-family-body: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans", Helvetica, Arial, sans-serif;
```

### Package Structure
```
@members1stfederalcreditunion/design-tokens/
├── dist/
│   ├── css/tokens.css          # Complete CSS with fonts + tokens
│   ├── js/tokens.js            # JavaScript tokens
│   └── tokens.json             # Raw token data
├── fonts/
│   ├── inter.css               # Inter @font-face declarations
│   ├── din-2014.css           # DIN-2014 @font-face declarations
│   ├── Inter-*.woff2           # Inter font files
│   ├── DIN-2014_*.woff         # DIN-2014 font files
│   └── ...                     # All 88+ font files
└── README.md
```

## 🚀 Migration Benefits

### For Design System Projects
- ✅ **Single Source of Truth**: Fonts version with design tokens
- ✅ **Consistent Distribution**: Same fonts across all projects
- ✅ **Automatic Updates**: Font updates come with token updates
- ✅ **Performance Optimized**: Proper font-display and loading strategy

### For Development Teams
- ✅ **Simplified Setup**: One npm install gets fonts + tokens
- ✅ **Version Consistency**: Font versions locked to token versions
- ✅ **Reduced Bundle Size**: Shared fonts across projects
- ✅ **Better Caching**: Fonts served from CDN with proper headers

## 🔄 Updating Existing Projects

### Step 1: Update Design Tokens
```bash
npm update @members1stfederalcreditunion/design-tokens
```

### Step 2: Remove Old Font Imports
Remove any existing font imports from your project:
```css
/* REMOVE these old imports */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
/* Or local font files */
```

### Step 3: Use Token CSS
```css
/* REPLACE with */
@import "@members1stfederalcreditunion/design-tokens/css";
```

### Step 4: Update Font References
```css
/* BEFORE */
font-family: 'Inter', sans-serif;

/* AFTER */
font-family: var(--font-family-body);
```

## 📋 Next Phase TODO

- [ ] Add font weight token validation
- [ ] Create font loading performance metrics
- [ ] Add font subset optimization for smaller bundles
- [ ] Document font licensing and usage guidelines
- [ ] Add automated font file integrity checking

## 🎯 Success Metrics

- ✅ 88 font files successfully migrated
- ✅ @font-face declarations automatically embedded
- ✅ Package exports properly configured
- ✅ Build process integrates seamlessly
- ✅ Font tokens reference correct font families
- ✅ Fallback fonts properly configured

The font migration is now complete and ready for production use!
