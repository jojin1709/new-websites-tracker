/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
      },
      colors: {
        dark: {
          900: '#050510',
          800: '#0a0a1a',
          700: '#111127',
          600: '#1a1a3e',
        },
        accent: {
          primary: '#6366f1',
          secondary: '#8b5cf6',
          pink: '#ec4899',
          cyan: '#06b6d4',
        }
      },
      animation: {
        'float': 'float 20s ease-in-out infinite',
        'float-reverse': 'float 25s ease-in-out infinite reverse',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite',
        'radar': 'radarPulse 3s ease-out infinite',
        'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
        'fade-in-down': 'fadeInDown 0.8s ease-out forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '25%': { transform: 'translate(30px, -30px)' },
          '50%': { transform: 'translate(-20px, 20px)' },
          '75%': { transform: 'translate(20px, 30px)' },
        },
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        glow: {
          '0%, 100%': { filter: 'drop-shadow(0 0 10px rgba(99, 102, 241, 0.5))' },
          '50%': { filter: 'drop-shadow(0 0 20px rgba(99, 102, 241, 0.8))' },
        },
        radarPulse: {
          '0%': { transform: 'scale(0.8)', opacity: '1' },
          '100%': { transform: 'scale(1.5)', opacity: '0' },
        },
        fadeInUp: {
          from: { opacity: '0', transform: 'translateY(30px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          from: { opacity: '0', transform: 'translateY(-20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}