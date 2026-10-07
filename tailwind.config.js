/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        space: {
          deep: '#0a0a1a',
          darker: '#060612',
          card: 'rgba(255, 255, 255, 0.04)',
          border: 'rgba(255, 255, 255, 0.12)',
        },
        argentina: {
          light: '#9BCBEB',
          DEFAULT: '#75AADB',
          dark: '#3A7BD5',
        },
        gold: {
          light: '#FFE566',
          DEFAULT: '#FFD700',
          dark: '#D4AF37',
        }
      },
      fontFamily: {
        heading: ['Space Grotesk', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'glow-blue': '0 0 25px rgba(117, 170, 219, 0.35)',
        'glow-gold': '0 0 25px rgba(255, 215, 0, 0.35)',
        'glow-green': '0 0 25px rgba(34, 197, 94, 0.4)',
        'glow-red': '0 0 25px rgba(239, 68, 68, 0.4)',
        'floating': '0 20px 40px rgba(0, 0, 0, 0.5), 0 0 20px rgba(117, 170, 219, 0.2)',
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'float-medium': 'float 4s ease-in-out infinite',
        'float-fast': 'float 3s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
        'spin-reverse': 'spin-reverse 25s linear infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-15px)' },
        },
        'spin-reverse': {
          '0%': { transform: 'rotate(360deg)' },
          '100%': { transform: 'rotate(0deg)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.8', filter: 'drop-shadow(0 0 15px rgba(117, 170, 219, 0.4))' },
          '50%': { opacity: '1', filter: 'drop-shadow(0 0 30px rgba(255, 215, 0, 0.7))' },
        }
      }
    },
  },
  plugins: [],
}
