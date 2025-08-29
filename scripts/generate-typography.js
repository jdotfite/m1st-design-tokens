const fs = require('fs');
const path = require('path');

const mapPath = path.join(process.cwd(), 'build-data', 'typography-map.json');
const distCssDir = path.join(process.cwd(), 'dist', 'css');
const distIntegrationsDir = path.join(process.cwd(), 'dist', 'integrations');

function build() {
  if(!fs.existsSync(mapPath)) {
    console.error('[generate-typography] Missing typography map at', mapPath);
    process.exit(1);
  }
  const map = JSON.parse(fs.readFileSync(mapPath,'utf8'));
  fs.mkdirSync(distCssDir, { recursive: true });
  fs.mkdirSync(distIntegrationsDir, { recursive: true });

  const now = new Date().toISOString();

  let css = `/* ============================================================================\n   TYPOGRAPHY UTILITIES (generated)\n   Source: build-data/typography-map.json\n   Generated: ${now}\n   Avoids styling raw h1–h6.\n   Import after tokens: @import \"m1st-design-tokens/css\"; @import \"m1st-design-tokens/typography\";\n   ============================================================================ */\n`;
  css += `\n/* Heading scale utilities */\n`;
  Object.entries(map.heading).forEach(([k, def]) => {
    css += `.heading-${k} {\n  font-family: var(--font-family-heading);\n  font-size: var(${def.sizeVar});\n  font-weight: ${def.weight};\n  line-height: ${def.lineHeight};\n  letter-spacing: ${def.letterSpacing};\n}\n`;
  });
  css += `\n/* Semantic aliases */\n`;
  Object.entries(map.semantics).forEach(([semantic, ref]) => {
    const def = map.heading[ref];
    css += `.${semantic} {\n  font-family: var(--font-family-heading);\n  font-size: var(${def.sizeVar});\n  font-weight: ${def.weight};\n  line-height: ${def.lineHeight};\n  letter-spacing: ${def.letterSpacing};\n}\n`;
  });
  css += `\n/* Body scale utilities */\n`;
  Object.entries(map.body).forEach(([k, def]) => {
    css += `.body-${k} {\n  font-family: var(--font-family-body);\n  font-size: var(${def.sizeVar});\n  font-weight: var(--font-weight-normal);\n  line-height: ${def.lineHeight};\n}\n`;
  });
  css += `\n/* Modifiers */\n.is-caps { text-transform: uppercase; letter-spacing: var(--font-letter-spacing-wide); }\n.is-normal-case { text-transform: none; letter-spacing: var(--font-letter-spacing-normal); }\n`;
  const cssOut = path.join(distCssDir, 'typography.css');
  fs.writeFileSync(cssOut, css);
  console.log('[generate-typography] Wrote', cssOut);

  const tailwindTheme = {"theme":{"extend":{"fontSize":{}}}};
  Object.entries(map.heading).forEach(([k,d]) => { tailwindTheme.theme.extend.fontSize[`heading-${k}`] = `var(${d.sizeVar})`; });
  Object.entries(map.body).forEach(([k,d]) => { tailwindTheme.theme.extend.fontSize[`body-${k}`] = `var(${d.sizeVar})`; });
  fs.writeFileSync(path.join(distIntegrationsDir,'tailwind.cjs'),'module.exports = '+JSON.stringify(tailwindTheme,null,2)+'\n');
  console.log('[generate-typography] Wrote dist/integrations/tailwind.cjs');

  let pluginSrc = `/** Generated ${now} */\nmodule.exports = function({ addUtilities }) {\n  const utilities = {\n`;
  Object.entries(map.heading).forEach(([k, def]) => {
    pluginSrc += `    '.heading-${k}': { fontFamily: 'var(--font-family-heading)', fontSize: 'var(${def.sizeVar})', fontWeight: '${def.weight}', lineHeight: '${def.lineHeight}', letterSpacing: '${def.letterSpacing}' },\n`;
  });
  Object.entries(map.semantics).forEach(([semantic, ref]) => {
    const def = map.heading[ref];
    pluginSrc += `    '.${semantic}': { fontFamily: 'var(--font-family-heading)', fontSize: 'var(${def.sizeVar})', fontWeight: '${def.weight}', lineHeight: '${def.lineHeight}', letterSpacing: '${def.letterSpacing}' },\n`;
  });
  Object.entries(map.body).forEach(([k, def]) => {
    pluginSrc += `    '.body-${k}': { fontFamily: 'var(--font-family-body)', fontSize: 'var(${def.sizeVar})', fontWeight: 'var(--font-weight-normal)', lineHeight: '${def.lineHeight}' },\n`;
  });
  pluginSrc += `    '.is-caps': { textTransform: 'uppercase', letterSpacing: 'var(--font-letter-spacing-wide)' },\n    '.is-normal-case': { textTransform: 'none', letterSpacing: 'var(--font-letter-spacing-normal)' }\n  };\n  addUtilities(utilities);\n};\n`;
  fs.writeFileSync(path.join(distIntegrationsDir,'tailwind-plugin.cjs'), pluginSrc);
  console.log('[generate-typography] Wrote dist/integrations/tailwind-plugin.cjs');
}

build();
