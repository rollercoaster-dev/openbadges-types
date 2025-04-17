# Task: OB3 Schema Validation Improvement

**Goal:** Replace JSON‑LD context–based validation with a formal JSON Schema for OB 3.0 Verifiable Credentials.

## Summary of Gap

- Current validation (`src/validateWithSchema.ts`) compiles `schemas/ob3-context.json` (JSON‑LD context) via AJV instead of a proper JSON Schema.
- This allows unexpected or improperly structured credentials to pass.

## Subtasks

- [ ] Research and fetch the W3C Verifiable Credentials Data Model JSON Schema and OB 3.0 extension requirements (1h 30m)
- [ ] Clone the W3C VC Data Model repo and locate `jsonschema/credential.json` (15m)
- [ ] Import the VC JSON Schema into `schemas/vc-credential-schema.json` via `curl` (15m)
- [ ] Draft `schemas/ob3-schema.json` merging the VC schema and OB3-specific constraints using `allOf` and local `$ref` (1h)
- [ ] Update `src/validateWithSchema.ts`:
  - Import and compile `ob3-schema.json` with AJV
  - Remove or deprecate old `OB3_CONTEXT` compilation
    (1h)
- [ ] Refactor `test/ob3-schema-validation.test.ts` to:
  - Ensure extra/unexpected fields are rejected if spec disallows
  - Cover nested types: `proof`, `evidence`, `termsOfUse`, arrays vs single items
    (2h)
- [ ] Run full test suite and verify coverage; update or add tests as needed (1h)
- [x] Update `docs/protocol-compliance.md` to document the new JSON Schema–based validation (30m)
- [ ] Draft complete `Evidence` schema definition in `schemas/ob3-schema.json` matching OB 3.0 spec fields (1h)
- [ ] Draft complete `TermsOfUse` schema definition in `schemas/ob3-schema.json` matching OB 3.0 spec fields (1h)
- [ ] Augment `test/ob3-schema-validation.test.ts` with test cases for `Evidence` and `TermsOfUse` (1h)
- [ ] Create a PR, gather feedback, and merge changes (30m)

**Total Estimated Time:** ~11h

---

_Next:_ Once this plan is agreed, we can begin the research step.\*
