# Tasks: Create @types/openbadges Package

This file outlines the planned tasks for creating the TypeScript types package for Open Badges v2 and v3, based on `docs/openbadges-types-package-plan.md`.

## Phase 1: Project Setup & Schema Acquisition

-   [ ] **Task 1.1: Initialize Project Structure:**
    -   Set up a new npm package using pnpm.
    -   Configure TypeScript (`tsconfig.json` with strict settings).
    -   Set up linting/formatting (ESLint, Prettier).
    -   Create basic directory structure (`src/`, `src/v2/`, `src/v3/`, `src/common/`, `tests/`, `schemas/`).
    -   *Estimated Time:* 1-2 hours
    -   *Commit Point:* Initial project structure and configuration.
-   [ ] **Task 1.2: Acquire JSON Schemas:**
    -   Locate authoritative JSON schemas for Open Badges v2.0 (incl. extensions if desired) and v3.0 from 1EdTech.
    -   Download and store locally (e.g., `schemas/v2/`, `schemas/v3/`).
    -   *Estimated Time:* 1-3 hours
    -   *Commit Point:* Added official JSON schemas.

## Phase 2: Type Generation & Refinement

-   [ ] **Task 2.1: Select & Setup Conversion Tool:**
    -   Choose primary tool (likely `json-schema-to-ts`).
    -   Install as dev dependency.
    -   Configure npm/pnpm scripts for basic generation.
    -   *Estimated Time:* 1 hour
    -   *Commit Point:* Conversion tool selected and basic generation script setup.
-   [ ] **Task 2.2: Generate Initial Types:**
    -   Run conversion tool on schemas for v2 and v3.
    -   Output types to `src/v2/`, `src/v3/`.
    -   Identify and move common types to `src/common/`.
    -   *Estimated Time:* 1-2 hours
    -   *Commit Point:* Initial types generated from schemas.
-   [ ] **Task 2.3: Review and Refine Types:**
    -   Manually review generated types against schemas/specs.
    -   Refine based on TypeScript best practices, JSON-LD structure, and versioning clarity.
    -   Add TSDoc comments.
    -   *Estimated Time:* 3-5 hours (iterative)
    -   *Commit Point:* Types reviewed, refined, and documented (can be multiple commits during this task).

## Phase 3: Validation & Testing

-   [ ] **Task 3.1: Setup Testing Framework:**
    -   Install and configure Jest.
    -   Set up basic test execution scripts.
    *   *Estimated Time:* 1 hour
    *   *Commit Point:* Testing framework (Jest) configured.
-   [ ] **Task 3.2: Implement Schema Validation Tests:**
    -   Install Ajv (or Zod/Valibot).
    -   Create test data examples.
    -   Write tests validating data against *original* schemas.
    -   Write tests ensuring TS-conformant data passes original schema validation.
    *   *Estimated Time:* 2-4 hours
    *   *Commit Point:* Schema validation tests implemented.
-   [ ] **Task 3.3: Implement Reverse Validation (Optional but Recommended):**
    -   Install/configure `typescript-json-schema`.
    -   Write tests generating schemas *from* TS types and compare against original schemas.
    *   *Estimated Time:* 2-3 hours
    *   *Commit Point:* Reverse schema validation tests implemented.
-   [ ] **Task 3.4: Implement Type Checking Tests:**
    -   Write tests (e.g., using `jest-tsd`) asserting correct type inference and catching expected compile-time errors.
    *   *Estimated Time:* 2-3 hours
    *   *Commit Point:* Static type checking tests implemented.

## Phase 4: Documentation & Packaging

-   [ ] **Task 4.1: Write Documentation:**
    -   Create `README.md` (installation, usage examples).
    -   Consider TypeDoc for API docs.
    *   *Estimated Time:* 2-4 hours
    *   *Commit Point:* Core documentation (README) written.
-   [ ] **Task 4.2: Configure Build & Package:**
    -   Configure `tsc` for `dist/` output.
    -   Set up `package.json` for publishing (`@types/openbadges`, version, files, main/types entries).
    -   Include `LICENSE` file.
    *   *Estimated Time:* 1-2 hours
    *   *Commit Point:* Build process and package configuration complete.

## Phase 5: Automation & Maintenance

-   [ ] **Task 5.1: Setup CI/CD (GitHub Actions):**
    -   Create `.github/workflows/ci.yml`.
    -   Configure workflow (checkout, install, lint, build, test).
    -   Trigger on push/PR.
    *   *Estimated Time:* 2-4 hours
    *   *Commit Point:* CI workflow implemented.
-   [ ] **Task 5.2: Add Schema Update Monitoring & Automation (Advanced):**
    -   (Optional/Future) Enhance CI to check schema sources for updates.
    -   Automate re-generation/validation on updates.
    *   *Estimated Time:* 3-5 hours
    *   *Commit Point:* Schema update monitoring/automation added (if implemented).
-   [ ] **Task 5.3: Create Contribution Guidelines:**
    -   Write `CONTRIBUTING.md`.
    *   *Estimated Time:* 1 hour
    *   *Commit Point:* Contribution guidelines added. 