/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: "Roboto Mono, monospace",
    },

    extend: {
      colors: {
        react: "#60d6ff",
      },
      height: {
        screen: "100dvh",
      },
    },
  },
  plugins: [],
};
