/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        customLightBlack: '#2D2E33',
        customDarkGold: '#CF7500',
        customLightGold: '#F0A500',
        customWhite: '#F4F4F4',
        customBlack: '#0C0D0F',
        customBrown: '#431F0D',
        customDarkBrown: '#190B08',
        customExtraLightGold: '#FDE040'
      }
    },
  },
  plugins: [],
}
