/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  env: {
    GRAPHQL_URI: 'http://localhost:3000/api/graphql',
    CHATKITTY_API_KEY: process.env.CHATKITTY_API_KEY,
  },
  images: {
    domains: ['img9.doubanio.com'],
  },
};

module.exports = nextConfig;
