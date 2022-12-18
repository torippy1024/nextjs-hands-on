/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  basePath: process.env.GITHUB_ACTIONS ? '/nextjs-hands-on' : '',
};

module.exports = nextConfig;
