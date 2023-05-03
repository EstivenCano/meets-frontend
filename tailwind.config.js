/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./public/**/*.{js,ts,jsx,tsx,svg}",
  ],
  theme: {
    extend: {
      colors: {
        background: "rgb(var(--background-rgb))",
        foreground: "rgb(var(--foreground-rgb))",
        text: "rgb(var(--foreground-rgb))",
      },
    },
  },
  plugins: [],
};
