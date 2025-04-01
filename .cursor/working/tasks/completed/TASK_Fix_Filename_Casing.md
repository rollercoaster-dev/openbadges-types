# Task: Fix Generated Filename Casing

**Goal:** Ensure all generated TypeScript filenames in `src/v2/` and `src/v3/` use correct PascalCase (e.g., `AchievementCredential.ts`, `EndorsementCredential.ts`) consistently matching the intended type names and specification documentation.

**Status:** ToDo

**Context:** The `scripts/generate-types.ts` script initially produced filenames with incorrect casing for some multi-word types (e.g., `Achievementcredential.ts`). Fixes have been attempted, but we need to ensure consistency across all generated files and consuming test files.

**Steps:**

1.  [ ] Review `generateTypeName` function in `scripts/generate-types.ts` for correct PascalCase logic (specifically check `EndorsementCredential`, `GetopenbadgeCredentialsResponse`, etc.).
2.  [ ] Manually inspect filenames currently in `src/v2/` and `src/v3/` for incorrect casing.
3.  [ ] Rename any incorrectly cased files if found.
4.  [ ] If renames were needed in step 3, update `generateTypeName` to prevent recurrence.
5.  [ ] Search `tests/` and `test-d/` directories for `import` statements referencing incorrectly cased filenames (e.g., `../src/v3/Achievementcredential.js`) and correct them.
6.  [ ] Run `pnpm run generate:types`.
7.  [ ] Manually restore the content of `src/v3/Profile.ts` using a previously correct version (as its generation still fails).
8.  [ ] Run `pnpm run build`.
9.  [ ] Run `pnpm test`.
10. [ ] Run `pnpm test:types`.
11. [ ] Confirm all builds and tests pass. 