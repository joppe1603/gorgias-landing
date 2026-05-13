/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        orange: {
          50: '#fff4ef',
          100: '#ffe5d5',
          200: '#ffc9a8',
          300: '#ffa070',
          400: '#ff6a30',
          500: '#FF4F00',
          600: '#e64600',
          700: '#c43b00',
          800: '#9e3100',
          900: '#7f2a00',
        },
      },
      animation: {
        marquee: 'marquee 30s linear infinite',
        'marquee-reverse': 'marquee-reverse 30s linear infinite',
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
        'count-up': 'countUp 2s ease-out forwards',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      backgroundImage: {
        'dot-pattern': 'radial-gradient(circle, #e5e7eb 1px, transparent 1px)',
      },
      backgroundSize: {
        'dot-lg': '32px 32px',
      },
    },
  },
  plugins: [],
}
