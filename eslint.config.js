import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

export default tseslint.config(
  // Global ignores
  { 
    ignores: ['dist/', 'node_modules/', 'eslint.config.js']
  },

  // Base ESLint recommended rules
  eslint.configs.recommended,

  // TypeScript specific rules
  ...tseslint.configs.recommendedTypeChecked, // Or .recommended for less strict, non-type-aware rules

  // Configuration for TypeScript files
  {
    languageOptions: {
      parserOptions: {
        project: true, // Use tsconfig.json
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      // Customize TypeScript rules here if needed
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_+', varsIgnorePattern: '^_+' },
      ],
    },
  },

  // Prettier integration (MUST be last)
  eslintPluginPrettierRecommended,
);
