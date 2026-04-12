/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pastelBlue: '#E0EFFF',
        pastelPink: '#FFE5EC',
        pastelGreen: '#E0FFEB',
        pastelYellow: '#FFF5CC',
        darkText: '#1A202C',
        lightGray: '#F7FAFC'
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
      },
      backgroundImage: {
        'grid-pattern': "url(\"data:image/svg+xml,%3Csvg width='120' height='120' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0l30 30h20 M60 20l20-20 M80 60l20-20v-20 M30 120l30-30h20 M100 100l20-20 M0 80l20 20v20 M10 40l20-20v-20' fill='none' stroke='%23a855f7' stroke-width='2' stroke-opacity='0.4'/%3E%3Ccircle cx='50' cy='30' r='3' fill='%23a855f7' fill-opacity='0.6'/%3E%3Ccircle cx='80' cy='0' r='2.5' fill='%233b82f6' fill-opacity='0.6'/%3E%3Ccircle cx='100' cy='40' r='3' fill='%23a855f7' fill-opacity='0.6'/%3E%3Ccircle cx='80' cy='90' r='3' fill='%233b82f6' fill-opacity='0.6'/%3E%3Ccircle cx='30' cy='60' r='2.5' fill='%233b82f6' fill-opacity='0.6'/%3E%3Ccircle cx='20' cy='100' r='3' fill='%23a855f7' fill-opacity='0.6'/%3E%3Cpath d='M120 120v-20l-20-20 M0 120h20l20-20 M40 80h20 M80 40h20' fill='none' stroke='%233b82f6' stroke-width='2' stroke-opacity='0.3'/%3E%3C/svg%3E\")",
      }
    },
  },
  plugins: [],
}
