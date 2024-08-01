// eslint.config.js
module.exports = [
  {
    ignores: ['node_modules/**', 'dist/**', 'build/**'],
  },
  {
    files: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx'],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
    },
    rules: {
      // Add your ESLint rules here
    },
  },
];
