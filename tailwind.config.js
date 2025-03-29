/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        dp_reg: ["DynaPuff_400Regular"],
        dp_semibold: ["DynaPuff_600SemiBold"],
        dp_bold: ["DynaPuff_700Bold"],
      },
      colors: {
        fontColor: 'black',
        selectedTabFontColor: "#1D5AD0",
        selectedTabBGColor: "#7090C133",
        tabBGColor: "#DDEEFA",
      },
    },
  },
  plugins: [],
}