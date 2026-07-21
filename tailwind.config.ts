import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        maroon: {
          50: "#FCE9EC",
          100: "#F6C4CC",
          200: "#EA8B9B",
          300: "#DC5169",
          400: "#D02F4C",
          500: "#C8102E", // primary
          600: "#A80D27",
          700: "#870A1F",
          800: "#650817",
          900: "#43050F",
          950: "#2A030A",
        },
        gold: {
          50: "#FBF7EE",
          100: "#F3E7C9",
          200: "#E6CE93",
          300: "#D8B565",
          400: "#C9A227", // accent
          500: "#B08D22",
          600: "#8C711B",
          700: "#695414",
          800: "#46380D",
          900: "#231C07",
        },
        ink: {
          50: "#F6F5F3",
          100: "#E8E5E0",
          400: "#5C534A",
          700: "#2B241D",
          900: "#1A1410",
        },
        cream: "#FAF7F1",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "Georgia", "serif"],
        body: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "star-pattern": "url('/images/pattern-star.svg')",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out forwards",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
