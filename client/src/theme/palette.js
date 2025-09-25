// theme/palette.js
const PRIMARY = {
  light: "#B8B8B8",
  main: "#141414",
  dark: "#0E0A0A",
  contrastText: "#fff",
};

const GREY = {
  100: "#F9FAFB",
  200: "#F4F6F8",
  300: "#DFE3E8",
  400: "#C4CDD5",
  500: "#919EAB",
  600: "#637381",
  700: "#454F5B",
  800: "#212B36",
  900: "#161C24",
};

const palette = {
  mode: "dark",
  primary: { ...PRIMARY },
  grey: { ...GREY },
  text: {
    primary: "#fff",
    secondary: GREY[500],
    disabled: GREY[600],
  },
  background: {
    default: PRIMARY.main,
    paper: PRIMARY.main,
  },
  action: {
    active: GREY[500],
    hover: "rgba(255, 255, 255, 0.08)", // hoverOpacity format
    disabled: "rgba(145, 158, 171, 0.48)", // disabledOpacity format
  },
};

export default palette;
