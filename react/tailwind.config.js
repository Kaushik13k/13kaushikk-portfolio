/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "soft-beige": "#E5E2CC",
        // "soft-beige": "#B6B59C",
        "dark-brownish-black": "#22200F",
        "grayish-brown": "#85826E",
        "muted-olive": "#908D78",
      },
    },
  },
  plugins: [],
};
