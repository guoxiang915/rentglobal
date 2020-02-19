import { createMuiTheme } from "@material-ui/core/styles";

// theme colors
const colors = {
  primary: {
    black: "#000000",
    white: "#ffffff",
    mainColor: "#d7df23",
    darkColor: "#a3b100",
    mainShadow: "#D7DF234D",
    whiteGrey: "#fafafa",
    lightGrey: "#efefef",
    grey: "#b9b9b9",
    darkGrey: "#525252",
    blackGrey: "#3b3b3b",
    borderGrey: "#e8e8e8",
    errorRed: "#fd6d9f",
    purple: "#8468e2",
    darkPurple: "#63529b"
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
    light: colors.primary.purple,
    main: colors.primary.purple,
    dark: colors.primary.darkPurple
  }
};

// font sizes
const fontSize = {
  fontSizeXS: {
    fontSize: "13px",
    lineHeight: "18px"
  },
  fontSizeS: {
    fontSize: "15px",
    lineHeight: "20px"
  },
  fontSizeM: {
    fontSize: "19px",
    lineHeight: "26px"
  },
  fontSizeL: {
    fontSize: "25px",
    lineHeight: "34px"
  },
  fontSizeXL: {
    fontSize: "31px",
    lineHeight: "42px"
  }
};

// font weights
const fontWeight = {
  fontWeightLight: {
    fontWeight: 100
  },
  fontWeightMedium: {
    fontWeight: "normal"
  },
  fontWeightBold: {
    fontWeight: "bold"
  }
};

// font styles
const fonts = {
  size: fontSize,
  weight: fontWeight
};

// link styles
const links = {
  white: {
    color: colors.primary.white,
    "&:hover": {
      color: colors.primary.white
    }
  },
  normal: {
    color: colors.primary.darkGrey,
    "&:hover": {
      color: colors.primary.mainColor
    }
  },
  normalLight: {
    color: colors.primary.grey,
    "&:hover": {
      color: colors.primary.mainColor
    }
  },
  primary: {
    color: colors.primary.mainColor,
    "&:hover": {
      color: colors.primary.darkColor
    }
  },
  secondary: {
    color: colors.primary.grey,
    "&:hover": {
      color: colors.primary.darkGrey
    }
  },
  secondaryLight: {
    color: colors.primary.lightGrey,
    "&:hover": {
      color: colors.primary.grey
    }
  },
  inverse: {
    "&:hover": {
      color: colors.primary.white
    }
  }
};

// link background styles
const linksBackground = {};

// theme typography variants
const typography = {
  useNextVariants: true,

  mainFont: "Avenir Next",
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
  typography,
  fonts,
  links
};

export default createMuiTheme(theme);
