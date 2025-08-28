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
