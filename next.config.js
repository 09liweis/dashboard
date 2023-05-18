/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  env: {
    GRAPHQL_URI: 'http://localhost:3000/api/graphql',
    CHATKITTY_API_KEY: process.env.CHATKITTY_API_KEY,
  },
  images: {
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
