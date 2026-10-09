## 1. Clients

- [ ] 1.1 `mcp.json` loading with `${VAR}` expansion, `mcp add|remove|list`; tests
- [ ] 1.2 MCP clients (stdio, Streamable HTTP, SSE), lazy start, tool listing with namespaces, `list_changed`; tests with the in-memory transport
- [ ] 1.3 Protocol v1.1: `tools`, `tool_exec`/`tool_result`, `servers`, `sign_in`; a v1 tab still works; tests

## 2. Auth

- [ ] 2.1 Static headers and env; OAuth client with loopback callback, browser open, keychain or encrypted file, silent refresh, `needs_sign_in` on failure; tests with a fake provider

## 3. Docs and verify

- [ ] 3.1 README "MCP servers" (config, Figma and GitHub examples, auth, what the tab sees); `npm run check`; a manual run with Figma's Dev Mode server recorded
