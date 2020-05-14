export const styleSheet = (theme) => ({
  root: {
    // flexGrow: 1,
    display: "block",
    width: "100%",
    height: "100%",
    background: theme.colors.primary.white,
    minHeight: "calc(100vh - 245px)",
  },

  container: {
    width: "100%",
    overflowX: "hidden",
    paddingLeft: 32,
    paddingRight: 27,
    [theme.breakpoints.down("xs")]: {
      paddingLeft: 17,
      paddingRight: 13,
    },
  },

  searchboxWrapper: {
    width: "100%",
    justifyContent: "center",
    paddingTop: 19,
    paddingBottom: 19,
    overflow: "visible",
    background: theme.colors.primary.whiteGrey,
    [theme.breakpoints.down("xs")]: {
      paddingTop: 15,
      paddingBottom: 15,
    },
  },

  searchInput: {
    position: "relative",
    width: "100%",
  },

  searchRootProps: {
    border: "none",
    "&::before": {
      border: "none !important",
    },
    "&::after": {
      border: "none !important",
    },
  },

  searchInputProps: {
    fontSize: "17px",
    lineHeight: "23px",
    padding: "16px 26px",
    fontWeight: 500,
    color: theme.colors.primary.darkGrey,
    border: "none",
    [theme.breakpoints.down("xs")]: {
      fontSize: "15px",
      lineHeight: "20px",
    },
  },

  searchInputWrapper: {
    position: "absolute",
    right: 5,
    bottom: 5,
    margin: 0,
  },

  searchInputIcon: {
    minWidth: 43,
    height: 43,
    color: theme.colors.primary.white,
    [theme.breakpoints.down("xs")]: {
      minWidth: 37,
      height: 37,
    },
  },

  locationsSelected: {
    height: 43,
    minWidth: 200,
    background: theme.colors.primary.white,
    [theme.breakpoints.down("xs")]: {
      minWidth: 37,
      height: 37,
    },
  },

  showOnMap: {
    width: 215,
    height: 53,
    marginLeft: 16,
    background: theme.colors.primary.white,
  },

  filtersWrapper: {
    paddingTop: 12,
    paddingBottom: 4,
    background: theme.colors.primary.white,
    borderBottom: `1px solid ${theme.colors.primary.borderGrey}`,
    // overflowX: 'auto',
  },

  filterWrapper: {
    marginRight: 10,
    marginBottom: 6,
  },

  filterPaneWrapper: {
    background: "transparent",
    boxShadow: "none",
    overflow: "visible",
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
  },

  filterContentWrapper: {
    position: "relative",
    top: 15,
    boxShadow: "0px 2px 24px #0000001A",
    border: `1px solid ${theme.colors.primary.borderGrey}`,
    "&::before": {
      position: "absolute",
      top: -8,
      left: 36,
      content: '" "',
      width: 16,
      height: 16,
      background: theme.colors.primary.white,
      border: `1px solid ${theme.colors.primary.borderGrey}`,
      borderBottom: "none",
      borderRight: "none",
      transform: "rotate(45deg)",
    },
  },

  locationWrapper: {
    width: "100%",
    height: 52,
    position: "relative",
  },

  locationPaneWrapper: {
    position: "absolute",
    width: "100%",
    border: `1px solid ${theme.colors.primary.mainColor}`,
    borderRadius: 27,
    background: theme.colors.primary.white,
    zIndex: 3,
  },

  boxShadow: {
    boxShadow: "5px 5px 6px #0000000A",
  },

  locationContentWrapper: {
    width: "100%",
    maxHeight: 300,
    overflowY: "auto",
  },

  locationList: {
    borderTop: `1px solid ${theme.colors.primary.borderGrey}`,
    marginLeft: 20,
    marginRight: 20,
    paddingTop: 25,
    paddingBottom: 20,
  },

  rightArrow: {
    width: 290,
  },

  filterPanel: {
    padding: "14px 18px",
  },

  filterLine: {
    marginBottom: 4,
  },

  checkIcon: {
    borderRadius: "50%",
    border: `1px solid ${theme.colors.primary.mainColor}`,
    boxShadow: `0px 6px 12px ${theme.colors.primary.mainColor}4D`,
    color: theme.colors.primary.white,
    background: theme.colors.primary.mainColor,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 28,
    height: 28,
  },

  filterButton: {
    width: "auto",
    color: `${theme.colors.primary.darkGrey} !important`,
    background: `${theme.colors.primary.white} !important`,
    border: `1px solid ${theme.colors.primary.lightGrey}`,
    fontWeight: 400,
    "&:hover": {
      borderColor: theme.colors.primary.darkGrey,
      color: `${theme.colors.primary.darkGrey} !important`,
    },
  },

  filterSelectedButton: {
    border: `1px solid ${theme.colors.primary.darkGrey}`,
  },

  filterValuesWrapper: {
    marginTop: 8,
    width: "100%",
  },

  filterValue: {
    marginRight: 10,
    marginBottom: 6,
    color: theme.colors.primary.white,
  },

  checkbox: {
    borderColor: theme.colors.primary.borderGrey,
  },

  numberFilterPanel: {
    width: 400,
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
  },

  numberField: {
    width: 175,
  },

  priceSlider: {
    width: "calc(100% - 32px)",
    marginTop: 50,
    marginLeft: 16,
    marginRight: 16,
  },

  priceFilterPanel: {
    width: 532,
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
  },

  priceFilters: {
    padding: "28px 24px",
  },

  priceInputWrapper: {
    marginTop: 20,
    marginBottom: 20,
  },

  moreFilterDialog: {
    width: 590,
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
  },

  applyButton: {
    width: 175,
    [theme.breakpoints.down("xs")]: {
      width: "auto",
    },
  },

  valuesWrapper: {
    width: "100%",
    position: "relative",
    background: theme.colors.primary.white,
    minHeight: 500,
  },

  officesContainer: {
    width: "100%",
  },

  officesWrapper: {
    alignItems: "flex-start",
    marginTop: 24,
    marginBottom: 200,
    [theme.breakpoints.down("xs")]: {
      marginBottom: 40,
      marginLeft: 22,
      marginRight: 22,
    },
  },

  offices: {
    width: 1010,
    marginBottom: 14,
    [theme.breakpoints.down("md")]: {
      width: 753,
    },
    [theme.breakpoints.down("sm")]: {
      width: 502,
    },
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
  },

  officesWithMap: {
    width: 502,
    [theme.breakpoints.down("md")]: {
      width: 272,
    },
    [theme.breakpoints.down("sm")]: {
      width: 272,
    },
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
  },

  smallOfficesWrapper: {
    marginRight: 35,
    [theme.breakpoints.down("sm")]: {
      marginRight: 22,
    },
  },

  officeWrapper: {
    position: "relative",
    cursor: "pointer",
    width: 235,
    height: 300,
    marginBottom: 24,
    [theme.breakpoints.down("xs")]: {
      width: "calc(100vw - 44px)",
    },
  },

  showOnMapWrapper: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    zIndex: 0,
    width: "50%",
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
  },
});
