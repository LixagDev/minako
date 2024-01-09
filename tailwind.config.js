/** @type {import('tailwindcss').Config} */
module.exports = {
  daisyui: {
    themes: [{
      minako:{
        "primary": "#93c5fd",
        "secondary": "#a5f3fc",
        "accent": "#ddd6fe",
        "neutral": "#94a3b8",
        "base-100": "#ffffff",
        "base-200": "#ffffff",
        "base-300": "#f2f2f2",
      }
    }],
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