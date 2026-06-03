import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        body: ['DM Sans', 'sans-serif'],
      },
      colors: {
        orange: {
          DEFAULT: '#e8622a',
          light: '#f07a45',
          dim: 'rgba(232,98,42,0.12)',
        },
        amber: { DEFAULT: '#d4853a' },
        cream: { DEFAULT: '#f2ece3' },
        charcoal: { DEFAULT: '#0d0c0a' },
        surface: { DEFAULT: '#181610', 2: '#1e1b12' },
      },
    },
  },
  plugins: [],
};
export default config;
