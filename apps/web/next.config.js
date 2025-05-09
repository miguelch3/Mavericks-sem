const nextTranslate = require('next-translate-plugin');
const packageJson = require('../../package.json');

/** @type {import('next').NextConfig} */
module.exports = nextTranslate({
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: !!process.env.CI,
  },
  typescript: {
    ignoreBuildErrors: process.env.CI,
    tsconfigPath: 'tsconfig.build.json',
  },
  transpilePackages: [
    '@mavericks/ui',
    'antd',
    '@ant-design',
    'rc-util',
    'rc-pagination',
    'rc-picker',
    'rc-notification',
    'rc-tooltip',
  ],
  output: 'standalone',
  env: {
    NEXT_PUBLIC_APP_VERSION: packageJson.version,
  },
});
