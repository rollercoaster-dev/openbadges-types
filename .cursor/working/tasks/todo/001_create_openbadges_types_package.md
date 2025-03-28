# Task: Create Open Badges Types NPM Package

**ID:** 001
**Status:** ToDo
**Date Created:** YYYY-MM-DD
**Estimated Time:** 4-6 hours (spread over sessions)

## Goal

Create a well-structured, versioned, and documented TypeScript types library for Open Badges 2.0 and 3.0, suitable for publishing on NPM.

## Background & Research

- **Open Badges 2.0:** Defines core structures like `Assertion`, `BadgeClass`, `Profile` using JSON-LD. Includes image baking.
- **Open Badges 3.0:** Aligns with W3C Verifiable Credentials (VC). Introduces `OpenBadgeCredential`, `Achievement`, `EndorsementCredential`. API integrated.
- **Key Requirement:** Need to support both 2.0 and 3.0 specifications distinctly but potentially with shared base types where applicable.
- **Research Summary:** See `docs/openbadges_research.md`

## Implementation Plan

**Phase 1: Project Setup & Basic Structure (Est: 1 hour)**

1.  **Initialize NPM Package:**
    - Run `npm init` (or equivalent with `yarn` or `pnpm`).
    - Configure `package.json` (name, version, description, keywords, license, repository, entry points, types field).
2.  **Install Dependencies:**
    - `typescript` (dev dependency)
    - Build/bundling tools if desired (e.g., `tsup`, `tsc`, or similar - TBD)
    - Testing framework (e.g., `vitest`, `jest` - TBD)
3.  **Configure TypeScript:**
    - Create `tsconfig.json` with appropriate settings (target, module, declaration, strictness, etc.).
4.  **Basic Directory Structure:**
    - `src/`: Main source code directory.
    - `src/v2/`: Types specific to Open Badges 2.0.
    - `src/v3/`: Types specific to Open Badges 3.0.
    - `src/common/`: Shared types (if any).
    - `src/index.ts`: Main package export file.
    - `tests/`: Directory for unit/integration tests.

**Phase 2: Define Open Badges 2.0 Types (Est: 1.5 hours)**

1.  **Core Types:** Define interfaces/types for `Assertion`, `BadgeClass`, `Profile`, `IdentityObject`, `VerificationObject`, `Criteria`, `Evidence`, `AlignmentObject`, `Image`, etc., based on the 2.0 spec.
    - Pay attention to required vs. optional fields.
    - Handle `id` (URI) and `type` properties consistently.
    - Address extensibility (e.g., index signatures or generics).
    - Define types for specific formats (e.g., `DateTime`, `URL`, `Email`).
2.  **Helper Types/Enums:** Create enums or literal types for fields with fixed values (e.g., `VerificationObject.type`).
3.  **Structure Exports:** Export types clearly from `src/v2/index.ts`.

**Phase 3: Define Open Badges 3.0 Types (Est: 2 hours)**

1.  **Core Types:** Define interfaces/types for `OpenBadgeCredential`, `Achievement`, `Issuer` (VC style), `EndorsementCredential`, etc., based on the 3.0 spec and VC Data Model.
    - Incorporate VC base types if helpful (e.g., `VerifiableCredential`, `CredentialSubject`). Consider importing from existing VC type libraries if appropriate, or defining necessary subsets.
    - Reuse/extend types from `src/common/` or `src/v2/` if applicable (e.g., `Image`, `Criteria` might be similar).
    - Handle the `@context` property correctly.
2.  **Refined/New Types:** Adapt or create types for identity, verification, evidence, etc., as per v3.0 changes.
3.  **Structure Exports:** Export types clearly from `src/v3/index.ts`.

**Phase 4: Package Exports & Documentation (Est: 1 hour)**

1.  **Main Exports:** Configure `src/index.ts` to export v2 and v3 types clearly, perhaps under namespaces (e.g., `OpenBadges.v2.Assertion`, `OpenBadges.v3.OpenBadgeCredential`).
2.  **README:** Create a comprehensive `README.md`.
    - Explain the package's purpose.
    - Installation instructions.
    - Usage examples for both v2 and v3 types.
    - Link to official Open Badges specifications.
    - Versioning strategy.
    - Contribution guidelines (optional).
3.  **TSDoc Comments:** Add TSDoc comments to exported types and interfaces for better editor integration and potential automated documentation generation.

**Phase 5: Testing & Refinement (Est: Optional/Ongoing)**

1.  **Basic Tests:** Add simple tests to verify type structures and required fields (e.g., using type assertions or simple object assignments).
2.  **Refinement:** Adjust types based on testing and potential real-world usage examples.

## Next Steps

1.  User review of this plan.
2.  Proceed with Phase 1: Project Setup.

## Potential Challenges / Considerations

- **Complexity of Specs:** The specifications are detailed; ensuring accurate representation in types requires care.
- **JSON-LD Contexts:** Handling the `@context` field and potential variations.
- **Extensibility:** Balancing strong typing with the need for extensions.
- **VC Integration (v3):** Accurately reflecting the Verifiable Credentials model might require referencing its spec or existing libraries.
- **Embedded vs. Linked Objects:** Designing types to handle both cases elegantly (e.g., an `issuer` property could be a `string` URL or an embedded `Profile`/`Issuer` object). Union types are likely needed.
