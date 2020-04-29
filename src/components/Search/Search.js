export const styleSheet = (theme) => ({
  root: {
    // flexGrow: 1,
    display: 'block',
    width: '100%',
    height: '100%',
    background: theme.colors.primary.white,
    minHeight: 'calc(100vh - 245px)',
  },

  container: {
    width: '100%',
    overflowX: 'hidden',
    paddingLeft: 32,
    paddingRight: 27,
    [theme.breakpoints.down('xs')]: {
      paddingLeft: 17,
      paddingRight: 13,
    },
  },

  searchboxWrapper: {
    width: '100%',
    justifyContent: 'center',
    paddingTop: 19,
    paddingBottom: 19,
    [theme.breakpoints.down('xs')]: {
      paddingTop: 15,
      paddingBottom: 15,
    },
  },

  searchInput: {
    position: 'relative',
    maxWidth: 507,
    width: '100%',
  },

  searchInputProps: {
    fontSize: '17px',
    lineHeight: '23px',
    padding: '16px 26px',
    fontWeight: 500,
    fontStyle: 'bold',
    color: theme.colors.primary.darkGrey,
    [theme.breakpoints.down('xs')]: {
      fontSize: '15px',
      lineHeight: '20px',
    },
  },

  searchInputIcon: {
    minWidth: 43,
    height: 43,
    position: 'absolute',
    right: 5,
    bottom: 5,
    margin: 0,
    color: theme.colors.primary.white,
    [theme.breakpoints.down('xs')]: {
      minWidth: 37,
      height: 37,
    },
  },

  searchByMap: {
    width: 215,
    height: 34,
    marginLeft: 16,
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
    background: 'transparent',
    boxShadow: 'none',
    overflow: 'visible',
  },

  filterContentWrapper: {
    position: 'relative',
    top: 15,
    boxShadow: '0px 2px 4px #00000014',
    border: `1px solid ${theme.colors.primary.borderGrey}`,
    [theme.breakpoints.down('sm')]: {
      left: -29,
    },
    '&::before': {
      position: 'absolute',
      top: -8,
      left: 36,
      content: '" "',
      width: 16,
      height: 16,
      background: theme.colors.primary.white,
      border: `1px solid ${theme.colors.primary.borderGrey}`,
      borderBottom: 'none',
      borderRight: 'none',
      transform: 'rotate(45deg)',
    },
  },

  filterPanel: {
    padding: '14px 18px',
  },

  filterLine: {
    marginBottom: 4,
  },

  checkIcon: {
    borderRadius: '50%',
    border: `1px solid ${theme.colors.primary.mainColor}`,
    boxShadow: `0px 6px 12px ${theme.colors.primary.mainColor}4D`,
    color: theme.colors.primary.white,
    background: theme.colors.primary.mainColor,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 28,
    height: 28,
  },

  filterButton: {
    width: 'auto',
    color: `${theme.colors.primary.darkGrey} !important`,
    background: `${theme.colors.primary.white} !important`,
    border: `1px solid ${theme.colors.primary.lightGrey}`,
    fontWeight: 400,
    '&:hover': {
      borderColor: theme.colors.primary.darkGrey,
      color: `${theme.colors.primary.darkGrey} !important`,
    },
  },

  filterSelectedButton: {
    border: `1px solid ${theme.colors.primary.darkGrey}`,
  },

  filterValuesWrapper: {
    marginTop: 8,
    width: '100%',
  },

  filterValue: {
    marginRight: 10,
    marginBottom: 6,
    color: theme.colors.primary.white,
  },

  checkbox: {
    borderColor: theme.colors.primary.borderGrey,
  },

  numberField: {
    width: 175,
  },

  applyButton: {
    width: 175,
  },

  valuesWrapper: {
    width: '100%',
    position: 'relative',
    background: theme.colors.primary.white,
    minHeight: 500,
  },

  officesContainer: {
    width: '100%',
  },

  officesWrapper: {
    alignItems: 'flex-start',
    marginTop: 24,
    marginBottom: 200,
    [theme.breakpoints.down('xs')]: {
      marginBottom: 40,
      marginLeft: 22,
      marginRight: 22,
    },
  },

  offices: {
    width: 1010,
    marginBottom: 14,
    [theme.breakpoints.down('md')]: {
      width: 753,
    },
    [theme.breakpoints.down('sm')]: {
      width: 502,
    },
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },

  officesWithMap: {
    width: 502,
    [theme.breakpoints.down('md')]: {
      width: 272,
    },
    [theme.breakpoints.down('sm')]: {
      width: 272,
    },
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },

  smallOfficesWrapper: {
    marginRight: 35,
    [theme.breakpoints.down('sm')]: {
      marginRight: 22,
    },
  },

  officeWrapper: {
    position: 'relative',
    cursor: 'pointer',
    width: 235,
    height: 300,
    marginBottom: 24,
    [theme.breakpoints.down('xs')]: {
      width: 'calc(100vw - 44px)',
    },
  },

  searchByMapWrapper: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    zIndex: 2,
    width: '50%',
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },
});
