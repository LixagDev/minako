/** @type {import('tailwindcss').Config} */
module.exports = {
  daisyui: {
    themes: ["cupcake"],
  },
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    'node_modules/daisyui/dist/**/*.js',
    'node_modules/react-daisyui/dist/**/*.js',
  ],
  theme:{
    extend:{},
  },
  plugins: [require('daisyui')],
}