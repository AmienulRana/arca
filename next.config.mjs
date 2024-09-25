/** @type {import('next').NextConfig} */
const config = {
  output: 'standalone',
  assetPrefix: process.env.NEXT_PUBLIC_ASSETS || undefined,
  eslint: {
    ignoreDuringBuilds: true
  },
  poweredByHeader: false,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack']
    });
    return config;
  }
};

export default config;
