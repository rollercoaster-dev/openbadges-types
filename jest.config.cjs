/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  // Automatically clear mock calls and instances between every test
  clearMocks: true,
  // The directory where Jest should output its coverage files
  coverageDirectory: "coverage",
  // Indicates which provider should be used to instrument code for coverage
  coverageProvider: "v8",
  // A map from regular expressions to module names or to arrays of module names that allow to stub out resources with a single module
  moduleNameMapper: {
    // Handle module aliases (if you have them in tsconfig.json)
    // Example: '@/(.*)': '<rootDir>/src/$1'
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
  // A map from regular expressions to paths to transformers
  transform: {
    // Use ts-jest for .ts/.tsx files
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        // ts-jest configuration options
        tsconfig: 'tsconfig.json',
        useESM: true, // Important for ES Modules
      },
    ],
  },
  // Indicates whether each individual test should be reported during the run
  verbose: true,
}; 