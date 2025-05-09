module.exports = {
  root: true,
  extends: [
    '@mavericks/eslint-config/nextjs-ts',
    '@mavericks/eslint-config/jest-react-overrides',
    'plugin:tailwindcss/recommended',
  ],
  plugins: ['unused-imports'],
  rules: {
    'i18next/no-literal-string': 'off',
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
  settings: {
    tailwindcss: {
      config: require('./tailwind.config.js'),
    },
  },
  overrides: [
    {
      files: ['src/components/forms/**/*.tsx'],
      rules: {
        'import/no-default-export': 'off',
      },
    },
    {
      files: ['src/config/env.ts'],
      rules: {
        'no-restricted-properties': 'off',
      },
    },
  ],
};
