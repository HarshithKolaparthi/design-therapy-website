/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0a0a0b',
        surface: '#121214',
        surfaceHover: '#1c1c1f',
        primary: '#8b5cf6', // Violet
        primaryHover: '#7c3aed',
        accent: '#f43f5e', // Rose/Neon red
        neon: '#2dd4bf', // Teal/Neon
        textPrimary: '#f8fafc',
        textSecondary: '#94a3b8',
        border: '#27272a'
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'glow-primary': '0 0 20px -5px rgba(139, 92, 246, 0.5)',
        'glow-accent': '0 0 20px -5px rgba(244, 63, 94, 0.5)',
        'glow-neon': '0 0 20px -5px rgba(45, 212, 191, 0.5)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '.5' },
        }
      }
    },
  },
  plugins: [],
}
