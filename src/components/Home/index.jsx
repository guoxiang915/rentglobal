import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import PropTypes from "prop-types";
import { Trans, withTranslation } from "react-i18next";
import withWidth, { isWidthDown } from "@material-ui/core/withWidth";
import { Grid, Card, Hidden, MobileStepper, Collapse } from "@material-ui/core";
import {
  LinkedIn,
  Facebook,
  Instagram,
  Twitter,
  KeyboardArrowLeft,
  KeyboardArrowRight
} from "@material-ui/icons";
import {
  Box,
  Row,
  Column,
  Stretch,
  TextField,
  Button,
  Link,
  Typography,
  Divider,
  SearchIcon,
  TessiIcon,
  ArrowDownIcon,
  ArrowUpIcon,
  HeartIcon,
  EmojiIcon,
  CalendarIcon,
  ArrowRightAltIcon,
  CheckIcon
} from "../../common/base-components";
import { OfficeItem } from "../../common/base-layouts";
import Carousel from "@brainhubeu/react-carousel";
import { emailValidation } from "../../utils/validators";
import { getRecommendedOffices } from "../../api/endpoints";

// load assets
import headerimg from "../../assets/img/img_header.jpg";
import headerimgL from "../../assets/img/img_header@2x.jpg";
import gallery1 from "../../assets/img/img_gallery_01@2x.png";
import gallery2 from "../../assets/img/img_gallery_02@2x.png";
import gallery3 from "../../assets/img/img_gallery_03@2x.png";

const styleSheet = theme => ({
  root: {
    // flexGrow: 1,
    display: "block",
    width: "100%",
    height: "100%",
    background: theme.colors.primary.white,
    minHeight: "calc(100vh - 250px)",
    [theme.breakpoints.down("sm")]: {
      minHeight: "calc(100vh - 166px)"
    }
  },

  landingBoardWrapper: {
    display: "block",
    width: "100%",
    maxHeight: "calc(100vh + 50px)",
    position: "relative",
    overflow: "hidden"
  },

  landingBoardImage: {
    width: "100%",
    [theme.breakpoints.down("xs")]: {
      width: "640px",
      position: "relative",
      right: "calc(640px - 100vw)"
    }
  },

  landingBoardImageHidden: {
    opacity: 0,
    position: "absolute",
    transition: "opacity 1s"
  },

  landingBoard: {
    height: "100%",
    maxHeight: "calc(100vh - 100px)",
    padding: "168px 16px 16px 16px",
    [theme.breakpoints.down("sm")]: {
      padding: "96px 16px 16px 16px"
    },
    [theme.breakpoints.down("xs")]: {
      padding: "24px 16px 8px 16px"
    }
  },

  searchWrapper: {
    width: "100%",
    boxShadow: "0px 24px 24px #0000001A;",
    padding: `${theme.spacing(4)}px ${theme.spacing(4.5)}px`,
    borderRadius: 8,
    [theme.breakpoints.down("sm")]: {
      boxShadow: "0px 14px 14px #0000001A",
      padding: `${theme.spacing(3)}px`
    },
    [theme.breakpoints.down("xs")]: {
      boxShadow: "0px 14px 14px #0000001A",
      padding: `${theme.spacing(2)}px 10px`
    }
  },

  landingTitle: {
    fontSize: "31px",
    lineHeight: "42px",
    [theme.breakpoints.down("sm")]: {
      fontSize: "25px",
      lineHeight: "34px"
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "19px",
      lineHeight: "26px"
    }
  },

  landingSubtitle: {
    fontSize: "16px",
    [theme.breakpoints.down("sm")]: {
      fontSize: "14px"
    }
  },

  searchInput: {
    marginTop: 14,
    position: "relative",
    [theme.breakpoints.down("sm")]: {
      marginTop: 8
    }
  },

  searchInputProps: {
    fontSize: "19px",
    lineHeight: "26px",
    fontWeight: 500,
    fontStyle: "normal",
    color: theme.colors.primary.darkGrey,
    [theme.breakpoints.down("xs")]: {
      fontSize: "15px",
      lineHeight: "20px"
    }
  },

  limitedSearchInputProps: {
    marginRight: 178,
    [theme.breakpoints.down("sm")]: {
      marginBottom: 37,
      marginRight: -16
    }
  },

  inputButtonIcon: {
    minWidth: 37,
    height: 37,
    position: "absolute",
    right: 5,
    bottom: 5,
    margin: 0
  },

  searchInputIcon: {
    [theme.breakpoints.up("sm")]: {
      minWidth: 43,
      height: 43
    }
  },

  actionButtonsWrapper: {},

  fixedWith: {
    maxWidth: 1024 + 44,
    width: "100%",
    paddingLeft: 22,
    paddingRight: 22,
    overflow: "hidden",
    [theme.breakpoints.down("sm")]: {
      paddingLeft: 22,
      paddingRight: 22
    }
  },

  blockWrapper: {
    paddingTop: 70,
    paddingBottom: 87,
    [theme.breakpoints.down("sm")]: {
      paddingTop: 24,
      paddingBottom: 40
    }
  },

  blockTitleWrapper: {
    paddingTop: 50,
    paddingBottom: 40,
    [theme.breakpoints.down("sm")]: {
      paddingTop: 24,
      paddingBottom: 16
    }
  },

  blockTitle: {
    ...theme.fonts.size.fontSizeL,
    ...theme.fonts.weight.fontWeightBold,
    textAlign: "center",
    [theme.breakpoints.down("sm")]: {
      ...theme.fonts.size.fontSizeS
    }
  },

  blockContentWrapper: {
    paddingTop: 24,
    [theme.breakpoints.down("sm")]: {
      paddingTop: 0
    }
  },

  textStepWrapper: {
    marginBottom: 52,
    [theme.breakpoints.down("sm")]: {
      marginBottom: 24
    }
  },

  textStepIconWrapper: {
    paddingRight: 21
  },

  textStepIcon: {
    width: 45,
    height: 45,
    color: theme.colors.primary.grey,
    background: theme.colors.primary.whiteGrey,
    fontSize: "20px",
    borderRadius: "50%",
    [theme.breakpoints.down("sm")]: {
      width: 36,
      height: 36,
      marginRight: 12,
      fontSize: "16px"
    }
  },

  textStepActiveIcon: {
    color: theme.colors.primary.white,
    background: theme.colors.primary.mainColor,
    boxShadow: `0px 6px 12px ${theme.colors.primary.mainShadow}`
  },

  textStepTitle: {
    fontSize: "20px",
    [theme.breakpoints.down("sm")]: {
      fontSize: "16px"
    }
  },

  textStepExpandIcon: {
    marginLeft: 14,
    color: theme.colors.primary.grey,
    fontWeight: 100,
    width: 12,
    height: 7
  },

  textStepContent: {
    maxLines: 4,
    overflow: "hidden",
    textOverflow: "ellipsis",
    fontSize: "16px",
    [theme.breakpoints.down("sm")]: {
      fontSize: "14px"
    }
  },

  imgHelpStepper: {
    position: "relative",
    height: 556,
    zIndex: 1
  },

  imgHelpStepWrapper: {
    paddingLeft: "calc(100% - 363px - 20px)"
  },

  imgHelpStep: {
    position: "absolute",
    boxShadow: "0px 18px 18px #0000001A",
    borderRadius: theme.spacing(),
    width: 363,
    height: 500,
    opacity: 1,
    transition: "transform .3s, opacity .4s"
  },

  imgHelpStepHidden: {
    transform: "translate(50px, 0)",
    opacity: 0
  },

  imgHelpBkWrapper: {
    top: 56,
    left: "calc(100% - 363px)",
    zIndex: -1,
    position: "absolute"
  },

  imgHelpBk: {
    background: theme.colors.primary.mainColor,
    borderRadius: theme.spacing(),
    width: 363,
    height: 500,
    position: "relative"
  },

  dotStepper: {
    position: "absolute",
    width: "100%",
    justifyContent: "center",
    bottom: 10,
    background: "transparent"
  },

  dotStepperLandingBlock: {
    position: "relative",
    width: "fit-content",
    height: "100%",
    left: -8,
    background: "transparent"
  },

  dotLandingBlockStyle: {
    width: 12,
    height: 12,
    margin: 6,
    background: theme.colors.primary.darkGrey,
    opacity: 0.35
  },

  dotStyle: {
    width: 12,
    height: 12,
    margin: 6,
    background: theme.colors.primary.white,
    opacity: 0.35
  },

  dotActiveStyle: {
    opacity: 1
  },

  mobileHeaderSlider: {
    paddingTop: 20,
    paddingBottom: 20
  },

  textMedium: {
    fontSize: "20px"
  },

  divider: {
    width: "100%"
  },

  allLatestButton: {
    paddingTop: 54,
    paddingBottom: 96,
    [theme.breakpoints.down("sm")]: {
      paddingTop: 24,
      paddingBottom: 0
    }
  },

  whiteShadowButton: {
    background: theme.colors.primary.white,
    color: theme.colors.primary.darkGrey,
    boxShadow: `0px 6px 12px #${theme.colors.primary.white}4D`,
    "&:hover": {
      background: theme.colors.primary.darkColor,
      color: theme.colors.primary.white
    }
  },

  homeRegisterTitle: {
    paddingTop: 0,
    color: "white",
    [theme.breakpoints.down("sm")]: {
      paddingTop: 8
    }
  },

  homeRegisterContent: {
    position: "relative",
    paddingTop: 40,
    paddingBottom: 40,
    maxWidth: 724,
    [theme.breakpoints.down("sm")]: {
      paddingTop: 24,
      paddingBottom: 24,
      maxWidth: "80%"
    }
  },

  homeRegisterArrow: {
    width: 56,
    height: 56,
    position: "absolute",
    top: "calc(50% - 12px)",
    cursor: "pointer",
    [theme.breakpoints.down("sm")]: {
      width: 48,
      height: 48
    }
  },

  homeRegisterArrowButton: {
    width: 56,
    height: 56,
    [theme.breakpoints.down("sm")]: {
      width: 48,
      height: 48
    }
  },

  prosWrapper: {
    paddingTop: 45,
    paddingBottom: 50,
    [theme.breakpoints.down("sm")]: {
      paddingLeft: 40,
      paddingRight: 40
    }
  },

  prosIcon: {
    width: 40,
    height: 40,
    color: theme.colors.primary.mainColor,
    [theme.breakpoints.down("sm")]: {
      width: 27,
      height: 27
    }
  },

  newsLetterWrapper: {
    background: theme.colors.primary.whiteGrey
  },

  receiveNewsletter: {
    maxWidth: 400,
    width: "100%"
  },

  socialIconsWrapper: {
    height: 55
  },

  contactInfoWrapper: {
    paddingTop: 58,
    paddingBottom: 20
  },

  landingButtonsWrapper: {
    maxWidth: "calc(194px * 2 + 44px)"
  },

  landingButton: {
    width: 194,
    margin: 4,
    padding: 7
  }
});

class Home extends Component {
  static propTypes = {
    classes: PropTypes.object,
    t: PropTypes.func
  };

  state = {
    tessiQuery: "",
    receiveNewsletter: "",
    receiveNewsletterError: null,
    activeLandingBlock: 0,
    activeHelpStep: 0,
    recommendedOffices: []
  };

  intervalId = null;

  landingBlocks = [
    {
      img: headerimg,
      imgL: headerimgL,
      title: this.props.t("needSpaceForBusiness"),
      subtitle: this.props.t("needSpaceForBusinessSub")
    },
    {
      img: headerimg,
      imgL: headerimgL,
      title: this.props.t("havePlaceAsOffice"),
      subtitle: this.props.t("havePlaceAsOfficeSub")
    },
    {
      img: headerimg,
      imgL: headerimgL,
      title: this.props.t("consultant"),
      subtitle: this.props.t("consultantSub")
    }
    // {img: headerimg, imgL: headerimgL, title: this.props.t("needSpaceForBusiness"), subtitle: this.props.t("needSpaceForBusinessSub")}
  ];

  UNSAFE_componentWillMount() {
    /** Set timer for active landing block (every 5 seconds) */
    this.intervalId = setInterval(
      () =>
        this.setState({
          activeLandingBlock: (this.state.activeLandingBlock + 1) % 3
        }),
      5000
    );

    /** Get recommended offices */
    if (getRecommendedOffices) {
      getRecommendedOffices().then(response => {
        if (response.status === 200) {
          this.setState({ recommendedOffices: response.data.data.offices });
        }
      });
    }
  }

  componentWillUnmount() {
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
    }
  }

  /** Set favorite of office */
  handleSetFavoriteOffice = office => () => {
    // TODO: call backend api to set favorite
    // TODO: show login modal if auth.user.isLoggedIn === false
    office.favorite = !office.favorite;
    this.setState({});
  };

  /**
   * Text stepper component
   */
  textStepper = withWidth()(
    ({ active, index, label, content, onClick, width }) => (
      <div onClick={() => onClick(index)} style={{ cursor: "pointer" }}>
        {!isWidthDown("sm", width) ? (
          <Box classes={{ box: this.props.classes.textStepWrapper }}>
            <Box classes={{ box: this.props.classes.textStepIconWrapper }}>
              <Box
                classes={{
                  box: clsx(
                    this.props.classes.textStepIcon,
                    active && this.props.classes.textStepActiveIcon
                  )
                }}
                alignChildrenCenter
                justifyChildrenCenter
              >
                <Typography fontSizeM fontWeightBold>
                  {index}
                </Typography>
              </Box>
            </Box>
            <Column alignChildrenStart>
              <Typography
                fontSizeM
                fontWeightBold
                textSecondary={active}
                textMediumGrey={!active}
                // color={!active ? "secondary" : undefined}
                // className={this.props.classes.textStepTitle}
              >
                {label}
              </Typography>
              <Box paddingTopHalf>
                <Typography
                  fontSizeS
                  textSecondary={active}
                  textMediumGrey={!active}
                  // className={this.props.classes.textStepContent}
                  // color={!active ? "secondary" : undefined}
                >
                  {content}
                </Typography>
              </Box>
            </Column>
          </Box>
        ) : (
          <Column
            classes={{ box: this.props.classes.textStepWrapper }}
            alignChildrenStart
          >
            <Row
              classes={{ box: this.props.classes.textStepIconWrapper }}
              alignChildrenCenter
            >
              <Box
                classes={{
                  box: clsx(
                    this.props.classes.textStepIcon,
                    active && this.props.classes.textStepActiveIcon
                  )
                }}
                alignChildrenCenter
                justifyChildrenCenter
              >
                {index}
              </Box>
              <Typography fontSizeS fontWeightBold textSecondary>
                {label}
              </Typography>
              {active ? (
                <ArrowDownIcon
                  className={this.props.classes.textStepExpandIcon}
                />
              ) : (
                <ArrowUpIcon
                  className={this.props.classes.textStepExpandIcon}
                />
              )}
            </Row>
            <Collapse in={active}>
              <Row paddingTopHalf>
                <Typography
                  fontSizeXS
                  textSecondary={active}
                  textMediumGrey={!active}
                >
                  {content}
                </Typography>
              </Row>
            </Collapse>
          </Column>
        )}
      </div>
    )
  );

  /**
   * Image stepper component
   */
  imgStepper = ({ active, imgSrc }) => (
    <Box
      classes={{
        box: clsx(
          this.props.classes.imgHelpStep,
          !active && this.props.classes.imgHelpStepHidden
        )
      }}
    >
      <img src={imgSrc} alt="Gallery" />
    </Box>
  );

  /**
   * Select active step for helpers
   * @param {number} activeHelpStep Index of active helper step
   */
  handleSelectActiveStep = activeHelpStep => () => {
    this.setState({ activeHelpStep });
  };

  /**
   * Change event emitter to update state
   * @param {string} field Name of state field to update
   */
  handleChangeByEvent = field => e => {
    this.setState({ [field]: e.target.value });
  };

  /** Click submit button of news letter input box */
  handleReceiveNewsLetter = () => {
    if (this.state.receiveNewsletter) {
      if (!emailValidation(this.state.receiveNewsletter)) {
        this.setState({
          receiveNewsletterError: this.props.t("invalidEmailAddress")
        });
      } else {
        console.log("Submit receive news letter!");
      }
    }
  };

  /** Navigate to office detail page */
  handleOfficeDetail = officeId => () => {
    this.props.navigate("offices", officeId);
  };

  render() {
    const { width, classes: s, t } = this.props;
    const {
      recommendedOffices,
      activeHelpStep,
      activeLandingBlock,
      tessiQuery,
      receiveNewsletter
    } = this.state;
    const TextStepComponent = this.textStepper;
    const ImgStepComponent = this.imgStepper;

    const landingBlock = this.landingBlocks[activeLandingBlock];

    return (
      <Column classes={{ box: s.root }}>
        {/** Landing image block */}
        <div className={s.landingBoardWrapper}>
          {this.landingBlocks.map((block, index) => (
            <img
              key={index}
              srcSet={`${block.img} 960w, ${block.imgL} 1280w`}
              src={block.img}
              alt=""
              className={clsx(
                s.landingBoardImage,
                index !== activeLandingBlock && s.landingBoardImageHidden
              )}
            />
          ))}
          <Column
            fullWidth
            absolute
            style={{ top: 0, left: 0, height: "100%" }}
          >
            <Row
              style={{
                width: "fit-content",
                height: "100%"
              }}
              alignChildrenStart
            >
              <Column classes={{ box: s.landingBoard }}>
                <Row>
                  <Card className={s.searchWrapper}>
                    <Column alignChildrenStart>
                      <Typography
                        // fontSizeXL
                        textSecondary
                        fontWeightBold
                        classes={{ box: s.landingTitle }}
                        block
                      >
                        <Trans i18nKey="dashboardLandingTitle">
                          <Typography
                            // fontSizeXL
                            textPrimary
                            fontWeightBold
                            classes={{ box: s.landingTitle }}
                            span
                          >
                            {{ name: "TESSI" }}
                          </Typography>
                          <br />
                        </Trans>
                      </Typography>
                      <Typography
                        textMediumGrey
                        // fontSizeS
                        className={{ box: s.landingSubtitle }}
                      >
                        {t("dashboardLandingSubtitle")}
                      </Typography>
                      <TextField
                        fullWidth
                        variant="outlined"
                        value={tessiQuery}
                        onChange={this.handleChangeByEvent("tessiQuery")}
                        placeholder={t("sayHiOrSearch")}
                        className={clsx(s.searchInput)}
                        styles={{
                          input: clsx(
                            s.searchInputProps,
                            tessiQuery && s.limitedSearchInputProps
                          )
                        }}
                        endAdornment={
                          <Button
                            variant="icon"
                            background="primary"
                            style={{ margin: 0 }}
                            className={clsx(
                              s.inputButtonIcon,
                              s.searchInputIcon,
                              tessiQuery && s.landingButton
                            )}
                            shadow
                          >
                            {!tessiQuery ? (
                              <ArrowRightAltIcon
                                style={{
                                  color: "white",
                                  width: 18,
                                  height: 18
                                }}
                              />
                            ) : /hi/i.test(tessiQuery) ? (
                              <Typography
                                fontSizeS
                                fontWeightBold
                                textWhite
                                alignChildrenCenter
                              >
                                <TessiIcon style={{ stroke: "white" }} />
                                <Typography paddingLeft>
                                  {t("chatWithTessi")}
                                </Typography>
                              </Typography>
                            ) : (
                              <Typography
                                fontSizeS
                                fontWeightBold
                                textWhite
                                alignChildrenCenter
                              >
                                <SearchIcon />
                                <Typography paddingLeft>
                                  {t("advancedSearch")}
                                </Typography>
                              </Typography>
                            )}
                          </Button>
                        }
                      />
                    </Column>
                  </Card>
                </Row>
                <Stretch />
                {!isWidthDown("sm", width) && (
                  <Row
                    fullWidth
                    relative
                    style={{ height: isWidthDown("sm", width) ? 20 : 34 }}
                  >
                    <Typography
                      textSecondary
                      fontWeightBold
                      fontSizeL={!isWidthDown("sm", width)}
                      fontSizeS={isWidthDown("sm", width)}
                      fullWidth
                      style={{
                        overflow: "visible",
                        whiteSpace: "nowrap"
                      }}
                      absolute
                    >
                      {landingBlock.title}
                    </Typography>
                  </Row>
                )}
                {!isWidthDown("sm", width) && (
                  <Row
                    fullWidth
                    relative
                    style={{ height: isWidthDown("sm", width) ? 26 : 28 }}
                  >
                    <Typography
                      textSecondary
                      fontWeightBold
                      fontSizeS={!isWidthDown("sm", width)}
                      fontSizeXS={isWidthDown("sm", width)}
                      fullWidth
                      style={{
                        overflow: "visible",
                        whiteSpace: "nowrap"
                      }}
                      absolute
                    >
                      {landingBlock.subtitle}
                    </Typography>
                  </Row>
                )}
                <Row paddingTop fullWidth style={{ flexWrap: "wrap" }}>
                  {!isWidthDown("sm", width) && (
                    <>
                      <Column style={{ height: "100%", left: -6 }} relative>
                        <MobileStepper
                          variant="dots"
                          steps={this.landingBlocks.length}
                          activeStep={activeLandingBlock}
                          classes={{
                            root: s.dotStepperLandingBlock,
                            dot: s.dotLandingBlockStyle,
                            dotActive: s.dotActiveStyle
                          }}
                        />
                      </Column>
                      <Stretch />
                    </>
                  )}
                  <Grid
                    className={s.landingButtonsWrapper}
                    container
                    direction="row-reverse"
                    justify={
                      isWidthDown("xs", width) ? "center" : "space-between"
                    }
                  >
                    <Grid item>
                      <Button className={s.landingButton}>
                        <Typography
                          fontSizeS
                          fontWeightBold
                          textWhite
                          alignChildrenCenter
                        >
                          <SearchIcon />
                          <Typography paddingLeft>
                            {t("advancedSearch")}
                          </Typography>
                        </Typography>
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button className={s.landingButton}>
                        <Typography
                          fontSizeS
                          fontWeightBold
                          textWhite
                          alignChildrenCenter
                        >
                          <TessiIcon style={{ stroke: "white" }} />
                          <Typography paddingLeft>
                            {t("chatWithTessi")}
                          </Typography>
                        </Typography>
                      </Button>
                    </Grid>
                  </Grid>
                </Row>
              </Column>
            </Row>
          </Column>
        </div>

        {/** header slider for mobile */}
        {isWidthDown("sm", width) && (
          <Row fullWidth>
            <Column
              style={{ paddingBottom: 20 }}
              classes={{ box: clsx(s.fixedWith, s.blockWrapper) }}
              alignChildrenCenter={!isWidthDown("xs", width)}
              alignChildrenStart={isWidthDown("xs", width)}
            >
              <Typography textSecondary fontWeightBold fontSizeM>
                {landingBlock.title}
              </Typography>
              <Typography textSecondary fontSizeXS paddingTopHalf>
                {landingBlock.subtitle}
              </Typography>
              <Row fullWidth justifyChildrenCenter>
                <MobileStepper
                  variant="dots"
                  steps={this.landingBlocks.length}
                  activeStep={activeLandingBlock}
                  style={{ padding: 10 }}
                  classes={{
                    root: s.dotStepperLandingBlock,
                    dot: s.dotLandingBlockStyle,
                    dotActive: s.dotActiveStyle
                  }}
                />
              </Row>
            </Column>
          </Row>
        )}

        {/* RENTGLOBAL helper block */}
        <Row fullWidth justifyChildrenCenter>
          <Column classes={{ box: clsx(s.fixedWith, s.blockWrapper) }}>
            <Row classes={{ box: s.blockTitleWrapper }}>
              <Typography classes={{ box: s.blockTitle }} textSecondary block>
                <Trans i18nKey="howHelpFind">
                  <Typography classes={{ box: s.blockTitle }} textPrimary span>
                    {{ name: "RENTGLOBAL" }}
                  </Typography>
                </Trans>
              </Typography>
            </Row>
            <Row classes={{ box: s.blockContentWrapper }}>
              <Grid container direction="row">
                <Grid item className={s.textHelpStepper} md={6} sm={12}>
                  <TextStepComponent
                    index="1"
                    label={t("howHelpFind1_title")}
                    content={t("howHelpFind1_content")}
                    active={activeHelpStep === 0}
                    onClick={this.handleSelectActiveStep(0)}
                  />
                  <TextStepComponent
                    index="2"
                    label={t("howHelpFind2_title")}
                    content={t("howHelpFind2_content")}
                    active={activeHelpStep === 1}
                    onClick={this.handleSelectActiveStep(1)}
                  />
                  <TextStepComponent
                    index="3"
                    label={t("howHelpFind3_title")}
                    content={t("howHelpFind3_content")}
                    active={activeHelpStep === 2}
                    onClick={this.handleSelectActiveStep(2)}
                  />
                </Grid>
                <Hidden smDown>
                  <Grid item className={s.imgHelpStepper} md={6} sm={12}>
                    <Box classes={{ box: s.imgHelpStepWrapper }}>
                      <ImgStepComponent
                        active={activeHelpStep === 0}
                        imgSrc={gallery1}
                      />
                      <ImgStepComponent
                        active={activeHelpStep === 1}
                        imgSrc={gallery2}
                      />
                      <ImgStepComponent
                        active={activeHelpStep === 2}
                        imgSrc={gallery3}
                      />
                    </Box>
                    <Box classes={{ box: s.imgHelpBkWrapper }}>
                      <Box classes={{ box: s.imgHelpBk }}>
                        <MobileStepper
                          variant="dots"
                          steps={3}
                          position="static"
                          activeStep={activeHelpStep}
                          classes={{
                            root: s.dotStepper,
                            dot: s.dotStyle,
                            dotActive: s.dotActiveStyle
                          }}
                        />
                      </Box>
                    </Box>
                  </Grid>
                </Hidden>
              </Grid>
            </Row>
          </Column>
        </Row>

        <Hidden smUp>
          <Divider className={s.divider} half />
        </Hidden>

        {/* Office list block */}
        <Row fullWidth justifyChildrenCenter>
          <Column classes={{ box: clsx(s.fixedWith, s.blockWrapper) }}>
            <Row
              classes={{ box: s.blockTitleWrapper }}
              style={
                isWidthDown("sm", width)
                  ? { paddingBottom: 24, paddingTop: 0 }
                  : { paddingTop: 0 }
              }
            >
              <Typography classes={{ box: s.blockTitle }} textSecondary>
                {t("latestRecommendOffice")}
              </Typography>
            </Row>
            <Row
              classes={{ box: s.blockContentWrapper }}
              style={{ overflowX: "hidden" }}
              fullWidth
            >
              <div style={{ width: "100%", height: "100%" }}>
                <Carousel itemWidth={255} offset={20} keepDirectionWhenDragging>
                  {recommendedOffices.map((office, index) => (
                    <div
                      style={{ position: "relative", cursor: "pointer" }}
                      key={index}
                      onClick={this.handleOfficeDetail(office._id)}
                    >
                      <OfficeItem
                        office={office}
                        setFavorite={this.handleSetFavoriteOffice(office)}
                      />
                    </div>
                  ))}
                </Carousel>
              </div>
            </Row>
            <Row classes={{ box: s.allLatestButton }}>
              <Button variant="secondary" shadow>
                <Typography fontSizeS fontWeightBold textSecondary>
                  {t("allLatest", { count: "50+" })}
                </Typography>
              </Button>
            </Row>
          </Column>
        </Row>

        {/* Register block */}
        <Column backgroundPrimary fullWidth>
          <Column classes={{ box: clsx(s.fixedWith, s.blockWrapper) }}>
            <Row classes={{ box: s.homeRegisterTitle }}>
              <Typography classes={{ box: s.blockTitle }} textWhite>
                {t("homeRegisterTitle")}
              </Typography>
            </Row>
            <Row
              classes={{ box: s.homeRegisterContent }}
              fullWidth
              textWhite
              textCenter
            >
              <div style={{ width: "100%", height: "100%" }}>
                <Carousel
                  infinite
                  slidesPerPage={1}
                  keepDirectionWhenDragging
                  addArrowClickHandler
                  arrowLeft={
                    <Box
                      style={{
                        left: isWidthDown("sm", width) ? "-60px" : "-124px"
                      }}
                      classes={{ box: s.homeRegisterArrow }}
                    >
                      <KeyboardArrowLeft
                        className={s.homeRegisterArrowButton}
                      />
                    </Box>
                  }
                  arrowRight={
                    <Box
                      style={{
                        right: isWidthDown("sm", width) ? "-60px" : "-124px"
                      }}
                      classes={{ box: s.homeRegisterArrow }}
                    >
                      <KeyboardArrowRight
                        className={s.homeRegisterArrowButton}
                      />
                    </Box>
                  }
                >
                  {[
                    { title: "1.", content: t("homeRegisterContent") },
                    { title: "2.", content: t("homeRegisterContent") },
                    { title: "3.", content: t("homeRegisterContent") }
                  ].map((val, index) => (
                    <React.Fragment key={index}>
                      <Column>
                        <Typography
                          paddingBottom
                          fontSizeM={isWidthDown("sm", width)}
                          fontSizeL={!isWidthDown("sm", width)}
                        >
                          {val.title}
                        </Typography>
                        <Typography
                          fontSizeXS={isWidthDown("sm", width)}
                          fontSizeS={!isWidthDown("sm", width)}
                          fontWeightBold
                          fullWidth
                        >
                          {val.content}
                        </Typography>
                      </Column>
                    </React.Fragment>
                  ))}
                </Carousel>
              </div>
            </Row>
            <Row>
              <Button
                // variant="secondary"
                className={s.whiteShadowButton}
                onClick={() =>
                  this.props.history.push("/auth/register/landlord")
                }
              >
                {isWidthDown("sm", width) ? (
                  <Typography fontSizeXS fontWeightBold>
                    {t("registerAndStart")}
                  </Typography>
                ) : (
                  <Typography fontSizeS fontWeightBold>
                    {t("registerAndStartRENTGLOBALConsultant")}
                  </Typography>
                )}
              </Button>
            </Row>
          </Column>
        </Column>

        {/* RENTGLOBAL pros block */}
        <Row fullWidth justifyChildrenCenter>
          <Column classes={{ box: clsx(s.fixedWith, s.blockWrapper) }}>
            <Grid container direction="row" className={s.prosWrapper}>
              <Grid item xs={12} md={4}>
                {isWidthDown("sm", width) ? (
                  <Row>
                    <Column>
                      <EmojiIcon className={s.prosIcon} />
                    </Column>
                    <Column paddingLeft alignChildrenStart>
                      <Row>
                        <Typography
                          fontSizeS
                          uppercase
                          textSecondary
                          fontWeightBold
                        >
                          {t("flexibility")}
                        </Typography>
                      </Row>
                      <Row>
                        <Typography fontSizeXS uppercase textSecondary>
                          {t("minimumCommitment")}
                        </Typography>
                      </Row>
                    </Column>
                  </Row>
                ) : (
                  <Column>
                    <Row>
                      <EmojiIcon className={s.prosIcon} />
                    </Row>
                    <Row paddingTop>
                      <Typography
                        fontSizeM
                        uppercase
                        textSecondary
                        fontWeightBold
                      >
                        {t("flexibility")}
                      </Typography>
                    </Row>
                    <Row>
                      <Typography fontSizeS uppercase textSecondary>
                        {t("minimumCommitment")}
                      </Typography>
                    </Row>
                  </Column>
                )}
              </Grid>
              <Grid item xs={12} md={4}>
                {isWidthDown("sm", width) ? (
                  <Row paddingTopDouble>
                    <Column>
                      <CalendarIcon className={s.prosIcon} />
                    </Column>
                    <Column paddingLeft alignChildrenStart>
                      <Row>
                        <Typography
                          fontSizeS
                          uppercase
                          textSecondary
                          fontWeightBold
                        >
                          {t("confiance")}
                        </Typography>
                      </Row>
                      <Row>
                        <Typography fontSizeXS uppercase textSecondary>
                          {t("personalMonitoring")}
                        </Typography>
                      </Row>
                    </Column>
                  </Row>
                ) : (
                  <Column>
                    <Row>
                      <CalendarIcon className={s.prosIcon} />
                    </Row>
                    <Row paddingTop>
                      <Typography
                        fontSizeM
                        uppercase
                        textSecondary
                        fontWeightBold
                      >
                        {t("confiance")}
                      </Typography>
                    </Row>
                    <Row>
                      <Typography fontSizeS uppercase textSecondary>
                        {t("personalMonitoring")}
                      </Typography>
                    </Row>
                  </Column>
                )}
              </Grid>
              <Grid item xs={12} md={4}>
                {isWidthDown("sm", width) ? (
                  <Row paddingTopDouble>
                    <Column>
                      <HeartIcon className={s.prosIcon} />
                    </Column>
                    <Column paddingLeft alignChildrenStart>
                      <Row>
                        <Typography
                          fontSizeS
                          uppercase
                          textSecondary
                          fontWeightBold
                        >
                          {t("simplicity")}
                        </Typography>
                      </Row>
                      <Row>
                        <Typography fontSizeXS uppercase textSecondary>
                          {t("turnkeySolution")}
                        </Typography>
                      </Row>
                    </Column>
                  </Row>
                ) : (
                  <Column>
                    <Row>
                      <HeartIcon className={s.prosIcon} />
                    </Row>
                    <Row paddingTop>
                      <Typography
                        fontSizeM
                        uppercase
                        textSecondary
                        fontWeightBold
                      >
                        {t("simplicity")}
                      </Typography>
                    </Row>
                    <Row>
                      <Typography fontSizeS uppercase textSecondary>
                        {t("turnkeySolution")}
                      </Typography>
                    </Row>
                  </Column>
                )}
              </Grid>
            </Grid>
          </Column>
        </Row>

        {/* Following block */}
        <Row
          fullWidth
          justifyChildrenCenter
          classes={{ box: s.newsLetterWrapper }}
        >
          <Column
            style={{ paddingTop: isWidthDown("xs", width) ? 30 : 16 }}
            classes={{ box: clsx(s.fixedWith) }}
            paddingBottom
          >
            <Grid container justify="space-between">
              <Grid item xs={12} sm={6}>
                <Column paddingTop paddingBottom>
                  <Typography fontSizeS textSecondary>
                    {t("receiveNewsletter")}
                  </Typography>
                  <Row paddingTopHalf fullWidth justifyChildrenCenter>
                    <TextField
                      variant="outlined"
                      placeholder={t("yourEmailAddress")}
                      className={s.receiveNewsletter}
                      type="email"
                      value={receiveNewsletter}
                      onChange={this.handleChangeByEvent("receiveNewsletter")}
                      error={!!this.state.receiveNewsletterError}
                      helperText={this.state.receiveNewsletterError}
                      endAdornment={
                        <Button
                          variant="icon"
                          style={{ margin: 0 }}
                          className={clsx(s.inputButtonIcon)}
                          background={
                            receiveNewsletter ? "primary" : "borderLight"
                          }
                          shadow={!!receiveNewsletter}
                          onClick={this.handleReceiveNewsLetter}
                          disabled={!receiveNewsletter}
                        >
                          <CheckIcon
                            style={{
                              color: "white",
                              width: 18,
                              height: 18
                            }}
                          />
                        </Button>
                      }
                    />
                  </Row>
                </Column>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Column paddingTop paddingBottom>
                  <Typography fontSizeS textSecondary>
                    {t("followUpSocials")}
                  </Typography>
                  <Row paddingTopHalf classes={{ box: s.socialIconsWrapper }}>
                    <Box paddingLeft paddingRight>
                      <Link to="#" variant="normalXLight">
                        <Twitter fontSize="large" />
                      </Link>
                    </Box>
                    <Box paddingLeft paddingRight>
                      <Link to="#" variant="normalXLight">
                        <Facebook fontSize="large" />
                      </Link>
                    </Box>
                    <Box paddingLeft paddingRight>
                      <Link to="#" variant="normalXLight">
                        <Instagram fontSize="large" />
                      </Link>
                    </Box>
                    <Box paddingLeft paddingRight>
                      <Link to="#" variant="normalXLight">
                        <LinkedIn fontSize="large" />
                      </Link>
                    </Box>
                  </Row>
                </Column>
              </Grid>
            </Grid>
          </Column>
        </Row>

        {/* Contact info block */}
        <Row fullWidth justifyChildrenCenter>
          <Column classes={{ box: clsx(s.fixedWith, s.blockWrapper) }}>
            <Grid
              container
              justify="space-between"
              className={s.contactInfoWrapper}
            >
              <Grid item xs={6} sm={3}>
                <Column paddingTopDouble paddingBottomDouble alignChildrenStart>
                  <Typography fontSizeM fontWeightBold textSecondary>
                    {t("rentglobal")}
                  </Typography>
                  <Column paddingTop alignChildrenStart>
                    <Link to="/">
                      <Typography fontSizeS>{t("aboutUs")}</Typography>
                    </Link>
                    <Link to="/">
                      <Typography fontSizeS>{t("news")}</Typography>
                    </Link>
                    <Link to="/">
                      <Typography fontSizeS>{t("careers")}</Typography>
                    </Link>
                    <Link to="/">
                      <Typography fontSizeS>{t("contactUs")}</Typography>
                    </Link>
                  </Column>
                </Column>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Column paddingTopDouble paddingBottomDouble alignChildrenStart>
                  <Typography fontSizeM fontWeightBold textSecondary>
                    {t("discover")}
                  </Typography>
                  <Column paddingTop alignChildrenStart>
                    <Link to="/">
                      <Typography fontSizeS>{t("howItWorks")}</Typography>
                    </Link>
                    <Link to="/">
                      <Typography fontSizeS>{t("legalNotice")}</Typography>
                    </Link>
                    <Link to="/">
                      <Typography fontSizeS>{t("privacyPolicy")}</Typography>
                    </Link>
                    <Link to="/">
                      <Typography fontSizeS>
                        {t("termsAndConditions")}
                      </Typography>
                    </Link>
                  </Column>
                </Column>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Column paddingTopDouble paddingBottomDouble alignChildrenStart>
                  <Typography fontSizeM fontWeightBold textSecondary>
                    {t("support")}
                  </Typography>
                  <Column paddingTop alignChildrenStart>
                    <Link to="/">
                      <Typography fontSizeS>{t("help")}</Typography>
                    </Link>
                    <Link to="/auth/login">
                      <Typography fontSizeS>{t("login")}</Typography>
                    </Link>
                    <Link to="/auth/register">
                      <Typography fontSizeS>{t("register")}</Typography>
                    </Link>
                    <Link to="/">
                      <Typography fontSizeS>{t("support")}</Typography>
                    </Link>
                  </Column>
                </Column>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Column paddingTopDouble paddingBottomDouble alignChildrenStart>
                  <Typography fontSizeM fontWeightBold textSecondary>
                    {t("contact")}
                  </Typography>
                  <Column paddingTop alignChildrenStart>
                    <Typography fontSizeS textSecondary>
                      1176, street Bishop, Montreal,
                    </Typography>
                    <Typography fontSizeS textSecondary>
                      QC H3G 2E3
                    </Typography>
                    <Typography fontSizeS textSecondary>
                      info@dokstation.ca
                    </Typography>
                    <Typography fontSizeS textSecondary>
                      Phone: (514) 461-3030
                    </Typography>
                  </Column>
                </Column>
              </Grid>
            </Grid>
          </Column>
        </Row>
      </Column>
    );
  }
}

export default withWidth()(
  withStyles(styleSheet)(withTranslation(["home", "common"])(Home))
);
