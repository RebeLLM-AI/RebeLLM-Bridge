## 1. Build and contents

- [ ] 1.1 `scripts/clean.mjs` and `prepack` (clean, then build); `declaration: false` in `tsconfig.build.json`
- [ ] 1.2 Guarded `prepare` that sets hooks only inside a git checkout; test
- [ ] 1.3 `package.json` metadata: `repository`, `homepage`, `bugs`, `keywords`, `author`; `publishConfig` with the public registry and `access: public`; package test asserts both
- [ ] 1.4 `src/package.test.ts` behind `PACK_TEST=1`: dry-run file list (bins, shebangs, no sources, tests or `.d.ts`); real pack and `--version` run

## 2. Release

- [ ] 2.1 `.github/workflows/publish.yml`: `v*` tags, `npm ci`, `npm run check` with `PACK_TEST=1`, tag/version check, `npm publish --provenance`, `id-token: write`
- [ ] 2.2 README: install lines (`npx -y rebellm-bridge`, `npx -y -p rebellm-bridge rebellm-claude`, `npm install -g`, pinning), `claude mcp add` with `npx -y`, and a "Releasing" section (first publish by hand, trusted publisher setup, tag flow)

## 3. Verify

- [ ] 3.1 `npm run check` and `PACK_TEST=1 npm test` pass; `npm pack` output reviewed
- [ ] 3.2 Maintainer publishes 0.1.0 by hand and sets up the trusted publisher (not done by the agent)
