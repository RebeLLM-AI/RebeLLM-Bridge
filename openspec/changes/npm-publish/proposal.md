## Why

The README tells users to run `npx rebellm-bridge` and `rebellm-claude`, but the package
is not on npm, so every install line fails. Publishing makes the one-command setup real.
Packing today also ships whatever stale `dist/` is on disk, because nothing builds before
`npm pack` or `npm publish`.

## What Changes

- The package builds itself before packing (`prepack`: clean `dist/`, then `tsc`), so a
  tarball always matches the source.
- `prepare` only sets the git hooks inside a git checkout and does nothing elsewhere.
- Package metadata for npm: `repository`, `homepage`, `bugs`, `keywords`, `author`; no
  type declarations in the tarball, since the package is a CLI, not a library.
- `publishConfig` pins publishing to the public npm registry with public access, whatever
  registry the publishing machine is configured for.
- A test that packs the package and checks its contents: both bins present, shebangs
  intact, no tests, sources or `.d.ts`, and the packed CLI prints its version.
- A GitHub Actions workflow that publishes on a `v*` tag with npm trusted publishing
  (OIDC, provenance), after `npm run check` passes. The first release is published by
  hand, since trusted publishing is configured on an existing package.
- README: install lines use `npx -y rebellm-bridge` and `npx -y -p rebellm-bridge
  rebellm-claude`, plus `npm install -g rebellm-bridge`; a "Releasing" section.

## Capabilities

### New Capabilities

- `packaging`: what the npm package contains, how it is built, and how releases are
  published.

### Modified Capabilities

(none)

## Impact

- Changed: `package.json` (scripts, metadata), `tsconfig.build.json`, `README.md`.
- New: `scripts/clean.mjs`, `src/package.test.ts`, `.github/workflows/publish.yml`.
- Outward-facing: publishing to npm is public and effectively permanent. The maintainer
  runs the first `npm publish`, not an agent.
- Ordering: publish after `anthropic-messages` is applied, so 0.1.0 ships
  `rebellm-claude`.
