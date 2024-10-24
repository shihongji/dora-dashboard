import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        'cp-light-blue': "#8ECAE6",
        'cp-blue': "#219EBC",
        'cp-dark-blue': "#023047",
        'cp-yellow': "#FFB703",
        'cp-orange': "#FB8500",
        'cp-bg-light': "#fefae0",
      },
    },
  },
  plugins: [],
};
export default config;
