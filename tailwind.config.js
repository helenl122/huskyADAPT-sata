/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        dp_reg: ["DynaPuff_400Regular"],
        dp_semibold: ["DynaPuff_600SemiBold"],
        dp_bold: ["DynaPuff_700Bold"],
      },
      colors: {
        primary: "#1E40AF",
      },
    },
  },
  plugins: [],
}