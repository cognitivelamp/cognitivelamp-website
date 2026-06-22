/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'Atkinson Hyperlegible', 'sans-serif'],
        heading: ['Sora', 'sans-serif'],
      },
      colors: {
        brand: {
          50:  '#eef2ff',
          100: '#e0e7ff',
          500: '#4f46e5',
          600: '#4338ca',
          700: '#3730a3',
          900: '#1e1b4b',
        },
        accent: {
          400: '#34d399',
          500: '#10b981',
        },
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '70ch',
            lineHeight: '1.8',
            fontSize: '1.05rem',
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}