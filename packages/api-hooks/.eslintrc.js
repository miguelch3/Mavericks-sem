module.exports = {
  root: true,
  extends: [
    '@mavericks/eslint-config/nextjs-ts',
    '@mavericks/eslint-config/jest-react-overrides',
  ],
  plugins: ['unused-imports', '@tanstack/eslint-plugin-query'],
  rules: {
    // Allow the return keyword in else blocks to a easy code remove for the scripts
    'no-else-return': 'off',
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
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'variable',
        format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
        leadingUnderscore: 'allow',
      },
    ],
    'no-restricted-properties': [
      'error',
      {
        object: 'process',
        property: 'env',
        message:
          'Avoid using process.env directly. Use @/config/* files instead.',
      },
    ],
  },
  overrides: [
    {
      files: ['src/config/env.ts'],
      rules: {
        'no-restricted-properties': 'off',
      },
    },
    // We let TS infer the types for the react query hooks as it's supported by v5
    {
      files: ['src/**/hook.ts'],
      rules: {
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
      },
    },
  ],
};
