/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['img3.doubanio.com','gss2.bdstatic.com','wx4.sinaimg.cn','ia.media-imdb.com','m.media-amazon.com','img5.mtime.cn','img9.doubanio.com','upload.wikimedia.org','images-na.ssl-images-amazon.com'],
  },
}

module.exports = nextConfig
