/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  // Use the ESM preset for ts-jest
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'node',
  // Automatically clear mock calls and instances between every test
  clearMocks: true,
  // The directory where Jest should output its coverage files
  coverageDirectory: "coverage",
  // Indicates which provider should be used to instrument code for coverage
  coverageProvider: "v8",
  moduleNameMapper: {
    // Map .js imports to .ts files for testing ESM
    '^(\\.\\.?/.*)\\.js$': '$1',
  },
  // A list of paths to directories that Jest should use to search for files in
  roots: [
    "<rootDir>/tests"
  ],
  // The test matching patterns
  testMatch: [
    "**/__tests__/**/*.[jt]s?(x)",
    "**/?(*.)+(spec|test).[tj]s?(x)"
  ],
  // Indicates whether each individual test should be reported during the run
  verbose: true,
}; 