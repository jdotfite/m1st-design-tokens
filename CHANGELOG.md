# Changelog

All notable changes to this project will be documented in this file.

## [2.3.0] - 2025-08-29

## [2.3.1] - 2025-08-29

## [2.3.2] - 2025-08-29

## [2.3.3] - 2025-08-29

### Fixed
- Reverted light `page.*` tokens to semantic references; moved custom dark colors (`#02050e`, `#030712`, `#080c17`, `#10141e`) exclusively into dark theme overrides so light/dark differentiation works again.

### Notes
- No functional change for dark mode visual intent; restores proper light theme brightness.

### Changed
- `page.surface-elevated` light theme updated to `#10141e` (custom elevated surface).

### Notes
- Light/dark behavior explanation: Newly introduced custom page tokens override both themes because only base (light) layer was changed. Dark overrides remain; see README guidance to differentiate if needed.

### Changed
- Page theming: Added `--page-main-nav-background` token; updated light & dark `--page-background` (now #030712) and `--page-surface` (now #080c17) for higher contrast dark layout.

### Notes
- Pure token value changes; rebuild required for consumers.

### Added
- Generated typography utility layer (no global h1–h6): classes `.heading-xxl` … `.heading-xs`, semantic aliases `.display`, `.headline`, `.title`, `.body`, `.label`, body scale `.body-l|m|s|xs`, modifiers `.is-caps` / `.is-normal-case`.
- Tailwind integration exports: `m1st-design-tokens/integrations/tailwind` (theme extension) and `m1st-design-tokens/integrations/tailwind-plugin` (utilities plugin).
- Build script `generate-typography` producing CSS + Tailwind artifacts from single `build-data/typography-map.json` source.

### Deprecated
- `legacy.css` marked deprecated (banner added). Removal planned for v3.0.0. Migrate to new utilities / Tailwind plugin.

### Changed
- Replaced manual `src/typography.css` + copy step with generated utilities (no direct element selector styling). Uppercase now opt-in.

### Notes
- No token value changes. Purely additive utilities + restructuring.

## [2.2.1] - 2025-08-29

### Fixed
- `typography.css`: Adjusted `h4` size mapping from `--font-size-heading-m` to `--font-size-heading-xs` (1rem) for improved visual hierarchy. No token values changed.

## [2.1.0] - 2025-08-28

### Added
- `legacy.css` export providing backward-compatible variable aliases & utility classes (`@import "m1st-design-tokens/legacy";`).
- Explicit `./legacy` path added to package `exports` map.

### Tooling
- Added legacy smoke test (`npm run test:legacy`) ensuring aliases/utilities exist.
- Font verification retained to guarantee all referenced font assets ship.
- `prepare` script ensures git-based installs build tokens automatically.

### Notes
- No token value changes; additive compatibility & tooling only.

## [2.0.0] - 2025-08-28

## [2.2.0] - 2025-08-29

### Added
- Optional `typography.css` export (`@import "m1st-design-tokens/typography";`) mapping h1–h6 + .heading to token scale with uppercase.


### Breaking
- Renamed package from `@members1stfederalcreditunion/design-tokens` to `m1st-design-tokens` (scope removed). All import paths must update, e.g. `@import "m1st-design-tokens/css";` and `import tokens from "m1st-design-tokens"`.

### Notes
- No token value changes; this release is purely a distribution / naming change.
- Old scoped package will no longer receive updates after this version.
 - Added optional `legacy.css` (post-release patch) providing backwards compatible variable aliases & utility classes.
   - Import via: `@import "m1st-design-tokens/legacy";` (after updating package to commit including export)
   - Contents: legacy variable name aliases (e.g. `--font-heading-xl-size`), text transform tokens, extended neutral utility classes, heading/body text utilities, theme transition helpers.

## [1.3.1] - 2025-08-28

### Fixed
- Removed potential UTF-8 BOM from published files (added `strip-bom` prepublish step) to prevent JSON parse errors in consuming build tools.

## [1.2.2] - 2024-08-28

## [1.3.0] - 2025-08-28

### Optimized
- Removed duplicate root `fonts/` directory from published package; consumers now use `dist/fonts/` exclusively.
- Updated exports so `import "@members1stfederalcreditunion/design-tokens/fonts/inter.css"` resolves to `dist/fonts/inter.css`.

### Notes
- No token value changes.
- Version bump signifies potential path change for any consumer who was reading fonts directly from root `fonts/` (deprecated path).


### Fixed
- **Font Distribution Reliability**: Ensured all font assets are copied into `dist/fonts/` so relative `../fonts/` URLs in `dist/css/tokens.css` always resolve after installation.

### Added
- Post-build script (`scripts/copy-fonts.js`) that copies 88 font assets into the build output.
- Verification step (`npm pack --dry-run`) now shows `dist/fonts/` contents bundled in the package.

### Technical Details
- Added `postbuild` npm script invoking copy routine.
- Prevents runtime 404s when consumers rely solely on the CSS entrypoint.
- No token value changes; purely packaging enhancement.

## [1.2.1] - 2024-08-28

### Fixed
- **CRITICAL: Font Path Resolution**: Fixed relative font URLs in generated CSS
  - Font URLs now use proper `../fonts/` paths for package consumption
  - Resolves 404 errors when consuming package in other projects
  - Ensures fonts load correctly in all build environments

### Added
- Package consumption troubleshooting guide
- Better package exports including `package.json` access
- CHANGELOG.md now included in distributed files

### Technical Details
- Updated Style Dictionary config to automatically prefix font URLs
- Improved package structure for better consumption compatibility

## [1.2.0] - 2024-08-28

### Added
- **Font Integration**: Complete font system integration with 88+ font files
  - Inter font family (variable + static fonts, including InterDisplay)
  - DIN-2014 font family (complete professional collection)
  - @font-face declarations automatically included in generated CSS
  - Font files distributed in package under `fonts/` directory
  - Package exports for individual font CSS files
  - Font migration guide and documentation

### Changed
- **CSS Output**: Main `tokens.css` now includes embedded @font-face declarations
- **Package Structure**: Added `fonts/` directory to distributed files
- **Build Process**: Enhanced Style Dictionary config to include font CSS integration

### Technical Details
- All fonts use `font-display: swap` for optimal loading performance
- Progressive enhancement with system font fallbacks
- Variable fonts supported where available
- Font loading strategy optimized for web performance

## [1.1.0] - 2024-12-14

### Added
- Button token aliases for backward compatibility:
  - Added `--button-*-bg` aliases for all `--button-*-background` tokens
  - Added `--button-*-bg-hover` aliases for all `--button-*-background-hover` tokens  
  - Added `--button-*-bg-active` aliases for all `--button-*-background-active` tokens
  - Covers all button variants: primary, secondary, ghost, danger, info, success, warning

### Technical Details
- All original token names remain unchanged for full backward compatibility
- Aliases reference the same token values, ensuring consistency
- Generated CSS now includes both naming conventions for consuming projects

## [1.0.0] - 2024-12-14

### Added
- Complete M1st design token system with 4-layer architecture
- Foundation tokens: brand colors, spacing, typography, shadows
- Semantic color tokens with 25-step neutral scale
- Page-level tokens for theme switching interface
- Component tokens for buttons with all variants
- Light/dark theme support with automatic switching
- Style Dictionary build process with custom M1st formatter
- NPM package exports for CSS, JavaScript, JSON, and TypeScript
- Complete rebuild from original.css source
