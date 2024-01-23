module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx,vue}'],
  theme: {
    extend: {
      backgroundImage: {
        'pokeball-light': "url('@/assets/pokeball-light.png')",
        'pokeball-dark': "url('@/assets/pokeball-dark.png')",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
  darkMode: 'class',
}
