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

  // Tailwind-first approach: provide a stub CSS file for backwards import compatibility only.
  const stub = `/* Typography utilities removed in v3.0.0 (Tailwind-first).\n * This stub remains so existing @import \"m1st-design-tokens/typography\" does not error.\n * Use Tailwind classes instead: text-display, text-headline, text-title, text-body, text-label or text-heading-xxl..xs. */\n`;
  const cssOut = path.join(distCssDir, 'typography.css');
  fs.writeFileSync(cssOut, stub);
  console.log('[generate-typography] Wrote stub', cssOut);

  const tailwindTheme = {"theme":{"extend":{"fontSize":{},"letterSpacing":{}}}};
  // Map heading scale under fontSize keys prefixed heading-*
  Object.entries(map.heading).forEach(([k,d]) => { tailwindTheme.theme.extend.fontSize[`heading-${k}`] = `var(${d.sizeVar})`; });
  // Semantic aliases
  Object.entries(map.semantics).forEach(([semantic, ref]) => {
    const def = map.heading[ref];
    tailwindTheme.theme.extend.fontSize[semantic] = `var(${def.sizeVar})`;
  });
  // Body scale to semantic keys body-l etc.
  Object.entries(map.body).forEach(([k,d]) => { tailwindTheme.theme.extend.fontSize[`body-${k}`] = `var(${d.sizeVar})`; });
  // Letter spacing tokens
  tailwindTheme.theme.extend.letterSpacing = {
    tight: 'var(--font-letter-spacing-tight)',
    normal: 'var(--font-letter-spacing-normal)',
    wide: 'var(--font-letter-spacing-wide)'
  };
  fs.writeFileSync(path.join(distIntegrationsDir,'tailwind.cjs'),'module.exports = '+JSON.stringify(tailwindTheme,null,2)+'\n');
  console.log('[generate-typography] Wrote dist/integrations/tailwind.cjs');

  // Deprecated plugin (kept to avoid breaking import paths) outputs no utilities.
  const pluginDeprecated = `/** Deprecated in v3.0.0: typography utilities now rely on Tailwind fontSize + letterSpacing extensions. */\nmodule.exports = function(){ /* no-op */ };\n`;
  fs.writeFileSync(path.join(distIntegrationsDir,'tailwind-plugin.cjs'), pluginDeprecated);
  console.log('[generate-typography] Wrote deprecated no-op tailwind-plugin.cjs');
}

build();
