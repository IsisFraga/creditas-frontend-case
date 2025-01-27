/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@mui/material', '@mui/x-date-pickers'],
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  }
};

const withPWA = require('next-pwa')({
  dest: 'public',
  buildExcludes: [/app-build-manifest.json$/],
  fallbacks: {
    document: '/offline',
  }
})

module.exports = withPWA(nextConfig);