# OpenBadges Type Conformance

## 1. Goal
- **Objective:** Ensure all TypeScript types in the package are 100% accurate and conformant with Open Badges 2.0 and 3.0 specifications, serving as the source of truth for the app.
- **Energy Level:** Medium 🔋
- **Status:** 🟡 In Progress

## 2. Resources
- **Existing Tools/Files:**
  - Current TypeScript type definitions
  - OB 2.0 and OB 3.0 official specs (JSON-LD context, documentation)
  - Zod (or similar) for runtime validation
  - Jest (or similar) for testing
- **Additional Needs:**
  - Official badge examples (valid/invalid)
  - JSON Schema or SHACL if available
- **Related Files:**
  - All type definition files
  - Validation utilities
  - Test files

## 3. Ideas & Challenges
- **Approaches:**
  - Automated type generation from spec
  - Manual field-by-field review
  - Mapping table for transparency
- **Potential Issues:**
  - Spec ambiguities or undocumented edge cases
  - Keeping up with spec changes
- **Decision Log:**
  - Decision: Support both OB 2.0 and OB 3.0 in the same package
  - Reasoning: Maximize compatibility and future-proofing
  - Alternatives: Separate packages for each version

## 4. Plan
- **Quick Wins:**
  - [ ] Download OB 2.0/3.0 JSON-LD context and schema files (5 mins)
  - [ ] Set up mapping table template (5 mins)
- **Major Steps:**
  1. Generate TypeScript types from official schemas and compare to current types (30 mins) 🎯
  2. Manual review of each entity and field (60 mins) 🎯
  3. Implement/verify Zod schemas and type guards (45 mins) 🎯
  4. Write and run tests with official badge examples (45 mins) 🎯
  5. Document mapping and known limitations (30 mins) 🎯

## 5. Execution
- **Progress Updates:**
  - [x] Downloaded OB 2.0/3.0 schemas
  - [x] Mapping table created (see docs/ob-mapping-table.md)
  - [ ] Type comparison started
  - [ ] Manual review in progress
  - [ ] Zod schemas implemented
  - [ ] Tests written and passing
  - [ ] Documentation drafted
  - [x] OB2/OB3 schemas exported as constants in src/schemas.ts (enables validation/tooling)
- **Context Resume Point:**
  Last working on: Mapping table completed and moved to docs/ob-mapping-table.md
  Next planned action: Document schema exports in README and protocol compliance docs
  Current blockers: None yet

## 6. Next Actions & Blockers
- **Immediate Next Actions:** 
  - [ ] Download OB 2.0/3.0 context/schema files (5 mins)
  - [ ] Set up mapping table (5 mins)
- **Current Blockers:**
  - None yet

## 7. User Experience & Reflection
- **Friction Points:** [To be updated]
- **Flow Moments:** [To be updated]
- **Observations:** [To be updated]
- **Celebration Notes:** 🎉 [To be updated]

## Roadmap: Next Steps for Verifiable OpenBadges Types

1. **Comprehensive Sample Objects & Test Coverage**
   - For every exported OB2/OB3 type (Assertion, BadgeClass, Profile, VerifiableCredential, Achievement, etc.), create valid and invalid sample objects in test/helpers.ts.
   - Ensure each sample is type-checked by TypeScript.

2. **Runtime Schema Validation for All Types**
   - For each sample object, add a test that validates it against the corresponding OB2/OB3 schema using AJV (see validateWithSchema.ts).
   - Cover both positive (should pass) and negative (should fail) cases.

3. **Document & Review Acceptable Differences**
   - If a sample passes type-checking but fails schema validation (or vice versa), document the difference in docs/ob-mapping-table.md.
   - Decide if the difference is acceptable (e.g., extension fields) or needs to be fixed.

4. **CI Integration**
   - Add schema validation tests to your CI pipeline so that all PRs are checked for conformance.
   - Fail the build if a required type or schema check fails.

5. **Ongoing Spec Monitoring & Maintenance**
   - Periodically review the OB2/OB3 specs for changes.
   - Update types, schemas, and mapping table as needed.
   - Encourage contributors to add new sample objects/tests for any new types or fields. 