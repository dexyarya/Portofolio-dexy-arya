// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'placehold.co', // Jika Anda menggunakan placeholder
      'media.licdn.com', // Tambahkan ini
      // Tambahkan hostname lain jika ada
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
    ],
    dangerouslyAllowSVG: true,
  },
};

module.exports = nextConfig;