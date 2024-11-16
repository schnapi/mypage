/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,vue}",
  ],
  darkMode: "selector", // add this line
  theme: {
    extend: {},
  },
  plugins: [
    require('tailwindcss-tables')(),
  ],
}
// https://stackoverflow.com/questions/66288645/vite-does-not-build-tailwind-based-on-config