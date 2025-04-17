# Task: Robust ESM Import Rewriting for openbadges-types

## Problem Summary

- **Goal:** Ensure all built JS files in `dist/` use explicit `.js` extensions and resolve directory imports to `/index.js` for ESM compatibility (Node, Bun, TypeScript).
- **Why:** TypeScript does not rewrite import/export paths for ESM. Node/Bun ESM require explicit extensions and do not support directory imports. This breaks package consumers and makes the package non-plug-and-play.
- **Symptoms:**
  - `Cannot find module ...` errors
  - `ERR_UNSUPPORTED_DIR_IMPORT` errors
  - Works in TS, fails in Node/Bun/other ESM consumers

## Solution Research

### 1. **Manual Script (Current/Attempted)**

- Custom Node script to regex-rewrite imports/exports.
- **Pros:** Simple, direct.
- **Cons:** Fragile, misses edge cases (directory imports, dynamic imports, etc.), hard to maintain.

### 2. **rewrite-imports (npm)**

- Modern, ESM-only, but no CLI in v3+ (must use programmatically).
- **Pros:** Maintained, handles most cases.
- **Cons:** Not CLI-friendly, requires custom runner script.

### 3. **cjs-to-esm (npm)**

- Deprecated/removed from npm (404 error as of 2024-04-16).
- **Pros:** Used to be CLI-friendly.
- **Cons:** No longer available.

### 4. **esbuild**

- Can rewrite imports if used as the build tool, but not as a pure post-processor for arbitrary import paths.
- **Pros:** Fast, robust, CLI-friendly.
- **Cons:** Not a drop-in for post-processing; best as a full build tool replacement.

### 5. **rollup**

- Can bundle and rewrite imports, but requires config and is more for bundling than for type packages.
- **Pros:** Powerful, flexible.
- **Cons:** Overkill for pure type packages, adds complexity.

### 6. **babel-plugin-module-resolver + Babel CLI**

- Can rewrite imports, but requires Babel config and is not ideal for pure ESM/TS type packages.
- **Pros:** Flexible.
- **Cons:** Adds Babel dependency, config overhead.

### 7. **jscodeshift/codemod**

- General-purpose codemod, can be scripted to rewrite imports.
- **Pros:** Powerful, customizable.
- **Cons:** Requires custom transform, not plug-and-play.

## Recommendation

**Use `rewrite-imports` programmatically via a small Node script.**

- Most robust, maintained, and purpose-built for this problem.
- Handles both extensionless and directory imports.
- Minimal dependencies, easy to document for future maintainers.

## Implementation Plan

1. **Install rewrite-imports**

   - `pnpm add -D rewrite-imports`

2. **Create a script (e.g., scripts/rewrite-imports.mjs):**

   ```js
   import { rewriteImports } from 'rewrite-imports';
   await rewriteImports('dist', { exts: ['.js'], silent: false });
   console.log('✅ rewrite-imports completed');
   ```

3. **Update package.json build script:**

   - `"build": "tsc && node scripts/rewrite-imports.mjs"`

4. **Remove any custom/old fix-extensions scripts.**

5. **Test:**

   - Run `pnpm build`
   - Test ESM import in Node/Bun: `node -e "import('file://'+process.cwd()+'/dist/index.js').then(m => console.log(Object.keys(m)))"`
   - Confirm no ERR_UNSUPPORTED_DIR_IMPORT or ERR_MODULE_NOT_FOUND errors.

6. **Document:**

   - Add a README section explaining the ESM build process and why rewrite-imports is used.
   - Note for future maintainers: If ESM import rules change, revisit this step.

7. **Fallback/Contingency:**
   - If rewrite-imports fails, consider using a custom codemod (jscodeshift) or switching to esbuild/rollup as the main build tool.
   - Document any issues and lessons learned in `.cursor/working/agent/memory/learning_log.md`.

## Checklist

- [ ] Install rewrite-imports
- [ ] Add scripts/rewrite-imports.mjs
- [ ] Update build script in package.json
- [ ] Remove old fix-extensions scripts
- [ ] Test ESM import in Node and Bun
- [ ] Update README
- [ ] Document lessons learned

## References

- `src/`, `dist/`, `package.json`, `scripts/`
- [rewrite-imports npm](https://www.npmjs.com/package/rewrite-imports)
- [Node ESM docs](https://nodejs.org/api/esm.html)

## User Feedback & Lessons Learned

- [ ] Was the solution robust for all import styles?
- [ ] Did it work for both Node and Bun?
- [ ] Any pain points for future maintainers?

---

**Priority:** High (blocking ESM accessibility for all consumers)
