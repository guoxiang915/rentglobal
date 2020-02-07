import { createMuiTheme } from "@material-ui/core/styles";

// theme colors
const colors = {
  primary: {
    black: "#000000",
    white: "#ffffff",
    mainColor: "#d7df23",
    darkColor: "#a3b100",
    darkGrey: "#525252",
    grey: "#b9b9b9",
    lightGrey: "#fafafa",
    borderGrey: "#e8e8e8",
    errorRed: "#fd6d9f",
    lightPink: "#8468e2",
    pink: "#8468e2",
    darkPink: "#63529b"
  }
};

// theme palettes
const palette = {
  primary: {
    light: colors.primary.mainColor,
    main: colors.primary.mainColor,
    dark: colors.primary.darkColor
  },
  secondary: {
    light: colors.primary.lightGrey,
    main: colors.primary.grey,
    dark: colors.primary.darkGrey
  },
  third: {
    light: colors.primary.lightPink,
    main: colors.primary.pink,
    dark: colors.primary.darkPink
  }
};

// theme typography variants
const typography = {
  useNextVariants: true,

  mainFont: "Roboto",
  headline: {
    fontWeight: "normal",
    fontSize: "24px",
    color: colors.primary.black
  },
  notificationHeadline: {
    fontWeight: "normal",
    fontSize: "16px",
    color: colors.primary.black
  },
  subtitle: {
    fontWeight: "normal",
    fontSize: "16px",
    color: colors.primary.black
  },
  sectionHeaders: {
    textTransform: "uppercase",
    fontWeight: "normal",
    fontSize: "12px",
    color: colors.primary.grey
  },
  primaryBody: {
    fontWeight: "normal",
    fontSize: "16px",
    color: colors.primary.darkGrey
  },
  secondaryBody: {
    fontWeight: "normal",
    fontSize: "16px",
    color: colors.primary.grey
  },
  primarySmallBody: {
    fontWeight: "normal",
    fontSize: "14px",
    color: colors.primary.darkGrey
  },
  secondarySmallBody: {
    fontWeight: "normal",
    fontSize: "14px",
    color: colors.primary.grey
  },
  caption: {
    fontWeight: "normal",
    fontSize: "12px",
    color: colors.primary.grey
  },
  errorMessage: {
    fontWeight: "normal",
    fontSize: "12px",
    color: colors.primary.errorRed
  }
};

// A theme with custom primary and secondary color.
// It's optional.
const theme = {
  colors,
  palette,
  typography
};

export default createMuiTheme(theme);
