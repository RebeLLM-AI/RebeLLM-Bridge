## Context

`package.json` already has `bin` for `rebellm-bridge` and `rebellm-claude`, `files:
["dist", "README.md", "LICENSE"]`, `engines.node >= 22` and the runtime dependencies `ws`,
`zod`, `@modelcontextprotocol/sdk` and `cross-spawn`. `npm pack --dry-run` today packs a
`dist/` left over from an earlier build: `launcher.js` is missing though `bin` names it,
and `.d.ts` files are included. The repo is `github.com/RebeLLM-AI/RebeLLM-Bridge`; the
npm name `rebellm-bridge` is unclaimed.

## Goals / Non-Goals

**Goals:**
- A tarball that is always built from the committed source and contains only what runs.
- Install lines in the README that work as written.
- Releases from CI with provenance, so users can check a release was built from this repo.

**Non-Goals:**
- A bundled single-file build; plain `tsc` output is small enough.
- Publishing a library API or type declarations.
- A changelog generator or automatic version bumps.

## Decisions

**`prepack` builds from clean.** `prepack` runs `node scripts/clean.mjs && npm run build`.
It runs before both `npm pack` and `npm publish`, so a stale `dist/` can never ship.
Alternative: `prepublishOnly`. Rejected because it does not run for `npm pack`, which the
package test and manual checks use.

**`prepare` guarded.** `prepare` sets `core.hooksPath` only when `.git` exists. npm runs
`prepare` for git-URL installs and before publish, where a bare `git config` would fail
or touch the wrong repository.

**No declarations.** `declaration: false` in `tsconfig.build.json`. The package is two
CLIs; `.d.ts` files add weight and imply an API we do not promise.

**`publishConfig`.** `{ "registry": "https://registry.npmjs.org/", "access": "public" }`.
A machine with a company registry in its npm config would otherwise publish there. Access
lives here so a manual publish behaves like CI. Provenance stays a workflow flag: a local
publish cannot produce it and would fail if `publishConfig` required it.

**Package test.** `src/package.test.ts` runs `npm pack --json --dry-run` for the file list
and asserts both bin targets are in it, their sources start with `#!/usr/bin/env node`,
and nothing under `src/`, `*.test.*` or `*.d.ts` is included. A second test does a real
`npm pack` into a temp dir, extracts it and runs the packed `dist/cli.js --version` with
`NODE_PATH` at the repo's `node_modules`. Packing rebuilds, which is slow, so both run
only with `PACK_TEST=1`; CI sets it.

**Trusted publishing.** `.github/workflows/publish.yml` on `push: tags: ['v*']`: checkout,
Node 22, `npm ci`, `npm run check` with `PACK_TEST=1`, check the tag equals `v` +
`package.json` version, `npm publish --provenance` (registry and access from `publishConfig`), with
`permissions: id-token: write`. No npm token is stored in the repo or its secrets.
Alternative: an `NPM_TOKEN` secret. Rejected as a long-lived credential.

**First release by hand.** Trusted publishing is configured on an existing package, so
the maintainer runs the first `npm publish` locally (with 2FA), then adds the workflow as
the trusted publisher on npmjs.com. Later releases: bump version, commit, tag, push.

**`npx` lines.** `npx -y rebellm-bridge` (the bin matches the package name) and
`npx -y -p rebellm-bridge rebellm-claude` (the second bin needs `-p`). `-y` skips the
install prompt, which would hang `claude mcp add` since the MCP server has no terminal.
`npm install -g rebellm-bridge` is listed for daily use, since `npx` checks the registry
on each start.

## Risks / Trade-offs

- [A publish is public and cannot be fully taken back; npm allows unpublish only within
  72 h and never reuse of the version] → CI publishes only after `npm run check` and the
  tag/version check; the first publish is a deliberate manual step.
- [Someone takes the name before the first publish] → Publish 0.1.0 soon after
  `anthropic-messages` is done.
- [`npx` picks up the latest version on each start, so a bad release reaches users at
  once] → `npm deprecate` the bad version and publish a fix; README shows how to pin
  (`npx -y rebellm-bridge@0.1.0`).

## Open Questions

- The npm account or org that owns the package (personal account or an org).
  This decides who can publish and where trusted publishing is configured.
