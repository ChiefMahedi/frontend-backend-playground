/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors:{
         'sidebar':'#05103c'
        },
        fontFamily: {
          poppins: ["Poppins", "sans-serif"],
        },
      },
      screens: {
        'mobile': '360px',
        'tablet': '768px',
        'laptop': '1024px',
        'desktop': '1280px',
      },

    },
    plugins: [],
  }
  
  