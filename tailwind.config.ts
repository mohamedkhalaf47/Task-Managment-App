import type { Config } from "tailwindcss";

export default {
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
      },
      boxShadow: {
        '3xl':"1px 7px 12px rgba(8, 18, 69, 0.1)",
        '2xl':"0 0 1rem rgba(0, 0, 0, 0.3)",
      },
      gridTemplateColumns:{
        'autoFill': 'repeat(auto-fill, minmax(300, 1fr))'
      }
    },
  },
  plugins: [],
} satisfies Config;
