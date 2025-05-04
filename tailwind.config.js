/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/app/**/*.{js,jsx,ts,tsx}", "./src/components/**/*.{js,jsx,ts,tsx}", "./src/hoc/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        coral: {
          50: '#FFE5E7',
          300: '#FF575F',
          350: '#FF565E',
          400: '#FF464F',
          800: '#623A42',
        },
        carrot: {
          50: '#FFEFE3',
          300: '#FF974A',
          400: '#FF8A34',
          800: '#624D3B',
        },
        sunglow: {
          50: '#FEF3D9',
          300: '#FFC542',
          400: '#FFBC25',
          800: '#625B39',
        },
        meadow: {
          50: '#D4F5E9',
          250: '#3ED598',
          300: '#3DD598',
          400: '#25C685',
          800: '#286053',
          1000: '#1A3B34',
        },
        cobalt: {
          50: '#E3EEFF',
          300: '#0062FF',
          400: '#005DF2',
          800: '#163E72',
        },
        royal: {
          50: '#EDEAFD',
          300: '#755FE2',
          400: '#6952DC',
          800: '#393D69',
        },
        gray: {
          50: '#BEC7C5',
          100: '#B8C2C0',
          150: '#B7EDDA',
          200: '#96A7AF',
          300: '#899A96',
          400: '#475E69',
          700: '#30444E',
          750: '#2A3C44',
        },
        light: {
          1: '#EDF1FA',
          2: '#E4E9F3',
          3: '#D8D8D8',
        }
      },
      fontFamily: {
        thin: ["thin"],
        regular: ["regular"],
        semibold: ["semibold"],
        bold: ["bold"],
        heavy: ["heavy"],
      },
    }
  },
  plugins: [],
  // use the `class` strategy, which requires a `.dark` class on the `html`.
  darkMode: 'class',
}