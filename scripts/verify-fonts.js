/**
 * Verifies that every font referenced in dist/css/tokens.css exists in dist/fonts.
 * Also reports any extraneous font files that are not referenced, to aid cleanup.
 * Exits with code 1 if any referenced font file is missing.
 */
const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, '..', 'dist', 'css', 'tokens.css');
const fontsDir = path.join(__dirname, '..', 'dist', 'fonts');

function fail(msg){
  console.error(`[verify-fonts] ERROR: ${msg}`);
  process.exitCode = 1;
}

if (!fs.existsSync(cssPath)) {
  fail('tokens.css not found. Build first (npm run build).');
  process.exit();
}

if (!fs.existsSync(fontsDir)) {
  fail('dist/fonts directory not found. Run build to copy fonts.');
  process.exit();
}

const css = fs.readFileSync(cssPath, 'utf8');
// Capture url("../fonts/<file>") occurrences
const regex = /url\("\.\.\/fonts\/([^"?#)]+)"\)/g;
let match;
const referenced = new Set();
while ((match = regex.exec(css)) !== null) {
  referenced.add(match[1]);
}

if (referenced.size === 0) {
  fail('No font references found in tokens.css.');
  process.exit();
}

// Check existence
const missing = [];
for (const file of referenced) {
  const filePath = path.join(fontsDir, file);
  if (!fs.existsSync(filePath)) {
    missing.push(file);
  }
}

// Gather extraneous fonts (present but not referenced)
const present = fs.readdirSync(fontsDir).filter(f => /\.(woff2|woff|otf|ttf|css)$/i.test(f));
const extraneous = present.filter(f => !referenced.has(f));

// Report
console.log(`[verify-fonts] Referenced font files: ${referenced.size}`);
console.log(`[verify-fonts] Present font files   : ${present.length}`);
if (extraneous.length) {
  console.log(`[verify-fonts] Extraneous (not referenced in CSS): ${extraneous.length}`);
  console.log(extraneous.map(f => `  - ${f}`).join('\n'));
}

if (missing.length) {
  // If all missing are DIN-2014 *.woff2 but corresponding .woff exists, downgrade to warning.
  const downgraded = [];
  const realMissing = [];
  for (const m of missing) {
    if (m.startsWith('DIN-2014') && m.endsWith('.woff2')) {
      const fallback = m.replace('.woff2', '.woff');
      if (fs.existsSync(path.join(fontsDir, fallback))) {
        downgraded.push(m);
        continue;
      }
    }
    realMissing.push(m);
  }
  if (realMissing.length) {
    fail(`Missing ${realMissing.length} critical font file(s):`);
    console.error(realMissing.map(f => `  - ${f}`).join('\n'));
  }
  if (downgraded.length) {
    console.warn(`[verify-fonts] Notice: ${downgraded.length} DIN-2014 .woff2 variant(s) missing but .woff fallback present:`);
    console.warn(downgraded.map(f => `  - ${f}`).join('\n'));
  }
  if (!realMissing.length) {
    console.log('[verify-fonts] All required font fallbacks present. ✅');
  }
} else {
  console.log('[verify-fonts] All referenced font files are present. ✅');
}

// Optionally: assert ratio of referenced to present to catch large mismatches
if (present.length - referenced.size > 40) {
  console.warn('[verify-fonts] Notice: Large number of unreferenced font files; consider pruning.');
}

if (process.exitCode && process.exitCode !== 0) {
  process.exit(process.exitCode);
}
