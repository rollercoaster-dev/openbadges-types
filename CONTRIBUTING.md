# Contributing to Open Badges TypeScript Types

Thank you for your interest in contributing to the `@openbadges/types` package!

## Reporting Bugs

If you encounter a bug, such as a type definition not matching the specification or an issue with the generation script, please report it using [GitHub Issues](https://github.com/your-repo-link-here/issues). <!-- TODO: Update link -->

Please include:

*   A clear and concise description of the bug.
*   The specific type(s) or file(s) affected.
*   Steps to reproduce the behavior (if applicable).
*   Expected behavior vs. actual behavior.
*   Relevant version numbers (package, TypeScript, Node.js).

## Suggesting Enhancements

If you have an idea for an enhancement, such as improving the documentation, adding support for extensions, or refining the build process, please open an issue first to discuss the idea using [GitHub Issues](https://github.com/your-repo-link-here/issues). <!-- TODO: Update link -->

## Development Setup

1.  **Fork & Clone:** Fork the repository and clone your fork locally.
2.  **Install Dependencies:** This project uses `pnpm` for package management.
    ```bash
    pnpm install
    ```
3.  **Generate Types:** The core types are generated from schemas. Run the generation script:
    ```bash
    pnpm run generate:types
    ```
4.  **Build:** Compile the TypeScript source:
    ```bash
    pnpm run build
    ```
5.  **Linting & Formatting:** Ensure code adheres to standards:
    ```bash
    pnpm lint
    ```
    Formatting is typically handled by Prettier, often integrated into the editor.
6.  **Testing:** Run the validation and type tests:
    ```bash
    pnpm test       # Runs Zod validation tests (Jest)
    pnpm test:types # Runs static type checking tests (tsd)
    ```

## Pull Request Process

1.  Ensure your changes pass linting and all tests.
2.  Update the `README.md` or other documentation if your changes require it.
3.  Create a pull request against the `main` branch of the original repository.
4.  Clearly describe the changes you have made and link to any relevant issues.

Thank you for contributing! 