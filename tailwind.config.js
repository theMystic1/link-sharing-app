/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        purples: {
          50: "#efebff",
          100: "#beadff",
          500: "#633cff",
        },
        greyy: {
          900: "#333333",
          700: "#737373",
          200: "#d9d9d9",
          100: "#fafafa",
        },
        red: {
          500: "#ff3939",
        },
        white: {
          200: "#ffffff",
        },
      },
    },
  },
  plugins: [],
};
