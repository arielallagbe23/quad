import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        lime: "#C6FF00",
        navy: "#0A2540",
        cloud: "#F5F7FA",
        paper: "#FFFFFF",
        ink: "#18202A",
        line: "#DFE5EC"
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["var(--font-playfair)", "Playfair Display", "ui-serif", "Georgia", "serif"]
      },
      boxShadow: {
        soft: "0 16px 40px rgba(10, 37, 64, 0.08)",
        focus: "0 0 0 4px rgba(198, 255, 0, 0.35)"
      },
      borderRadius: {
        "3xl": "1.5rem"
      },
      transitionTimingFunction: {
        premium: "cubic-bezier(0.2, 0.8, 0.2, 1)"
      }
    }
  },
  plugins: []
};

export default config;
