# 📝 Automated Release & Changelog Checklist

## 1. Pre-Release: Local Preparation

- [ ] Ensure your local `main` branch is up to date (`git pull origin main`).
- [ ] Run all tests and validation locally (`pnpm validate`).
- [ ] Review recent commits for proper Conventional Commit messages.
- [ ] Confirm all intended changes are committed and pushed.

## 2. Bump Version & Update Changelog

- [ ] Run the appropriate release script:
  - For automatic bump: `npm run release`
  - For a specific bump:
    - Patch: `npm run release:patch`
    - Minor: `npm run release:minor`
    - Major: `npm run release:major`
- [ ] Review the following files for correct updates:
  - [ ] `package.json` version is bumped
  - [ ] `CHANGELOG.md` includes new entries
  - [ ] A new Git tag (e.g., `v3.0.0`) is created locally

## 3. Commit & Push

- [ ] Push the commit and tag to GitHub:
  - `git push origin main --follow-tags`

## 4. Automated GitHub Release (CI/CD)

- [ ] Wait for the GitHub Actions release workflow to run (triggered by the new tag).
- [ ] Confirm the workflow:
  - [ ] Builds and validates the project
  - [ ] Generates release notes (does NOT bump version again)
  - [ ] Publishes the release to GitHub and npm

## 5. Post-Release Verification

- [ ] Check the GitHub Releases page for the new release and correct changelog.
- [ ] Verify the new version is published on npm.
- [ ] Announce or document the release as needed.

---

## 🛑 Common Pitfalls to Avoid

- Do NOT run the release script in CI/CD (only locally before pushing).
- Do NOT manually edit `CHANGELOG.md` or `package.json` for versioning—always use the scripts.
- Always push both the commit and the tag (`--follow-tags`).
