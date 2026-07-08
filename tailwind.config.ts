import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  darkMode: ["selector", "[data-theme=\"dark\"]"],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        ink: "var(--ink)",
        card: "var(--card)",
        sub: "var(--sub)",
        dot: "var(--dot)",
        purple: "#C084FC",
        folderblue: "#3B82F6",
        folderred: "#EF4444",
        folderyellow: "#EAB308",
        progressgreen: "#22C55E",
      },
      fontFamily: {
        pixel: ["var(--font-pixel)", "monospace"],
        body: ["var(--font-inter)", "sans-serif"],
      },
      boxShadow: {
        pixel: "3px 3px 0 var(--ink)",
        pixelSm: "2px 2px 0 var(--ink)",
        pixelLg: "6px 6px 0 var(--ink)",
      },
    },
  },
  plugins: [],
};
export default config;
