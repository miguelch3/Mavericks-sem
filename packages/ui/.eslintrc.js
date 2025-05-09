module.exports = {
  root: true,
  extends: [
    '@mavericks/eslint-config/react-ts',
    '@mavericks/eslint-config/jest-react-overrides',
  ],
  ignorePatterns: ['node_modules', 'dist'],
  plugins: ['unused-imports'],
  rules: {
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': [
      'warn',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_',
      },
    ],
  },
};
