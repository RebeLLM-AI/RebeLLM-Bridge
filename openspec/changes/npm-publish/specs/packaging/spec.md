## ADDED Requirements

### Requirement: Built on pack
Packing or publishing the package SHALL first remove `dist/` and rebuild it from `src/`.

#### Scenario: Stale dist
- **WHEN** `dist/` holds files from an older build and `npm pack` runs
- **THEN** the tarball holds only files built from the current source

### Requirement: Package contents
The tarball SHALL contain the built JavaScript under `dist/`, `README.md`, `LICENSE` and
`package.json`, with every `bin` target present and starting with `#!/usr/bin/env node`,
and SHALL contain no sources, tests, test helpers or type declarations.

#### Scenario: Both commands present
- **WHEN** the package is packed
- **THEN** `dist/cli.js` and `dist/launcher.js` are in it and both start with the node shebang

#### Scenario: Nothing extra
- **WHEN** the package is packed
- **THEN** no path in it is under `src/`, ends in `.test.js` or ends in `.d.ts`

#### Scenario: Packed CLI runs
- **WHEN** the packed `dist/cli.js` is run with `--version`
- **THEN** it prints the version from `package.json` and exits with code 0

### Requirement: Public registry
The package SHALL declare in `publishConfig` the registry `https://registry.npmjs.org/`
and `access: public`, so any publish goes to the public npm registry regardless of the
publishing machine's npm configuration.

#### Scenario: Company registry configured
- **WHEN** the machine's npm config sets another registry and the package is published
- **THEN** npm publishes to `https://registry.npmjs.org/` as a public package

### Requirement: Hooks only in a checkout
The `prepare` script SHALL set the repository's git hooks path only when run inside a git
checkout and SHALL succeed without doing anything elsewhere.

#### Scenario: Outside a checkout
- **WHEN** `prepare` runs in a directory without `.git`
- **THEN** it exits with code 0 and runs no git command

### Requirement: Releases from CI
A pushed `v*` tag SHALL publish the package from GitHub Actions with provenance, only
after `npm run check` passes and only when the tag equals `v` followed by the version in
`package.json`, using npm trusted publishing and no stored npm token.

#### Scenario: Tag matches
- **WHEN** tag `v0.2.0` is pushed, `package.json` says `0.2.0` and the checks pass
- **THEN** the workflow publishes `rebellm-bridge@0.2.0` with provenance

#### Scenario: Tag mismatch
- **WHEN** tag `v0.2.0` is pushed and `package.json` says `0.1.1`
- **THEN** the workflow fails before publishing
