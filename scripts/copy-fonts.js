const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '..', 'fonts');
const destDir = path.join(__dirname, '..', 'dist', 'fonts');

if (!fs.existsSync(srcDir)) {
  console.warn('[copy-fonts] Source fonts directory missing, skipping.');
  process.exit(0);
}

fs.mkdirSync(destDir, { recursive: true });

const entries = fs.readdirSync(srcDir);
let copied = 0;
for (const entry of entries) {
  const ext = path.extname(entry).toLowerCase();
  if (!['.woff2', '.woff', '.otf', '.css'].includes(ext)) continue;
  fs.copyFileSync(path.join(srcDir, entry), path.join(destDir, entry));
  copied++;
}
console.log(`[copy-fonts] Copied ${copied} font assets to dist/fonts`);
