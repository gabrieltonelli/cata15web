/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'fondo': '#0A0A0F',
        'texto': '#EDEDED',
        'gris': '#6E6E73',
        'magenta': '#E91E90',
        'azul': '#2D7AFF',
        'violeta': '#8B5CF6',
        'plata': '#C0C0C0',
      },
      fontFamily: {
        'display': ['Clash Display', 'sans-serif'],
        'body': ['Satoshi', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
