import daisyui from "npm:daisyui@3.7.7";
import tailwindcssTypography from 'npm:@tailwindcss/typography'
import tailwindcssForms from 'npm:@tailwindcss/forms'
import tailwindScrollbar from 'npm:tailwind-scrollbar'
import tailwindContainerQueries from 'npm:@tailwindcss/container-queries'

export default {
  plugins: [
    tailwindcssTypography,
		tailwindScrollbar,
    tailwindContainerQueries,
		tailwindcssForms({
      strategy: 'class',
		}),
    daisyui,
  ],
  daisyui: { themes: [], logs: false },
  content: ["./**/*.tsx"],
  theme: {
    container: {
      center: true,
      padding: "10px",
      // screens: {
      //   "2xs": false,
      //   lg: false,
      //   md: false,
      //   sm: false,
      //   xl: false,
      //   xs: false,
      // },
    },
    fontFamily: {
      sans: `"Open Sans"`,
    },
    screens: {
      // "2xs": "320px",
      // "3xs": "281px",
      xs: "425px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      // "2xl": "1440px",
      // "3xl": "1536px",
    },
  },
};
