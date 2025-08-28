# Package Consumption Troubleshooting

## 🚨 Issues Fixed in v1.2.1 – v1.2.2

### **Font Path Resolution (CRITICAL FIX)**
**Problem**: Font URLs were relative without proper path resolution
```css
/* BEFORE (broken) */
src: url("InterVariable.woff2") format("woff2");

/* AFTER (fixed) */
src: url("../fonts/InterVariable.woff2") format("woff2");
```

**Impact**: When consuming projects imported the CSS, font paths couldn't resolve, causing:
- Missing fonts / fallback fonts used
- 404 errors in browser console
- Typography not rendering correctly

**Solution (v1.2.1)**: Updated Style Dictionary config to automatically prefix font URLs with `../fonts/`

### **Font Assets Now Copied to dist (v1.2.2)**
**Problem**: While font URLs pointed to `../fonts/`, the build previously only shipped fonts at package root (`fonts/`), not under `dist/fonts/`, so relative paths inside `dist/css/tokens.css` could fail in some bundler contexts.

**Solution (v1.2.2)**: Added a post-build copy step that places all font assets in `dist/fonts/` matching the relative URLs. Result: zero 404s even in isolated CSS extraction scenarios.

**Validate**: After install, you should see both locations (root `fonts/` and `dist/fonts/`). Either path works; CSS references `dist/fonts/` via `../fonts/` relative traversal.

### **Package Export Improvements**
- ✅ Added `package.json` export for better tooling support
- ✅ Added `CHANGELOG.md` to distributed files
- ✅ Improved package structure for consumption
 - ✅ Added post-build font integrity verification (ensures every referenced font exists)

## 🧪 Testing Your Package Consumption

### **Quick Test for Font Resolution**

Create a simple HTML file in your consuming project:

```html
<!DOCTYPE html>
<html>
<head>
    <style>
        @import "@members1stfederalcreditunion/design-tokens/css";
        
        .test-inter {
            font-family: var(--font-family-body);
            font-size: 24px;
            font-weight: 500;
        }
        
        .test-din {
            font-family: var(--font-family-heading);
            font-size: 32px;
            font-weight: 600;
            text-transform: uppercase;
        }
    </style>
</head>
<body>
    <div class="test-inter">Inter Font Test - Should be Medium Weight</div>
    <div class="test-din">DIN-2014 Font Test - Should be Semibold</div>
</body>
</html>
```

### **Check Browser Console**
- ❌ If you see 404 errors for font files → font paths still broken
- ✅ If no font errors → paths working correctly

### **Common Import Patterns**

```css
/* Import everything (fonts + tokens) */
@import "@members1stfederalcreditunion/design-tokens/css";

/* Import just fonts */
@import "@members1stfederalcreditunion/design-tokens/fonts/inter.css";
@import "@members1stfederalcreditunion/design-tokens/fonts/din-2014.css";
```

```javascript
// JavaScript import
import tokens from "@members1stfederalcreditunion/design-tokens";
console.log(tokens.ColorBrandPrimary); // "#EE3831"
```

## 🔧 If You're Still Having Issues

### **1. Check Node Modules Structure**
```bash
node_modules/@members1stfederalcreditunion/design-tokens/
├── dist/
│   └── css/tokens.css
├── fonts/
│   ├── Inter-*.woff2
│   ├── DIN-2014_*.woff
│   └── *.css
└── package.json
```

### **2. Verify Version**
```bash
npm list @members1stfederalcreditunion/design-tokens
# Should show 1.2.2 or higher
```

### **2a. (Optional) Run Font Integrity Check Locally**
If cloning this repo directly:
```bash
npm run verify:fonts
```
Expect output ending with `All referenced font files are present.`

### **3. Clear Cache and Reinstall**
```bash
rm -rf node_modules package-lock.json
npm install
```

### **4. Build Tool Specific Issues**

**Webpack/Vite**: Ensure CSS loader can handle relative paths
**Next.js**: Import in `_app.js` or `globals.css`
**Create React App**: Import in `index.css` or `App.css`

### **5. TypeScript Issues**
```typescript
// If TypeScript can't find module
declare module "@members1stfederalcreditunion/design-tokens" {
  const tokens: any;
  export default tokens;
}
```

## 📞 Still Need Help?

1. **Check browser console** for 404 errors
2. **Verify file structure** in node_modules
3. **Test with simple HTML** file first
4. **Share specific error messages** for targeted help

The v1.2.1 fix should resolve the main font path issues affecting package consumption.
