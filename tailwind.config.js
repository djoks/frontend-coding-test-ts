module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx,vue}'],
  theme: {
    extend: {
      backgroundImage: {
        'pokeball': "url('@/assets/pokeball-light.png')",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
