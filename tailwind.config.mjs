/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        pink: {
          100: "#ffe4e6",
          400: "#f472b6",
          500: "#ec4899",
          600: "#db2777",
        },
      },
      fontFamily: {
        sans: ["Fredoka One", "Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};
