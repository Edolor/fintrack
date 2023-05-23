/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,tx,tsx}"
  ],
  theme: {
    fontFamily: {
      'serif': ['Oswald'],
      'sans': ['Raleway']
    },

    extend: {
      colors: {
        primary: "#20CB64",
        primaryLight: "#2ED771",
        google: "#EA4335",
        bookhub: "#2199e8",
      },
      gridTemplateColumns: {
        'auto': 'repeat(auto-fit, minmax(18rem, 24rem))',
      }
    },
  },
  plugins: [],
}