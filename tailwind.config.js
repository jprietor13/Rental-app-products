/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eff8ff",
          100: "#dbefff",
          200: "#bfe2ff",
          300: "#93d0ff",
          400: "#60b6ff",
          500: "#3a94ff",
          600: "#2470ff",
          700: "#1f56ef",
          800: "#1f47c1",
          900: "#1f3f99",
        },
      },
      boxShadow: {
        soft: "0 10px 30px rgba(15, 23, 42, 0.08)",
        lift: "0 14px 40px rgba(15, 23, 42, 0.12)",
      },
    },
  },
  plugins: [],
};

