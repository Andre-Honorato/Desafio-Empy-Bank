/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'layout-body': '#EAEDEE',
        'side-bar-icon': 'rgba(18, 25, 41, 0.64)',
        'side-bar-icon-hover': '#00BDFF',
        'side-bar-icon-active': '#EAEDEE',
        'primary': '#121929',
        'border-color': 'rgba(18, 25, 41, 0.12)'
      },
      boxShadow: {
        'side-bar': '0px 2px 6px 2px rgba(0, 0, 0, 0.15)'
      },
      maxHeight: {
        'custom': 'calc(100vh - 227px)'
      },
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

