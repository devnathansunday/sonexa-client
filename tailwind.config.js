/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: '480px',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
      },
      colors: {
        'my-bg': "#1f1f1f",
        'my-nav': "#1f1f1f",
        'my-content': "#2f2f2f",
        'my-text': "#F5F5F5",
        'my-muted-text': "#C7C7C7",
        'my-pink': "#FF5A5F",
        'my-blue': "#3DA5D9",
        'my-yellow': "#FEC601",
        'my-dark': "#1b1b1b",
      },
      fontFamily: {
        clash: ['var(--font-clash-display)'],
        lora: ['var(--font-lora)'],
      }
    },
  },
  plugins: [],
}
