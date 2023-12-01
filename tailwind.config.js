/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        gunblack: "#2a2d34",
        blue: "#0066ff",
      },
      fontFamily:{
        quatsans: ['Quattrocento', "serif"],
        quat: ['Quattrocento Sans', 'sans-serif']
      }
      
    },
  },
  plugins: [require("daisyui")],
}

