/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env:{
    GRAPHQL_URI:"http://localhost:3000/api/graphql"
  },
  images: {
    domains: ['img9.doubanio.com'],
  },
}

module.exports = nextConfig
