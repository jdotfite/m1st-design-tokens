// Removes UTF-8 BOM (EF BB BF) from JSON / JS source files to avoid
// consumer build errors like: Unexpected token '\ufeff'
// Safe to run repeatedly; only rewrites files with a BOM.
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');

// Directories / files to scan
const TARGETS = [
  'package.json',
  'style-dictionary.config.js',
  'src/tokens'
];

let removed = 0;

function stripFile(filePath) {
  if (!fs.existsSync(filePath)) return;
  const stat = fs.statSync(filePath);
  if (!stat.isFile()) return;
  if (!/(\.json|\.js)$/i.test(filePath)) return; // limit scope
  const buf = fs.readFileSync(filePath);
  if (buf.length >= 3 && buf[0] === 0xEF && buf[1] === 0xBB && buf[2] === 0xBF) {
    fs.writeFileSync(filePath, buf.slice(3));
    removed++;
    console.log(`[strip-bom] Removed BOM: ${path.relative(ROOT, filePath)}`);
  }
}

function walk(dir) {
  if (!fs.existsSync(dir)) return;
  const entries = fs.readdirSync(dir);
  for (const e of entries) {
    const full = path.join(dir, e);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) walk(full); else stripFile(full);
  }
}

for (const target of TARGETS) {
  const full = path.join(ROOT, target);
  if (!fs.existsSync(full)) continue;
  const stat = fs.statSync(full);
  if (stat.isDirectory()) walk(full); else stripFile(full);
}

console.log(`[strip-bom] Complete. Files cleaned: ${removed}`);