/** @type {import('@types/eslint').Linter.BaseConfig} */
module.exports = {
  extends: [
    'airbnb',
    'airbnb/hooks',
    'eslint-config-airbnb/whitespace',
    '@remix-run/eslint-config',
    '@remix-run/eslint-config/node',
    '@remix-run/eslint-config/jest-testing-library',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  env: {
    'cypress/globals': true,
  },
  plugins: ['cypress', '@typescript-eslint'],
  // we're using vitest which has a very similar API to jest
  // (so the linting plugins work nicely), but it means we have to explicitly
  // set the jest version.
  settings: {
    jest: {
      version: 28,
    },
  },
  overrides: [
    {
      extends: ['airbnb-typescript'],
      files: ['*.ts', '*.tsx'],
      parserOptions: {
        project: ['./tsconfig.json'],
      },
      rules: {
        '@typescript-eslint/no-use-before-define': 'off',
        '@typescript-eslint/no-throw-literal': 'off',
      },
    },
  ],
  rules: {
    'react/display-name': 'off',
    'import/extensions': 'off',
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.jsx', '.tsx'],
      },
    ],
    'no-console': 'off',
    'jsx-a11y/label-has-associated-control': 'off',
    'import/prefer-default-export': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/function-component-definition': 'off',
    'react/prop-types': 'off',
    '@typescript-eslint/no-throw-literal': 'off',
    'jsx-a11y/no-autofocus': 'off',
    'no-underscore-dangle': 'off',

    'no-multi-spaces': 'warn',
    'no-multiple-empty-lines': 'warn',
    'no-trailing-spaces': 'warn',
    'no-tabs': 'error',
  },
  ignorePatterns: ['/node_modules', '/build', '/public/build'],
}
