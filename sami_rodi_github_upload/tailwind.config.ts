import type { Config } from "tailwindcss";

// Palette: deep ink + steel blue + muted brass on warm ivory. Conservative, corporate.
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: { DEFAULT: "#0A1522", 700: "#16304A" },
        panel: "#1B3A57",
        amber: { DEFAULT: "#C9A24A", light: "#E2C67E", 700: "#8A6A22" },
        energy: "#2E9E6B",
        heat: "#D6453D",
        mist: "#F4F2EC",
        ink: "#111827",
        line: "#DCD8CC",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Georgia", "serif"],
      },
      maxWidth: { content: "1200px" },
      boxShadow: {
        soft: "0 1px 0 rgba(10,21,34,.04), 0 10px 30px -12px rgba(10,21,34,.18)",
        glow: "0 10px 30px -10px rgba(201,162,74,.6)",
      },
    },
  },
  plugins: [],
};
export default config;
