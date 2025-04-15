# Task: Integrate Shared Types (IRI, ImageObject) Across Codebase

## Context
- The canonical shared types file is `src/shared/common.ts`, defining:
  - `IRI` (branded string type for IRIs)
  - `ImageObject` (interface for image metadata, with flexible fields)
  - `OB3ImageObject` (strict interface for OB3-compliant image objects)
- The v3 `Profile` interface and other modules should reference these types for shared fields.
- There is a linter error in `src/v3/Profile.ts`:
  - `Cannot find module '../common/SharedTypes.js' or its corresponding type declarations.`
- No implementation work has been done to update other modules or fix the import path issue.

## Goals
- Ensure all relevant v2 and v3 modules use the shared `IRI` and `ImageObject` types from `src/shared/common.ts` (or `src/shared`).
- Use `Shared.OB3ImageObject` for OB3-compliant image fields to resolve type errors and ensure strict protocol compliance.
- Resolve the linter error by confirming the correct import path and file extension for TypeScript.
- Maintain spec adherence and versioning clarity.
- **Strictly adhere to the Open Badges specification and ensure protocol compliance is not broken.**

## Steps
1. **Audit Usage:**
   - Identify all places in the codebase where an IRI (string URL) or image object is used.
   - List all interfaces and types that should use `IRI`, `ImageObject`, or `OB3ImageObject` from the shared file.
2. **Import Path Correction:**
   - Investigate and resolve the linter error in `src/v3/Profile.ts`.
   - Ensure all imports use the correct TypeScript extension and reference `src/shared/common` (or `src/shared`).
3. **Update Types:**
   - Refactor relevant interfaces to use `IRI` and `ImageObject` from `src/shared/common.ts`.
   - Update `Profile` and `Issuer` types to use `Shared.IRI | Shared.OB3ImageObject` for OB3-compliant image fields.
   - **Note:** The current `ImageObject` is more flexible than the strict Open Badges v3 spec. Ensure that its usage in v3 contexts still fulfills protocol requirements, or consider a stricter alias if needed.
   - **Cross-check all changes against the Open Badges v2.0 and v3.0 specifications to ensure full protocol compliance.**
4. **Testing & Validation:**
   - Run the linter and TypeScript compiler to confirm all errors are resolved.
   - Ensure all tests pass and types are correctly enforced.
   - **Validate that all Open Badges protocol requirements are still met and no breaking changes are introduced.**
5. **Documentation:**
   - Update documentation to reference the shared types and their intended usage.
   - **Document how the shared types fulfill Open Badges protocol requirements.**

## Notes
- Do not implement any code changes until this task is prioritized and reviewed.
- Consider impact on downstream consumers and versioning. 