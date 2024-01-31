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
  overrides: [
    {
      files: ['*.mdx'],
      extends: 'plugin:mdx/recommended',
      settings: {
        'mdx/code-blocks': true,
      },
      rules: {
        'react/jsx-no-undef': 0,
      },
    },
  ],
};
