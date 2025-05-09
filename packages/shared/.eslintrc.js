module.exports = {
  root: true,
  extends: [
    '@mavericks/eslint-config/node-ts',
    '@mavericks/eslint-config/jest-overrides',
  ],
  settings: {
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: ['packages/*/tsconfig.json', 'tsconfig.json'],
      },
    },
  },
};
