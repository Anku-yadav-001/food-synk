import type { Config } from "tailwindcss";

// Fresh harvest theme – change colors here and the whole app follows.
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        canvas: "#F5F8EF",           // page background
        surface: "#FFFFFF",          // cards, sheets, inputs
        line: "#DCE5D3",             // borders, dividers
        ink: { DEFAULT: "#1B2A21", soft: "#5C6B62" }, // text
        primary: { DEFAULT: "#2E7D4F", dark: "#256641", soft: "#E3F0E7" }, // fresh green
        accent: { DEFAULT: "#F2994A", soft: "#FDEBD8", deep: "#B85F12" },  // warm orange
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
        hand: ["var(--font-hand)", "cursive"],
      },
    },
  },
  plugins: [],
};
export default config;
