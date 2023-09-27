import daisyui from "daisyui";

export default {
  plugins: [daisyui],
  daisyui: { themes: [], logs: false },
  content: ["./**/*.tsx"],
  theme: {
    container: {
      center: true,
      padding: "10px",
      screens: {
        "2xs": false,
        lg: false,
        md: false,
        sm: false,
        xl: false,
        xs: false,
      },
    },
    fontFamily: {
      sans:
        `"Ubuntu", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif`,
    },
    screens: {
      "2xs": "320px",
      "3xs": "281px",
      xs: "425px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1440px",
      "3xl": "1536px",
    },
  },
};
