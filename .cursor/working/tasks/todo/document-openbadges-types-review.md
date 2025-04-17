# Task: Document OpenBadges Types Codebase Review

**Goal:** Capture the review findings and prepare a breakdown of improvements for the OpenBadges Types repository.

## Findings

- **OB3 schema validation** currently uses `ob3-context.json` (JSON‑LD context) instead of a formal JSON Schema.
- **Missing context enforcement**: guards do not verify required JSON‑LD contexts (`VCContext`, `OB3Context`).
- **Incomplete v3 type guards**: do not validate IRI/DateTime formats or deeply nested properties.
- **Missing OB3 spec fields**: interfaces lack `credentialSchema`, `display`, endorsement models, etc.
- **Sparse test coverage**: nested OB3 types (`Proof`, `Evidence`, `TermsOfUse`, etc.) are untested.
- **Documentation gaps**: mapping table and protocol‑compliance docs are incomplete or out‑of‑sync.

## Initial Subtasks

- [ ] Document OB3 schema validation gap and propose using an official JSON Schema.
- [ ] Document missing JSON‑LD context enforcement in v3 guards.
- [ ] Document incomplete v3 type guards and list improvements (IRI, DateTime, context checks).
- [ ] Document missing OB3 specification fields and identify which to add.
- [ ] Document test coverage gaps and specify tests to add for nested types.
- [ ] Document documentation / mapping table gaps and outline updates needed.
- [ ] Plan next steps: break each finding into detailed feature branches with estimations.

_Once the above is captured, we can decompose each bullet into granular tasks._
