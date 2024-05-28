/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/components/**/*.{js,jsx}",
    "./src/App.jsx"
  ],
  theme: {
    extend: {
      fontFamily:{
        pawan : ["Playfair Display", "serif"]
      }
    },
  },
  plugins: [],
}

