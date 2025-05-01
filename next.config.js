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
      'api.chatkitty.com',
    ],
  },
  i18n: {
    locales: ['en', 'zh'],
    defaultLocale: 'en',
  },
};

module.exports = nextConfig;