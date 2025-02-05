import type { Config } from 'tailwindcss'

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      xl: "1440px"
    },
    extend: {},
  },
  plugins: [],
} satisfies Config

