// postcss.config.cjs
// Mengubah dari CommonJS (module.exports) ke ES Module (export default)
// Ini diperlukan jika proyek Next.js Anda (atau Turbopack) mengharapkan format ES Module.
export default {
  plugins: {
    // Menggunakan plugin PostCSS yang benar untuk Tailwind CSS
    // Pastikan Anda telah menginstal @tailwindcss/postcss
    '@tailwindcss/postcss': {}, // Perubahan di sini
    autoprefixer: {},
  },
};
