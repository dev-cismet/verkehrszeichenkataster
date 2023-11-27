/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        backgroundImage: "url('/images/anatol-rurac-XM776JMGLoY-unsplash.jpg')",
      },
      colors: {
        primary: "#1677FF",
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};
