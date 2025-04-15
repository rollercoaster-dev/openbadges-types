import js from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import prettier from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';

export default [
  js.configs.recommended,
  prettier,
  {
    ignores: [
      'dist/',
      'node_modules/',
      'coverage/',
      '*.d.ts',
      '*.js',
      '*.cjs',
      '*.mjs',
      '*.json',
      '*.snap',
      '*.test.*',
      'examples/',
      'test/',
      '.husky/',
      '.github/',
      '.cursor/',
    ],
    files: ['**/*.ts'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: './tsconfig.json',
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
      'prettier': prettierPlugin,
    },
    rules: {
      // Add or override rules here
      'prettier/prettier': 'error',
    },
  },
]; 