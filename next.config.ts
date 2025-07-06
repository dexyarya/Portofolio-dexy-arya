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
  },
};

module.exports = nextConfig;