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
      },
      animation: {
        slide: 'slide 20s linear infinite',
      },
      keyframes: {
        "slide": {
          from: { left: 'translateX(0)' },
          to: { transform: 'translateX(-100%)' },
        },
      },
    },
  },
  plugins: [],
}

