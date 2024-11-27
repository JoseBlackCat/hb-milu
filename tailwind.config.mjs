/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        'k-pink': '#FFB7C5',
        'k-blue': '#8BB7F0',
        'k-purple': '#E6B8F5',
      },
      fontFamily: {
        'noto-kr': ['Noto Sans KR', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
