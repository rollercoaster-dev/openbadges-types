# Development Guide

This document provides guidelines and instructions for contributors to the OpenBadges Types package.

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/rollercoaster-dev/openbadges-types.git
   cd openbadges-types
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Development Workflow

### Building the Package

To build the package:

```bash
npm run build
```

For development with automatic rebuilding:

```bash
npm run dev
```

### Code Style and Linting

This project uses ESLint for linting and Prettier for code formatting.

To check for linting issues:

```bash
npm run lint
```

To automatically fix linting issues:

```bash
npm run lint:fix
```

To format code with Prettier:

```bash
npm run format
```

To check if files are properly formatted:

```bash
npm run format:check
```

### Testing

To run tests:

```bash
npm test
```

To run tests in watch mode:

```bash
npm run test:watch
```

To run tests with coverage:

```bash
npm run test:coverage
```

### Validation

To validate the codebase (lint, format check, and test):

```bash
npm run validate
```

## Project Structure

```
openbadges-types/
├── src/
│   ├── v2/                 # Open Badges 2.0 types
│   ├── v3/                 # Open Badges 3.0 types
│   ├── shared/             # Shared types between versions
│   └── index.ts            # Main entry point
├── test/                   # Test files
├── dist/                   # Compiled output (generated)
├── package.json            # Package configuration
├── tsconfig.json           # TypeScript configuration
├── .eslintrc.js            # ESLint configuration
├── .prettierrc             # Prettier configuration
├── .editorconfig           # Editor configuration
└── README.md               # Package documentation
```

## Adding New Types

When adding new types:

1. Place them in the appropriate directory (`v2/`, `v3/`, or `shared/`)
2. Export them from the corresponding `index.ts` file
3. Add tests for the new types
4. Update documentation if necessary
5. **Avoid using `any` type** - Use more specific types or `unknown` instead

### Type Safety Guidelines

- **Avoid `any`**: The `any` type defeats TypeScript's type checking and should be avoided in new code
- **Use `unknown` instead**: When the type is truly not known, use `unknown` instead of `any`
- **Use type guards**: Create type guards to narrow down `unknown` types to more specific types
- **Use generics**: When appropriate, use generics to maintain type safety while allowing flexibility
- **Use union types**: When a value can be one of several types, use union types instead of `any`

Existing uses of `any` in the codebase are being gradually refactored. New code should not introduce new `any` types.

## Pull Request Process

1. Create a feature branch from `main`
2. Make your changes
3. Ensure all tests pass and linting rules are satisfied
4. Update documentation if necessary
5. Submit a pull request

## Troubleshooting

### Common Issues

#### TypeScript Compilation Errors

If you encounter TypeScript compilation errors:

1. Check that your types are correctly defined
2. Verify that all imports are correct
3. Run `npm run clean:build` to ensure a clean build

#### Linting Errors

If you encounter linting errors:

1. Run `npm run lint:fix` to automatically fix issues
2. For issues that can't be automatically fixed, manually address them according to the error messages

#### Test Failures

If tests are failing:

1. Check the error messages for specific issues
2. Verify that your changes don't break existing functionality
3. Update tests if necessary to reflect intended changes

## Release Process

The release process is handled by the maintainers. If you're a maintainer:

1. Ensure all tests pass and the build is successful
2. Update the version in `package.json` according to semantic versioning
3. Update the CHANGELOG.md file
4. Create a new release on GitHub
5. Publish to npm using `npm publish`
