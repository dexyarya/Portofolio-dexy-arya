/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
      // Keyframes dan animasi dipindahkan ke globals.css untuk Next.js
      boxShadow: {
        'green-glow': '0 0 15px rgba(0, 255, 0, 0.6), 0 0 25px rgba(0, 255, 0, 0.4)',
        'green-glow-sm': '0 0 8px rgba(0, 255, 0, 0.5)',
      },
    },
  },
  plugins: [],
}
