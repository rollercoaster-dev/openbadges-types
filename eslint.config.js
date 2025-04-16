import globals from 'globals';
import jest from 'eslint-plugin-jest';

export default [
  {
    ignores: ['dist/**/*', 'node_modules/**/*'],
  },
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
        console: 'readonly',
      },
    },
    plugins: { jest },
    rules: {
      ...jest.configs.recommended.rules,
    },
  },
];
