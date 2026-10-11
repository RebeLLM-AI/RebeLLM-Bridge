# packaging Specification

## Purpose
TBD - created by archiving change anonymous-publisher. Update Purpose after archive.
## Requirements
### Requirement: Package names the RebeLLM authors and repository
`package.json` SHALL give "RebeLLM" as author and `github.com/RebeLLM-AI/RebeLLM-Bridge` as
repository and issue tracker, and `PolyForm-Noncommercial-1.0.0` as licence; `LICENSE` SHALL
be the PolyForm Noncommercial 1.0.0 text with a required notice naming the RebeLLM authors as
copyright holder; no company SHALL be named.

#### Scenario: Metadata
- **WHEN** the package metadata is read
- **THEN** the author is "RebeLLM", the repository and bugs URLs are under `RebeLLM-AI/RebeLLM-Bridge`, and the licence is `PolyForm-Noncommercial-1.0.0`

