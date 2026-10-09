## Why

The RebeLLM agent has file tools and a web fetch, nothing else. The tools people already
use through MCP (Figma's Dev Mode server, GitHub, databases, filesystems) live on the
user's machine or need credentials the browser must never hold. The bridge is the one
place that can run MCP clients and keep secrets.

## What Changes

- The bridge reads MCP servers from `~/.rebellm-bridge/mcp.json` (the Claude Code shape:
  stdio commands with args and env, and HTTP/SSE URLs), starts them, lists their tools and
  offers them to the tab as bridge tools (protocol v1.1: `tools` from the bridge, `tool_exec`
  from the tab, `tool_result` back).
- Credentials stay with the bridge: environment variables and config for API keys; the MCP
  OAuth flow for remote servers (the provider's login page opened in the user's browser, the
  callback on loopback, tokens in the OS keychain when available, else an owner-only
  encrypted file, refreshed silently).
- Status for the app: `servers` messages name each server, its state (running, needs
  sign-in, failed) and tool count; a `sign_in` request from the tab starts the OAuth flow
  for that server.

## Capabilities

### New Capabilities

- `mcp-servers`: MCP clients in the bridge and their tools for the tab.

### Modified Capabilities

- `bridge-service`: protocol v1.1 messages.

## Impact

- `src/mcp-clients.ts`, `src/auth.ts`, `src/protocol.ts` (v1.1), tests with a fake stdio
  server and a fake OAuth provider; README section "MCP servers". Depends on
  `bridge-service` and on the app's `bridge-mcp` change.
