module.exports = {
  parser: '@typescript-eslint/parser',
  root: true,
  ignorePatterns: ['build/**/*', 'node_modules'],

  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:vitest/recommended',
  ],

  plugins: ['prettier', '@typescript-eslint', 'vitest'],

  env: {
    es6: true,
    node: true,
  },

  globals: {
    expect: true,
    global: true,
  },

  rules: {
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
  },
};
