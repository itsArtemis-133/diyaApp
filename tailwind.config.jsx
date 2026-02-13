/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,css}", // Added css here just in case
    "./src/components/**/*.{js,ts,jsx,tsx}", // Added specific components folder
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}