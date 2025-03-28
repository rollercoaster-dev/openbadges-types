# Task: Address `any` Types Systematically

**Goal:** Reduce reliance on `any` types (both explicit and implicit) throughout the `openbadges-types` codebase to improve type safety, maintainability, and leverage TypeScript's benefits fully.

**Context:**
- `tsconfig.json` has `"strict": true` (implying `"noImplicitAny": true`).
- `eslint.config.js` currently has `@typescript-eslint/no-explicit-any` set to `warn`.
- Explicit `any` usage exists (e.g., index signatures for extensibility, placeholders like `humanWorkforceDemand`, type guards).
- `any` types might be inherited from external libraries (`@digitalcredentials/vc-data-model`).

**Plan:**

1.  **Audit Current `any` Usage:**
    *   Run `pnpm lint` to get the latest list of `@typescript-eslint/no-explicit-any` warnings.
    *   Review code for any remaining `any` types not caught by the linter (less likely with strict mode, but good to check).
    *   Identify sources: intentional placeholders, index signatures, external library types, type guards.

2.  **Prioritize Fixes:**
    *   Address `any` types that lead to `no-unsafe-*` lint errors first (check test files, type guards).
    *   Focus on `any` used as placeholders for undefined types (`humanWorkforceDemand`).
    *   Tackle `any` in function parameters/return types (like the previous state of the `isOpenBadgeCredential` guard).

3.  **Refine Interface Definitions:**
    *   Replace placeholder `any` types with more specific interfaces or types (`unknown`, `Record<string, unknown>`, or define dedicated structures).
    *   Example: Define a proper type for `humanWorkforceDemand` if possible based on spec research, or use `unknown`.

4.  **Strategy for Index Signatures (`[key: string]: any;`):
    *   **Option A (Current):** Leave rule as `warn` and accept these warnings as intentional for JSON-LD extensibility.
    *   **Option B (Safer):** Change index signatures to `[key: string]: unknown;`. This requires type checks/assertions before accessing extension properties but improves safety.
    *   **Option C (Explicit Disabling):** Keep as `[key: string]: any;` but add `// eslint-disable-next-line @typescript-eslint/no-explicit-any -- Reason: Allows for JSON-LD extensibility` comments above each one.
    *   **Decision:** Decide which approach best balances flexibility and safety for this library.

5.  **Strategy for External `any` Types:**
    *   Identify properties inherited as `any` from `@digitalcredentials/vc-data-model` (e.g., `proof`).
    *   Refine type guards (like `isVCDataObject`, `isOpenBadgeCredential`) to safely handle potential `any` from the base library.
    *   Use type assertions (`as ExpectedType`) cautiously *within functions or contexts where the type is guaranteed* after performing necessary checks.
    *   Consider defining local, stricter types that *intersect* with the base library types if feasible.

6.  **Goal Setting & Rule Adjustment:**
    *   Define the target state: Zero explicit `any` warnings? Or accept warnings for justified cases (like index signatures if Option A/C chosen)?
    *   Based on the target, consider changing `@typescript-eslint/no-explicit-any` in `eslint.config.js` back to `error` (if aiming for zero tolerance) or leave as `warn`.

**Next Actions:**
- Start with Step 1 (Audit).
- Make decisions on strategies (Steps 4, 5, 6).
- Incrementally apply fixes based on priority (Step 2 & 3). 