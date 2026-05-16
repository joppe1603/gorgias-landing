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
        gold: {
          50:  '#FDF8F0',
          100: '#FAF0DC',
          200: '#F3DFB4',
          300: '#E8C98A',
          400: '#D9B472',
          500: '#C9A96E',
          600: '#B8935A',
          700: '#9A7845',
          800: '#7C5F35',
          900: '#5E4727',
        },
      },
      animation: {
        marquee: 'marquee 35s linear infinite',
        'marquee-reverse': 'marquee-reverse 35s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%':   { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-reverse': {
          '0%':   { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
      backgroundImage: {
        'dot-pattern': 'radial-gradient(circle, #e8e0d8 1px, transparent 1px)',
      },
      backgroundSize: {
        'dot-lg': '32px 32px',
      },
    },
  },
  plugins: [],
}
