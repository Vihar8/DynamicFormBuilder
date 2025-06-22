/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  // content: [],
  purge: [
    "./src/pages/**/*.{js,jsx}",
    "./src/components/**/**/*.{js,jsx}",
    "./src/container/**/*.{js,jsx}",
    "./src/**/*.{js,jsx}",
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    container: {
      center: true,
    },
    borderWidth: {
      0: "0px",
      0.5: "0.5px",
      1: "1px",
      1.5: "1.5px",
      2: "2px",
      3: "3px",
      4: "4px",
      5: "5px",
    },
    extend: {
      padding: {
        sm: "0.5rem",
        md: "1rem",
        lg: "1.5rem",
        xl: "3rem",
      },
      borderRadius: {
        default: "5px",
        badge: "10px",
      },
      fontFamily: {
        sans: "Poppins",
      },
      colors: {
        primary: {
        //   Color1: "#138708",
          Color1: "#22C55E",
          Color2: "#000000",
          Color3: "#6F6F6F",
          Color4: "#1677FF",
          Color5: "#00000080",
          Color6: "#FFFFFF",
          Color7: "#222222"
        },
        message: {
          Info: "#2196F3",
          Error: "#E80049",
          Warning: "#FF9800",
          Success: "#4CAF50",
        },
        other: {
          Gray1: "#474D6A",
          Gray2: "#F3F3F3",
          Gray3: "#767676",
          Gray4: "#F8F9FA",
          Gray5: "#CCCCCC",
          Gray6: "#A7A5A6",
          Gray7: "#E7E7E7",
        },
      },
      letterSpacing: {
        default: "0.5px",
        1: "1px",
      },
      lineHeight: {
        200: 2,
        175: 1.75,
        170: 1.7,
        160: 1.6,
        150: 1.5,
        130: 1.3,
        120: 1.2,
        116: 1.16,
      },
      fontSize: {
        h1: "72px",
        h2: "60px",
        h3: "48px",
        h4: "32px",
        h5: "24px",
        h6: "18px",
        largetext: "18px",
        mediumtext: "16px",
        normaltext: "14px",
        smalltext: "12px",
        extrasmalltext: "10px",
        subtitle1: "22px",
        subtitle2: "20px",
        body1: "16px",
        body2: "14px",
        body3: "14px",
      },
      boxShadow: {
        card: "0px 0px 20px rgba(0, 0, 0, 0.1)",
        badge: "0px 0px 4px rgba(0, 0, 0, 0.25)",
        discount: "1px 1px 2px rgba(0, 0, 0, 0.25)",
        modal: "0px 4px 16px rgba(0, 0, 0, 0.16)",
        menu: "0px 5px 10px rgba(0, 0, 0, 0.1)",
      },
    },
  },
  variants: {
    extend: {},
    float: ['responsive', 'direction'],
    margin: ['responsive', 'direction'],
    padding: ['responsive', 'direction'],
    left: ['responsive', 'direction'],
    right: ['responsive', 'direction'],
  },
  plugins: [
    require('tailwindcss-dir')(),
  ],
};
