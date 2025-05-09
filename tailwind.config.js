/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'San Francisco', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'sans-serif'],
      },
      colors: {
        'apple-blue': '#0071e3',
        'apple-gray': '#86868b',
        'apple-light': '#f5f5f7',
        'apple-dark': '#1d1d1f',
        'apple-darker': '#000000',
      },
      borderRadius: {
        'ios': '14px',
      },
      boxShadow: {
        'ios': '0 8px 30px rgba(0, 0, 0, 0.12)',
        'ios-dark': '0 8px 30px rgba(255, 255, 255, 0.08)',
      },
    },
  },
  plugins: [],
}
