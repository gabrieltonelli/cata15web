/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          950: '#050505',
          900: '#0A0A0A',
          850: '#111111',
          800: '#171717',
          700: '#262626',
          600: '#404040',
        },
        light: {
          50: '#FAFAFA',
          100: '#F5F5F5',
          200: '#E5E5E5',
          300: '#D4D4D4',
        },
        gold: {
          light: '#F3E8D2',
          DEFAULT: '#D4AF37',
          muted: '#A39264',
        }
      },
      fontFamily: {
        serif: ['Playfair Display', 'serif'],
        cinzel: ['Cinzel', 'serif'],
        sans: ['Montserrat', 'sans-serif'],
      },
      letterSpacing: {
        'luxury': '0.25em',
        'ultra-luxury': '0.35em',
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'float-slow': 'floatSlow 7s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
}
