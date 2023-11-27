/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        backgroundImage: "url('/images/anatol-rurac-XM776JMGLoY-unsplash.jpg')",
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};
