module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      spacing: {
        108: "100vh",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
