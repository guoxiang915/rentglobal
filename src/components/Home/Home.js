export const styleSheet = (theme) => ({
  root: {
    // flexGrow: 1,
    display: 'block',
    width: '100%',
    height: '100%',
    background: theme.colors.primary.white,
    minHeight: 'calc(100vh - 245px)',
  },

  landingBoardWrapper: {
    display: 'block',
    width: '100%',
    maxHeight: 'calc(100vh + 50px)',
    position: 'relative',
    overflow: 'hidden',
  },

  landingBoardImage: {
    width: '100%',
    [theme.breakpoints.down('xs')]: {
      width: '640px',
      position: 'relative',
      right: 'calc(640px - 100vw)',
    },
  },

  landingBoardImageHidden: {
    opacity: 0,
    position: 'absolute',
    transition: 'opacity 1s',
  },

  landingBoard: {
    height: '100%',
    maxHeight: 'calc(100vh - 100px)',
    padding: '168px 16px 16px 16px',
    [theme.breakpoints.down('sm')]: {
      padding: '96px 16px 16px 16px',
    },
    [theme.breakpoints.down('xs')]: {
      padding: '24px 16px 8px 16px',
    },
  },

  searchWrapper: {
    width: '100%',
    boxShadow: '0px 24px 24px #0000001A;',
    padding: `${theme.spacing(4)}px ${theme.spacing(4.5)}px`,
    borderRadius: 8,
    [theme.breakpoints.down('sm')]: {
      boxShadow: '0px 14px 14px #0000001A',
      padding: `${theme.spacing(3)}px`,
    },
    [theme.breakpoints.down('xs')]: {
      boxShadow: '0px 14px 14px #0000001A',
      padding: `${theme.spacing(2)}px 10px`,
    },
  },

  landingTitle: {
    fontSize: '31px',
    lineHeight: '42px',
    [theme.breakpoints.down('sm')]: {
      fontSize: '25px',
      lineHeight: '34px',
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: '19px',
      lineHeight: '26px',
    },
  },

  landingSubtitle: {
    fontSize: '16px',
    [theme.breakpoints.down('sm')]: {
      fontSize: '14px',
    },
  },

  searchInput: {
    marginTop: 14,
    position: 'relative',
    [theme.breakpoints.down('sm')]: {
      marginTop: 8,
    },
  },

  searchInputProps: {
    fontSize: '19px',
    lineHeight: '26px',
    fontWeight: 500,
    fontStyle: 'normal',
    color: theme.colors.primary.darkGrey,
    [theme.breakpoints.down('xs')]: {
      fontSize: '15px',
      lineHeight: '20px',
    },
  },

  limitedSearchInputProps: {
    marginRight: 178,
    [theme.breakpoints.down('sm')]: {
      marginBottom: 37,
      marginRight: -16,
    },
  },

  inputButtonIcon: {
    minWidth: 37,
    height: 37,
    position: 'absolute',
    right: 5,
    bottom: 5,
    margin: 0,
  },

  searchInputIcon: {
    [theme.breakpoints.up('sm')]: {
      minWidth: 43,
      height: 43,
    },
  },

  actionButtonsWrapper: {},

  fixedWith: {
    maxWidth: 1024 + 44,
    width: '100%',
    paddingLeft: 22,
    paddingRight: 22,
    overflow: 'hidden',
    [theme.breakpoints.down('sm')]: {
      paddingLeft: 22,
      paddingRight: 22,
    },
  },

  blockWrapper: {
    paddingTop: 70,
    paddingBottom: 87,
    [theme.breakpoints.down('sm')]: {
      paddingTop: 24,
      paddingBottom: 40,
    },
  },

  blockTitleWrapper: {
    paddingTop: 50,
    paddingBottom: 40,
    [theme.breakpoints.down('sm')]: {
      paddingTop: 24,
      paddingBottom: 16,
    },
  },

  blockTitle: {
    ...theme.fonts.size.fontSizeL,
    ...theme.fonts.weight.fontWeightBold,
    textAlign: 'center',
    [theme.breakpoints.down('sm')]: {
      ...theme.fonts.size.fontSizeS,
    },
  },

  blockContentWrapper: {
    paddingTop: 24,
    [theme.breakpoints.down('sm')]: {
      paddingTop: 0,
    },
  },

  textStepWrapper: {
    marginBottom: 52,
    [theme.breakpoints.down('sm')]: {
      marginBottom: 24,
    },
  },

  textStepIconWrapper: {
    paddingRight: 21,
  },

  textStepIcon: {
    width: 45,
    height: 45,
    color: theme.colors.primary.grey,
    background: theme.colors.primary.whiteGrey,
    fontSize: '20px',
    borderRadius: '50%',
    [theme.breakpoints.down('sm')]: {
      width: 36,
      height: 36,
      marginRight: 12,
      fontSize: '16px',
    },
  },

  textStepActiveIcon: {
    color: theme.colors.primary.white,
    background: theme.colors.primary.mainColor,
    boxShadow: `0px 6px 12px ${theme.colors.primary.mainShadow}`,
  },

  textStepTitle: {
    fontSize: '20px',
    [theme.breakpoints.down('sm')]: {
      fontSize: '16px',
    },
  },

  textStepExpandIcon: {
    marginLeft: 14,
    color: theme.colors.primary.grey,
    fontWeight: 100,
    width: 12,
    height: 7,
  },

  textStepContent: {
    maxLines: 4,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    fontSize: '16px',
    [theme.breakpoints.down('sm')]: {
      fontSize: '14px',
    },
  },

  imgHelpStepper: {
    position: 'relative',
    height: 556,
    zIndex: 1,
  },

  imgHelpStepWrapper: {
    paddingLeft: 'calc(100% - 363px - 20px)',
  },

  imgHelpStep: {
    position: 'absolute',
    boxShadow: '0px 18px 18px #0000001A',
    borderRadius: theme.spacing(),
    width: 363,
    height: 500,
    opacity: 1,
    transition: 'transform .3s, opacity .4s',
  },

  imgHelpStepHidden: {
    transform: 'translate(50px, 0)',
    opacity: 0,
  },

  imgHelpBkWrapper: {
    top: 56,
    left: 'calc(100% - 363px)',
    zIndex: -1,
    position: 'absolute',
  },

  imgHelpBk: {
    background: theme.colors.primary.mainColor,
    borderRadius: theme.spacing(),
    width: 363,
    height: 500,
    position: 'relative',
  },

  dotStepper: {
    position: 'absolute',
    width: '100%',
    justifyContent: 'center',
    bottom: 10,
    background: 'transparent',
  },

  dotStepperLandingBlock: {
    position: 'relative',
    width: 'fit-content',
    height: '100%',
    left: -8,
    background: 'transparent',
  },

  dotLandingBlockStyle: {
    width: 12,
    height: 12,
    margin: 6,
    background: theme.colors.primary.darkGrey,
    opacity: 0.35,
  },

  dotStyle: {
    width: 12,
    height: 12,
    margin: 6,
    background: theme.colors.primary.white,
    opacity: 0.35,
  },

  dotActiveStyle: {
    opacity: 1,
  },

  mobileHeaderSlider: {
    paddingTop: 20,
    paddingBottom: 20,
  },

  textMedium: {
    fontSize: '20px',
  },

  divider: {
    width: '100%',
  },

  allLatestButton: {
    paddingTop: 54,
    paddingBottom: 96,
    [theme.breakpoints.down('sm')]: {
      paddingTop: 24,
      paddingBottom: 0,
    },
  },

  whiteShadowButton: {
    background: theme.colors.primary.white,
    color: theme.colors.primary.darkGrey,
    boxShadow: `0px 6px 12px #${theme.colors.primary.white}4D`,
    '&:hover': {
      background: theme.colors.primary.darkColor,
      color: theme.colors.primary.white,
    },
  },

  registerBlock: {
    background: theme.colors.primary.mainColor,
  },

  homeRegisterTitle: {
    paddingTop: 0,
    color: 'white',
    [theme.breakpoints.down('sm')]: {
      paddingTop: 8,
    },
  },

  homeRegisterContent: {
    position: 'relative',
    paddingTop: 40,
    paddingBottom: 40,
    maxWidth: 724,
    [theme.breakpoints.down('sm')]: {
      paddingTop: 24,
      paddingBottom: 24,
      maxWidth: '80%',
    },
  },

  homeRegisterArrow: {
    width: 56,
    height: 56,
    position: 'absolute',
    top: 'calc(50% - 12px)',
    cursor: 'pointer',
    [theme.breakpoints.down('sm')]: {
      width: 48,
      height: 48,
    },
  },

  homeRegisterArrowButton: {
    width: 56,
    height: 56,
    [theme.breakpoints.down('sm')]: {
      width: 48,
      height: 48,
    },
  },

  prosWrapper: {
    paddingTop: 45,
    paddingBottom: 50,
    [theme.breakpoints.down('sm')]: {
      paddingLeft: 40,
      paddingRight: 40,
    },
  },

  prosIcon: {
    width: 40,
    height: 40,
    color: theme.colors.primary.mainColor,
    [theme.breakpoints.down('sm')]: {
      width: 27,
      height: 27,
    },
  },

  newsLetterWrapper: {
    background: theme.colors.primary.whiteGrey,
  },

  receiveNewsletter: {
    maxWidth: 400,
    width: '100%',
  },

  socialIconsWrapper: {
    height: 55,
  },

  contactInfoWrapper: {
    paddingTop: 58,
    paddingBottom: 20,
  },

  landingButtonsWrapper: {
    maxWidth: 'calc(194px * 2 + 44px)',
  },

  landingButton: {
    width: 194,
    margin: 4,
    padding: 7,
  },
});
