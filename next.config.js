/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  output: 'standalone', // Enable standalone output
  env: {
    GRAPHQL_URI: 'http://localhost:3000/api/graphql',
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.doubanio.com',
      },
    ],
    domains: [
      'img9.doubanio.com',
      'api.chatkitty.com',
      'archive.biliimg.com',
      'i1.hdslb.com',
      'i2.hdslb.com',
      'i0.hdslb.com',
    ],
  },
  i18n: {
    locales: ['en', 'zh'],
    defaultLocale: 'en',
  },
};

module.exports = nextConfig;