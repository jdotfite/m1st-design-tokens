// Simple runtime smoke test verifying that legacy.css includes expected aliases and utilities.
const fs = require('fs');
const path = require('path');

const legacyPath = path.join(__dirname, '..', 'dist', 'css', 'legacy.css');
const tokensPath = path.join(__dirname, '..', 'dist', 'css', 'tokens.css');

function fail(msg){
  console.error('\u274c  ' + msg);
  process.exitCode = 1;
}

if(!fs.existsSync(legacyPath)) fail('legacy.css not found. Run build first.');
if(!fs.existsSync(tokensPath)) fail('tokens.css not found. Run build first.');

if(process.exitCode) process.exit(process.exitCode);

const legacy = fs.readFileSync(legacyPath,'utf8');

// Expectations: a handful of alias lines and classes
const requiredSnippets = [
  '--font-heading-xxl-size: var(--font-size-heading-xxl);',
  '.bg-neutral-1000 { background-color: var(--neutral-1000); }',
  '.text-heading-xl {',
  '.text-body, .text-body-m {',
  '.text-uppercase { text-transform: uppercase;',
  '--text-transform-uppercase: uppercase;'
];

const missing = requiredSnippets.filter(s => !legacy.includes(s));
if(missing.length){
  fail('Missing expected legacy alias/utility snippets:\n' + missing.map(m=>'  - '+m).join('\n'));
} else {
  console.log('\u2705  Legacy CSS contains expected alias & utility snippets.');
}

// Quick count: ensure at least N neutral bg utilities present
const bgNeutralCount = (legacy.match(/\.bg-neutral-/g)||[]).length;
if(bgNeutralCount < 20) fail('Expected many bg-neutral-* utilities, found ' + bgNeutralCount);
else console.log('\u2705  Found ' + bgNeutralCount + ' bg-neutral-* utilities.');

// Ensure dark theme variables still resolvable via main tokens by sampling one variable used by alias
const tokens = fs.readFileSync(tokensPath,'utf8');
if(!tokens.includes('--font-size-heading-xl:')) fail('Base tokens missing font-size-heading-xl variable.');
else console.log('\u2705  Base tokens expose canonical font size variables.');

if(process.exitCode) process.exit(process.exitCode);
