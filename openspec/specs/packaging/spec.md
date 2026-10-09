# packaging Specification

## Purpose
TBD - created by archiving change anonymous-publisher. Update Purpose after archive.
## Requirements
### Requirement: Package names the RebeLLM authors and repository
`package.json` SHALL give "RebeLLM" as author and `github.com/RebeLLM-AI/RebeLLM-Bridge` as
repository and issue tracker, and the licence SHALL name the RebeLLM authors as licensor; no
company SHALL be named.

#### Scenario: Metadata
- **WHEN** the package metadata is read
- **THEN** the author is "RebeLLM" and the repository and bugs URLs are under `RebeLLM-AI/RebeLLM-Bridge`

