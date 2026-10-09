## ADDED Requirements

### Requirement: MCP servers from the config
The bridge SHALL start the MCP servers listed in `~/.rebellm-bridge/mcp.json` (stdio
commands with env, HTTP and SSE URLs), list their tools under `server.tool` names and offer
them to the tab, refreshing on the server's list-changed notification.

#### Scenario: Figma Dev Mode
- **WHEN** the config names Figma's local server
- **THEN** the tab's agent gets `figma.*` tools and a call returns the server's result

### Requirement: Credentials stay in the bridge
API keys and OAuth tokens SHALL be held by the bridge only (config, environment, OS
keychain or an owner-only encrypted file) and never sent to the tab; a remote server that
requires OAuth SHALL be signed in through the user's browser with a loopback callback and
refreshed silently.

#### Scenario: Sign-in required
- **WHEN** a remote server answers 401 and the tab sends `sign_in`
- **THEN** the browser opens the provider's login, the bridge stores the tokens, and the server's state becomes running

### Requirement: Tool relay
The bridge SHALL execute `tool_exec` requests from the tab against the named server and
answer `tool_result` with the content and an error flag; results SHALL be plain data.

#### Scenario: Tool error
- **WHEN** a tool call fails on the server
- **THEN** the tab gets `tool_result` with `isError` and the message, and the chat continues
