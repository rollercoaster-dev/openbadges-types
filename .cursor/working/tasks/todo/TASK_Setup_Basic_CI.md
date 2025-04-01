# Task: Setup Basic CI Workflow

**Goal:** Implement a basic Continuous Integration (CI) workflow using GitHub Actions to automatically run linters and tests on every push and pull request to the main branches.

**Status:** ToDo

**Context:** Ensures code quality and prevents regressions by automatically verifying contributions. This is the foundation before setting up automated publishing.

**Steps:**

1.  [ ] Create the directory structure `.github/workflows/`.
2.  [ ] Create a new YAML file, e.g., `ci.yml`, inside the workflows directory.
3.  [ ] Define the workflow trigger (e.g., `on: [push, pull_request]`).
4.  [ ] Define a job (e.g., `build_and_test`).
5.  [ ] Configure the job to run on a suitable runner (e.g., `ubuntu-latest`).
6.  [ ] Add steps to:
    *   [ ] Check out the repository code (`actions/checkout@v4`).
    *   [ ] Set up Node.js (`actions/setup-node@v4` - specify version).
    *   [ ] Set up pnpm (`pnpm/action-setup@v4` - specify version).
    *   [ ] Install dependencies (`pnpm install`).
    *   [ ] Run the linter (`pnpm run lint`).
    *   [ ] Run the tests (`pnpm test`).
    *   [ ] Run the type definition tests (`pnpm test:types`).
7.  [ ] Commit and push the workflow file.
8.  [ ] Verify the action runs correctly on GitHub for subsequent pushes/PRs. 