/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'erp-orange': '#f97316', // Color principal de tus capturas
        'erp-yellow': '#fbbf24', // Color secundario de tus capturas
      },
    },
  },
  plugins: [],
}