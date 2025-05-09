import createJestConfig from '@mavericks/jest-config/jest-nextjs';
import { pathsToModuleNameMapper } from 'ts-jest';

import tsConfig from './tsconfig.json';

const config = createJestConfig({
  coverageThreshold: {
    global: {
      branches: 0,
      functions: 0,
      lines: 0,
      statements: 0,
    },
  },
  rootDir: './',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: pathsToModuleNameMapper(tsConfig.compilerOptions.paths, {
    prefix: '<rootDir>/',
  }),
});

export default config;
