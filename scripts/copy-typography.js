const fs = require('fs');
const path = require('path');

const src = path.join(process.cwd(), 'src', 'typography.css');
const destDir = path.join(process.cwd(), 'dist', 'css');
const dest = path.join(destDir, 'typography.css');

try {
  if (fs.existsSync(src)) {
    fs.mkdirSync(destDir, { recursive: true });
    fs.copyFileSync(src, dest);
    console.log('[copy-typography] copied typography.css');
  } else {
    console.warn('[copy-typography] source typography.css missing');
  }
} catch (e) {
  console.error('[copy-typography] failed:', e.message);
  process.exitCode = 1;
}
