## ADDED Requirements

### Requirement: Protocol v1.1 additions
The tab protocol SHALL accept a v1 tab unchanged and offer v1.1 tabs the messages `tools`,
`tool_exec`, `tool_result`, `servers` and `sign_in`.

#### Scenario: Old tab
- **WHEN** a tab says `hello` with `v: 1`
- **THEN** the bridge serves chats as before and sends no `tools`
