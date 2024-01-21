/** @type {import('tailwindcss').Config} */
const nativewind = require("nativewind/tailwind/css")
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./screens/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        work: {
          25: '#1D1D1D',
          50: '#0f0f0f',
        },
        box: {
          25: '#F4F4F4',
          50: '#0f0f0f',
          100: '#FFCA00',
          111: '#E6E6E6',
        }
      },
      textUnderlineOffset: {
        3: '3px',
      }
    },
  },
  plugins: [nativewind],
}

