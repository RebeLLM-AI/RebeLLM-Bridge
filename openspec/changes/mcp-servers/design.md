## Context

`bridge-service` gives the process, the tab link and the token. The MCP TypeScript SDK
provides clients for stdio and Streamable HTTP/SSE transports and the OAuth client flow
(`auth.ts` in the SDK: discovery, PKCE, dynamic client registration, refresh).

## Decisions

**Config.** `~/.rebellm-bridge/mcp.json`: `{ "mcpServers": { "figma": { "url":
"http://127.0.0.1:3845/mcp" }, "github": { "url": "https://api.githubcopilot.com/mcp/" },
"fs": { "command": "npx", "args": ["-y", "@modelcontextprotocol/server-filesystem", "."],
"env": { "TOKEN": "${MY_TOKEN}" } } } }`; `${VAR}` expands from the bridge's environment.
`rebellm-bridge mcp add|remove|list` edits it.

**Clients.** One MCP client per server, started lazily on the first `tools` request or at
start with `--eager`; tool list refreshed on `notifications/tools/list_changed`. Tool names
are namespaced `figma.get_code` for the tab; descriptions and JSON schemas pass through.

**Protocol v1.1** (additive): bridge → tab `{ t: 'tools', tools: [{ name, description,
parameters, server }] }` on connect and on change; tab → bridge `{ t: 'tool_exec', id, name,
arguments }`; bridge → tab `{ t: 'tool_result', id, content, isError }` (text content
joined; images as `data:` URLs); bridge → tab `{ t: 'servers', servers: [{ name, state:
'running'|'needs_sign_in'|'failed'|'starting', tools, error? }] }`; tab → bridge `{ t:
'sign_in', server }`. `hello` from a v1 tab keeps working: no `tools` sent.

**Auth.** Three cases: (1) stdio servers get their env from the config; (2) HTTP servers
with a static header from `headers` in the config; (3) HTTP servers answering 401 with
OAuth metadata: the bridge runs the SDK's OAuth client with a loopback redirect
(`http://127.0.0.1:<port>/oauth/callback`, port chosen at start), opens the authorization
URL in the default browser (`open`/`xdg-open`/`start`), and stores tokens through
`keytar`-style OS keychain access when available, else in `~/.rebellm-bridge/auth.json`
encrypted with a key kept in the keychain or, failing that, owner-only permissions and a
warning. Refresh is automatic; a failed refresh flips the server to `needs_sign_in`.

**Safety.** Tool results are data: the tab marks them untrusted like fetched pages. A
server's tools can be disabled in the config (`"disabled": true`) or filtered
(`"allow": ["get_*"]`).

**Tests.** A fake stdio MCP server (the SDK's in-memory transport) with two tools; a fake
OAuth provider in Node (metadata, authorize that redirects at once, token endpoint) for
the sign-in and refresh paths; config expansion; namespacing; protocol round trips.

## Risks

- Every MCP server the user adds runs with the bridge's permissions; the README says so.
- Keychain libraries need native builds; the encrypted-file fallback keeps installs simple.
