/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#101319",
        brand: "#1463ff",
        cyan: "#00b8d9"
      },
      boxShadow: {
        soft: "0 18px 45px rgba(16, 19, 25, 0.10)"
      }
    }
  },
  plugins: []
};
