/** @type {import('next').NextConfig} */
const nextConfig = {
  // 忽略ESLint错误，仅用于开发环境
  eslint: {
    ignoreDuringBuilds: true,
  },
  // 忽略TypeScript错误，仅用于开发环境
  typescript: {
    ignoreBuildErrors: true,
  },
  // 严格模式
  reactStrictMode: true,
  // 允许的图片域名
  images: {
    domains: ['images.unsplash.com', 'picsum.photos'],
  },
}

module.exports = nextConfig 