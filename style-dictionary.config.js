const StyleDictionary = require("style-dictionary");
const fs = require("fs");
const path = require("path");

// Custom format for M1st 4-layer CSS variables with fonts
StyleDictionary.registerFormat({
  name: "css/m1st-variables",
  formatter: function({ dictionary, options }) {
    const { selector = ":root" } = options;
    
    // Read font CSS files and fix paths
    let fontCSS = "";
    try {
      let interCSS = fs.readFileSync(path.join(__dirname, "fonts", "inter.css"), "utf8");
      let dinCSS = fs.readFileSync(path.join(__dirname, "fonts", "din-2014.css"), "utf8");
      
      // Fix relative paths to point to the fonts directory
      interCSS = interCSS.replace(/url\("([^"]+)"\)/g, 'url("../fonts/$1")');
      dinCSS = dinCSS.replace(/url\("([^"]+)"\)/g, 'url("../fonts/$1")');
      
      fontCSS = `/* =============================================================================
   FONT IMPORTS - Inter & DIN-2014
   ============================================================================= */

${interCSS}

${dinCSS}

`;
    } catch (error) {
      console.warn("Warning: Could not read font CSS files:", error.message);
    }
    
    // Filter tokens by category for organized output
    const baseTokens = dictionary.allTokens.filter(token => 
      token.path[0] === 'neutral' || 
      token.path[0] === 'brand' || 
      token.path[0] === 'accent' ||
      token.path[0] === 'space' ||
      token.path[0] === 'transition' ||
      token.path[0] === 'shadow' ||
      token.path[0] === 'font' ||
      token.path[0] === 'line' ||
      token.path[0] === 'letter' ||
      token.path[0] === 'text'
    );
    
    const semanticTokens = dictionary.allTokens.filter(token => 
      token.path[0] === 'color' && !token.path.includes('dark')
    );
    
    const pageTokens = dictionary.allTokens.filter(token => 
      token.path[0] === 'page' && !token.path.includes('dark')
    );
    
    const componentTokens = dictionary.allTokens.filter(token => 
      token.path[0] === 'button' || 
      token.path[0] === 'input' || 
      token.path[0] === 'card' || 
      token.path[0] === 'modal' ||
      token.path[0] === 'nav' ||
      token.path[0] === 'loading' ||
      token.path[0] === 'component'
    );
    
    const utilityTokens = dictionary.allTokens.filter(token => 
      token.path[0] === 'utility'
    );
    
    const darkTokens = dictionary.allTokens.filter(token => 
      token.path.includes('dark')
    );
    
    let output = `${fontCSS}/**
 * M1st Design System - CSS Variables
 * Generated on ${new Date().toUTCString()}
 * 
 * 4-Layer Token Architecture:
 * Layer 1: Foundation tokens (base colors, typography)
 * Layer 2: Semantic tokens (color intentions)
 * Layer 3: Page-level tokens (page context)
 * Layer 4: Component tokens (component-specific)
 */

/* =============================================================================
   M1ST DESIGN SYSTEM - LIGHT THEME
   ============================================================================= */

${selector} {
`;
    
    // Layer 1: Foundation tokens
    if (baseTokens.length > 0) {
      output += `  /* Layer 1: Foundation Tokens */\n`;
      baseTokens.forEach(token => {
        if (token.comment) {
          output += `  /* ${token.comment} */\n`;
        }
        output += `  --${token.name}: ${token.value};\n`;
      });
      output += `\n`;
    }
    
    // Layer 2: Semantic tokens
    if (semanticTokens.length > 0) {
      output += `  /* Layer 2: Semantic Tokens */\n`;
      semanticTokens.forEach(token => {
        if (token.comment) {
          output += `  /* ${token.comment} */\n`;
        }
        output += `  --${token.name}: ${token.value};\n`;
      });
      output += `\n`;
    }
    
    // Layer 3: Page-level tokens
    if (pageTokens.length > 0) {
      output += `  /* Layer 3: Page-Level Tokens */\n`;
      pageTokens.forEach(token => {
        if (token.comment) {
          output += `  /* ${token.comment} */\n`;
        }
        output += `  --${token.name}: ${token.value};\n`;
      });
      output += `\n`;
    }
    
    // Layer 4: Component tokens
    if (componentTokens.length > 0) {
      output += `  /* Layer 4: Component Tokens */\n`;
      componentTokens.forEach(token => {
        if (token.comment) {
          output += `  /* ${token.comment} */\n`;
        }
        output += `  --${token.name}: ${token.value};\n`;
      });
      output += `\n`;
    }
    
    // Utility tokens
    if (utilityTokens.length > 0) {
      output += `  /* Utility Tokens */\n`;
      utilityTokens.forEach(token => {
        if (token.comment) {
          output += `  /* ${token.comment} */\n`;
        }
        output += `  --${token.name}: ${token.value};\n`;
      });
      output += `\n`;
    }
    
    output += `}\n\n`;
    
    // Dark theme
    if (darkTokens.length > 0) {
      output += `/* =============================================================================\n   M1ST DESIGN SYSTEM - DARK THEME\n   ============================================================================= */\n\n`;
      
      output += `.dark,\n[data-theme="dark"] {\n`;
      darkTokens.forEach(token => {
        // Remove "dark-" prefix to map to the same variable names as light theme
        const lightVariableName = token.name.replace(/^dark-/, "");
        if (token.comment) {
          output += `  /* ${token.comment} */\n`;
        }
        output += `  --${lightVariableName}: ${token.value};\n`;
      });
      output += `}\n\n`;
      
      // System preference dark theme
      output += `/* System preference dark theme */\n`;
      output += `@media (prefers-color-scheme: dark) {\n`;
      output += `  :root:not(.light):not([data-theme="light"]) {\n`;
      darkTokens.forEach(token => {
        const lightVariableName = token.name.replace(/^dark-/, "");
        output += `    --${lightVariableName}: ${token.value};\n`;
      });
      output += `  }\n`;
      output += `}\n`;
    }
    
    return output;
  }
});

// Legacy alias / utility layer to preserve earlier variable names & utility classes.
StyleDictionary.registerFormat({
  name: "css/m1st-legacy-aliases",
  formatter: function() {
    // Variable alias mapping: oldName -> newName
    const aliasMap = {
      /* Font sizes */
      'font-heading-xxl-size': 'font-size-heading-xxl',
      'font-heading-xl-size': 'font-size-heading-xl',
      'font-heading-l-size': 'font-size-heading-l',
      'font-heading-m-size': 'font-size-heading-m',
      'font-heading-s-size': 'font-size-heading-s',
      'font-heading-xs-size': 'font-size-heading-xs',
      'font-body-l-size': 'font-size-body-l',
      'font-body-m-size': 'font-size-body-m',
      'font-body-s-size': 'font-size-body-s',
      'font-body-xs-size': 'font-size-body-xs',
      'font-button-size': 'font-size-button',
      'font-code-size': 'font-size-code',
      /* Line heights */
      'line-height-tight': 'font-line-height-tight',
      'line-height-normal': 'font-line-height-normal',
      'line-height-relaxed': 'font-line-height-relaxed',
      /* Letter spacing */
      'letter-spacing-tight': 'font-letter-spacing-tight',
      'letter-spacing-normal': 'font-letter-spacing-normal',
      'letter-spacing-wide': 'font-letter-spacing-wide',
      /* Input tokens */
      'input-bg': 'input-background',
      'input-bg-focus': 'input-background-focus',
      'input-bg-disabled': 'input-background-disabled',
      /* Card tokens */
      'card-bg': 'card-background',
      'card-bg-hover': 'card-background-hover',
      /* Modal tokens */
      'modal-overlay-bg': 'modal-overlay',
      'modal-bg': 'modal-background',
      /* Nav tokens */
      'nav-bg': 'nav-background',
      'nav-link-bg-hover': 'nav-link-background-hover',
      'nav-link-bg-active': 'nav-link-background-active',
      /* Loading spinner */
      'loading-spinner-bg': 'loading-spinner-background'
    };

    // Tokens missing in new build (text transforms) are added directly.
    const reintroduced = {
      'text-transform-none': 'none',
      'text-transform-uppercase': 'uppercase',
      'text-transform-lowercase': 'lowercase',
      'text-transform-capitalize': 'capitalize'
    };

    // Utility class generators (neutrals, headings, body text) rely on canonical vars.
    const neutralScale = [0,25,50,75,100,150,200,250,300,350,400,450,500,550,600,650,700,750,800,850,900,925,950,975,1000];
    const headingMap = [
      ['xxl','var(--font-size-heading-xxl)','var(--font-weight-bold)','var(--font-line-height-tight)','var(--font-letter-spacing-tight)'],
      ['xl','var(--font-size-heading-xl)','var(--font-weight-semibold)','1.15','var(--font-letter-spacing-wide)'],
      ['l','var(--font-size-heading-l)','var(--font-weight-semibold)','1.2','var(--font-letter-spacing-wide)'],
      ['m','var(--font-size-heading-m)','var(--font-weight-semibold)','1.25','var(--font-letter-spacing-wide)'],
      ['s','var(--font-size-heading-s)','var(--font-weight-semibold)','1.3','var(--font-letter-spacing-wide)'],
      ['xs','var(--font-size-heading-xs)','var(--font-weight-semibold)','1.4','var(--font-letter-spacing-wide)']
    ];
    const bodyMap = [
      ['l','var(--font-size-body-l)','var(--font-line-height-relaxed)'],
      ['m','var(--font-size-body-m)','1.5'],
      ['s','var(--font-size-body-s)','1.4'],
      ['xs','var(--font-size-body-xs)','1.3']
    ];

  let css = `/* LEGACY (DEPRECATED) alias & utility layer (auto-generated)\n * DEPRECATION: Will be removed in v3.0.0. Use typography utilities (heading-*, body-*) or Tailwind plugin. */\n:root {\n`;
    Object.entries(aliasMap).forEach(([oldName,newName]) => {
      css += `  --${oldName}: var(--${newName});\n`;
    });
    Object.entries(reintroduced).forEach(([name,val]) => {
      css += `  --${name}: ${val};\n`;
    });
    css += `}\n\n/* Theme transition helper */\n.theme-transition,\n.theme-transition *,\n.theme-transition *::before,\n.theme-transition *::after {\n  transition: var(--transition-theme) !important;\n}\n@media (prefers-reduced-motion: reduce) {\n  .theme-transition, .theme-transition *, .theme-transition *::before, .theme-transition *::after {\n    transition: none !important;\n  }\n}\n\n/* Focus ring utility */\n.focus-ring:focus-visible {\n  outline: 2px solid var(--color-accent-primary);\n  outline-offset: 2px;\n  border-radius: 0.25rem;\n}\n\n/* Extended neutral utilities */\n`;
    neutralScale.forEach(n => {
      css += `.bg-neutral-${n} { background-color: var(--neutral-${n}); }\n`;
    });
    neutralScale.forEach(n => {
      css += `.text-neutral-${n} { color: var(--neutral-${n}); }\n`;
    });
    neutralScale.forEach(n => {
      css += `.border-neutral-${n} { border-color: var(--neutral-${n}); }\n`;
    });

    css += `\n/* Heading utilities */\n`;
    headingMap.forEach(([size,varSize,weight,lineHeight,ls]) => {
      css += `.text-heading-${size} {\n  font-family: var(--font-family-heading);\n  font-size: ${varSize};\n  font-weight: ${weight};\n  line-height: ${lineHeight};\n  text-transform: uppercase;\n  letter-spacing: ${ls};\n}\n`;
    });
    css += `.heading-normal-case { text-transform: none !important; letter-spacing: var(--font-letter-spacing-normal) !important; }\n`;

    css += `\n/* Body text utilities */\n`;
    bodyMap.forEach(([size,varSize,lineHeight]) => {
      const className = size === 'm' ? '.text-body, .text-body-m' : `.text-body-${size}`;
      css += `${className} {\n  font-family: var(--font-family-body);\n  font-size: ${varSize};\n  font-weight: var(--font-weight-normal);\n  line-height: ${lineHeight};\n}\n`;
    });
    css += `.text-body-xs, .text-caption { font-family: var(--font-family-body); font-size: var(--font-size-body-xs); font-weight: var(--font-weight-normal); line-height: 1.3; }\n`;

    css += `\n/* Text transform utilities */\n.text-uppercase { text-transform: uppercase; letter-spacing: var(--font-letter-spacing-wide); }\n.text-lowercase { text-transform: lowercase; }\n.text-capitalize { text-transform: capitalize; }\n.text-normal-case { text-transform: none; }\n`;

    return css;
  }
});

module.exports = {
  source: ["src/tokens/**/*.json"],
  platforms: {
    css: {
      transformGroup: "css",
      buildPath: "dist/css/",
      files: [
        {
          destination: "tokens.css",
          format: "css/m1st-variables",
          selector: ":root"
        },
        {
          destination: "legacy.css",
          format: "css/m1st-legacy-aliases"
        }
      ]
    },
    js: {
      transformGroup: "js",
      buildPath: "dist/js/",
      files: [
        {
          destination: "tokens.js",
          format: "javascript/module-flat"
        },
        {
          destination: "tokens.esm.js",
          format: "javascript/es6"
        }
      ]
    },
    json: {
      transformGroup: "js",
      buildPath: "dist/",
      files: [
        {
          destination: "tokens.json",
          format: "json/flat"
        }
      ]
    },
    typescript: {
      transformGroup: "js",
      buildPath: "dist/js/",
      files: [
        {
          destination: "tokens.d.ts",
          format: "typescript/es6-declarations"
        }
      ]
    }
  }
};
