import daisyui from "npm:daisyui@3.7.7";
import typography from "npm:@tailwindcss/typography";

export default {
  content: ["./**/*.tsx"],
  daisyui: { themes: [], logs: false },
  plugins: [
    typography,
    daisyui,
  ],
  theme: {
    container: {
      center: true,
      padding: "10px",
    },
    fontFamily: {
      sans: `"Open Sans"`,
    },
    screens: {
      xs: "425px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
    },
  },
};
