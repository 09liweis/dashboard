/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['image.biccamera.com','ww4.sinaimg.cn','www.hktvdrama.com','puui.qpic.cn','gss3.bdstatic.com','img3.doubanio.com','gss2.bdstatic.com','wx4.sinaimg.cn','ia.media-imdb.com','m.media-amazon.com','img5.mtime.cn','img9.doubanio.com','upload.wikimedia.org','images-na.ssl-images-amazon.com'],
  },
}

module.exports = nextConfig
