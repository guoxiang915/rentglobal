import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import { Trans, withTranslation } from "react-i18next";
import withWidth, { isWidthDown } from "@material-ui/core/withWidth";
import HeaderImage from "../../assets/img/img_header.jpg";
import HeaderImageLarger from "../../assets/img/img_header@2x.jpg";
import { Grid, Card, Hidden, MobileStepper, Collapse } from "@material-ui/core";
import {
  LinkedIn,
  Facebook,
  Instagram,
  Twitter,
  KeyboardArrowLeft,
  KeyboardArrowRight,
  FavoriteBorderOutlined,
  FavoriteOutlined
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
  StarIcon,
  EmojiIcon,
  CalendarIcon,
  ArrowRightAltIcon
} from "../../common/base-components";
import Carousel, { Dots } from "@brainhubeu/react-carousel";
import "@brainhubeu/react-carousel/lib/style.css";

import { offices } from "../../common/mock/officeMockData";
import gallery1 from "../../assets/img/img_gallery_01@2x.png";
import gallery2 from "../../assets/img/img_gallery_02@2x.png";
import gallery3 from "../../assets/img/img_gallery_03@2x.png";
import { useState } from "react";

const styleSheet = theme => ({
  root: {
    // flexGrow: 1,
    display: "block",
    width: "100%",
    height: "100%"
  },

  landingBoardWrapper: {
    display: "block",
    width: "100%",
    position: "relative",
    background: `url(${require("../../assets/img/img_header@2x.jpg")}) 0% 0% no-repeat padding-box`,
    backgroundSize: "cover",
    overflow: "hidden",
    [theme.breakpoints.down("sm")]: {
      background: `url(${require("../../assets/img/img_header.jpg")}) 0% 0% no-repeat padding-box`,
      backgroundSize: "170% auto",
      backgroundPosition: "100% 0%"
    }
  },

  landingBoardImage: {
    visibility: "hidden",
    // maxHeight: "calc(100vh - 100px)",
    [theme.breakpoints.down("sm")]: {
      width: "170%"
    }
  },

  landingBoard: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    padding: "168px 16px 180px 16px",
    [theme.breakpoints.down("sm")]: {
      padding: "24px 16px 8px 16px"
    }
  },

  searchWrapper: {
    // maxWidth: 600,
    width: "100%",
    boxShadow: "0px 24px 24px #0000001A;",
    padding: `${theme.spacing(4)}px ${theme.spacing(4.5)}px`,
    borderRadius: 8,
    [theme.breakpoints.down("sm")]: {
      boxShadow: "0px 14px 14px #0000001A",
      padding: `${theme.spacing(2)}px 10px`
    }
  },

  landingTitle: {
    fontSize: "32px",
    lineHeight: "42px",
    [theme.breakpoints.down("sm")]: {
      fontSize: "20px",
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
    [theme.breakpoints.down("sm")]: {
      marginTop: 8
    }
  },

  searchInputIcon: {
    borderRadius: "50%",
    background: theme.colors.primary.mainColor,
    width: 44,
    height: 39,
    position: "relative",
    right: -8
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
    background: "none",
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

  textMedium: {
    fontSize: "20px"
  },

  divider: {
    width: "100%"
  },

  recommendedOfficeWrapper: {
    width: 235,
    marginRight: 20
  },

  recommendedOfficeCarousel: {
    width: "100%",
    height: 175,
    borderRadius: 8,
    position: "relative",
    overflow: "hidden",
    "&:hover": {
      "&::before": {
        content: '" "',
        background: `transparent linear-gradient(0deg, ${theme.colors.primary.whiteGrey} 0%, ${theme.colors.primary.darkGrey} 100%) 0% 0% no-repeat padding-box`,
        width: "100%",
        height: 34,
        position: "absolute",
        top: 0,
        left: 0,
        opacity: 0.3,
        zIndex: 1
      },
      "&::after": {
        content: '" "',
        background: `transparent linear-gradient(180deg, ${theme.colors.primary.whiteGrey} 0%, ${theme.colors.primary.darkGrey} 100%) 0% 0% no-repeat padding-box`,
        width: "100%",
        height: 34,
        position: "absolute",
        bottom: 0,
        right: 0,
        opacity: 0.3,
        zIndex: 1
      }
    }
  },

  favoriteOfficeIcon: {
    position: "absolute",
    top: 8,
    right: 16,
    zIndex: 1,
    width: 16,
    height: 16
  },

  officeImage: {
    width: "100%",
    height: 174
  },

  officeLegend: {
    position: "absolute",
    right: 14,
    bottom: 8
  },

  carouselArrow: {
    width: 24,
    height: 24,
    position: "absolute",
    top: "calc(50% - 12px)",
    background: theme.colors.primary.white,
    boxShadow: `0px 2px 4px ${theme.colors.primary.darkGrey}1A`,
    borderRadius: "50%",
    zIndex: 1,
    opacity: 0.15,
    "&:hover": {
      opacity: 1
    }
  },

  carouselDots: {
    position: "absolute",
    width: "100%",
    height: 7,
    left: 0,
    bottom: 13,
    zIndex: 1
  },

  ratingText: {},

  allLatestButton: {
    paddingTop: 54,
    paddingBottom: 96,
    [theme.breakpoints.down("sm")]: {
      paddingTop: 24,
      paddingBottom: 0
    }
  },

  whiteShadowButton: {
    boxShadow: "0px 6px 12px #FFFFFF4D"
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
      maxWidth: 237
    }
  },

  homeRegisterArrow: {
    width: 48,
    height: 48,
    position: "absolute",
    top: "calc(50% - 12px)",
    [theme.breakpoints.down("sm")]: {
      width: 36,
      height: 36
    }
  },

  homeRegisterArrowButton: {
    width: 48,
    height: 48,
    [theme.breakpoints.down("sm")]: {
      width: 36,
      height: 36
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

  socialIconsWrapper: {
    height: 55
  },

  contactInfoWrapper: {
    paddingTop: 58,
    paddingBottom: 20
  },

  landingButtonsWrapper: {
    maxWidth: "calc(194px * 2 + 44px)",
    flexWrap: "wrap"
  },

  landingButton: {
    width: 194,
    margin: 4,
    padding: 7
  }
});

class Home extends Component {
  static defaultProps = {
    recommendedOffices: offices
  };

  state = {
    activeHelpStep: 0
  };

  // text step component
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

  // image step component
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

  // office component
  officeWrapper = ({ office, setFavorite }) => {
    const [pos, setPos] = useState(0);

    return (
      <Column
        classes={{ box: this.props.classes.recommendedOfficeWrapper }}
        alignChildrenStart
      >
        <Box classes={{ box: this.props.classes.recommendedOfficeCarousel }}>
          <div style={{ width: "100%", height: "100%" }}>
            {/* <HeartIcon
              className={this.props.classes.favoriteOfficeIcon}
              onClick={setFavorite}
            /> */}
            <Box
              classes={{ box: this.props.classes.favoriteOfficeIcon }}
              onClick={setFavorite}
              textErrorRed={office.favorite}
              textWhite={!office.favorite}
            >
              {office.favorite ? (
                <FavoriteOutlined />
              ) : (
                <FavoriteBorderOutlined />
              )}
            </Box>
            <Carousel
              slidesPerPage={1}
              value={pos}
              infinite
              onChange={setPos}
              autoPlay={4000}
              stopAutoPlayOnHover
              // centered
              keepDirectionWhenDragging
              // itemWidth={"100%"}
              arrowLeft={
                <Box
                  classes={{ box: this.props.classes.carouselArrow }}
                  style={{ left: 14 }}
                >
                  <KeyboardArrowLeft />
                </Box>
              }
              arrowRight={
                <Box
                  classes={{ box: this.props.classes.carouselArrow }}
                  style={{ right: 14 }}
                >
                  <KeyboardArrowRight />
                </Box>
              }
              addArrowClickHandler
            >
              {office.images.map((img, index) => (
                <React.Fragment key={index}>
                  <Box fullWidth>
                    <img
                      src={office.images[0].image}
                      alt=""
                      className={this.props.classes.officeImage}
                    />
                    <Typography
                      fontSizeXS
                      textWhite
                      classes={{ box: this.props.classes.officeLegend }}
                    >
                      {img.location}
                    </Typography>
                  </Box>
                </React.Fragment>
              ))}
            </Carousel>
            <Dots
              value={pos}
              onChange={setPos}
              number={office.images.length}
              className={this.props.classes.carouselDots}
            />
          </div>
        </Box>
        <Box paddingTopHalf>
          <Typography fontSizeM textBlackGrey>
            {office.title}
          </Typography>
        </Box>
        <Row paddingTopHalf>
          <Typography textPrimary>
            <StarIcon
              style={{
                width: 12,
                height: 12
              }}
            />
          </Typography>
          <Typography fontSizeS textMediumGrey paddingLeftHalf>
            {office.rating}
          </Typography>
        </Row>
        <Row paddingTopHalf>
          <Typography fontSizeS textPrimary>
            ${office.price} CAD/month
          </Typography>
        </Row>
      </Column>
    );
  };

  handleSelectActiveStep = activeHelpStep => () => {
    this.setState({ activeHelpStep });
  };

  render() {
    const { recommendedOffices, width, classes, t } = this.props;
    const { activeHelpStep } = this.state;
    const TextStepComponent = this.textStepper;
    const ImgStepComponent = this.imgStepper;
    const OfficeComponent = this.officeWrapper;

    return (
      <Column className={classes.root}>
        {/* Landing image block */}
        <div className={classes.landingBoardWrapper}>
          <img
            srcSet={`${HeaderImageLarger} 2x`}
            src={HeaderImage}
            alt=""
            width="100%"
            className={classes.landingBoardImage}
          />
          <Column fullWidth classes={{ box: classes.landingBoard }}>
            <Row>
              <Card className={classes.searchWrapper}>
                <Column alignChildrenStart>
                  <Typography
                    // fontSizeXL
                    textSecondary
                    fontWeightBold
                    classes={{ box: classes.landingTitle }}
                    block
                  >
                    <Trans i18nKey="dashboardLandingTitle">
                      <Typography
                        // fontSizeXL
                        textPrimary
                        fontWeightBold
                        classes={{ box: classes.landingTitle }}
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
                    className={{ box: classes.landingSubtitle }}
                  >
                    {t("dashboardLandingSubtitle")}
                  </Typography>
                  <TextField
                    fullWidth
                    variant="outlined"
                    placeholder={t("sayHiOrSearch")}
                    className={classes.searchInput}
                    endAdornment={
                      <Button
                        variant="icon"
                        background="primary"
                        className={classes.searchInputIcon}
                        shadow
                      >
                        <ArrowRightAltIcon
                          style={{ color: "white", width: 18, height: 18 }}
                        />
                      </Button>
                    }
                  />
                </Column>
              </Card>
            </Row>
            <Stretch />
            <Row
              fullWidth
              classes={{ box: classes.landingButtonsWrapper }}
              justifyChildrenCenter
            >
              <Grid
                container
                direction="row-reverse"
                justify={isWidthDown("xs", width) ? "center" : "space-between"}
              >
                <Grid item>
                  <Button className={classes.landingButton}>
                    <Typography
                      fontSizeS
                      fontWeightBold
                      textWhite
                      alignChildrenCenter
                    >
                      <SearchIcon />
                      <Typography paddingLeft>{t("advancedSearch")}</Typography>
                    </Typography>
                  </Button>
                </Grid>
                <Grid item>
                  <Button className={classes.landingButton}>
                    <Typography
                      fontSizeS
                      fontWeightBold
                      textWhite
                      alignChildrenCenter
                    >
                      <TessiIcon />
                      <Typography paddingLeft>{t("chatWithTessi")}</Typography>
                    </Typography>
                  </Button>
                </Grid>
              </Grid>
            </Row>
          </Column>
        </div>

        {/* RENTGLOBAL helper block */}
        <Column
          classes={{ box: clsx(classes.fixedWith, classes.blockWrapper) }}
        >
          <Row classes={{ box: classes.blockTitleWrapper }}>
            <Typography
              classes={{ box: classes.blockTitle }}
              textSecondary
              block
            >
              <Trans i18nKey="howHelpFind">
                <Typography
                  classes={{ box: classes.blockTitle }}
                  textPrimary
                  span
                >
                  {{ name: "RENTGLOBAL" }}
                </Typography>
              </Trans>
            </Typography>
          </Row>
          <Row classes={{ box: classes.blockContentWrapper }}>
            <Grid container direction="row">
              <Grid item className={classes.textHelpStepper} md={6} sm={12}>
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
              <Grid item className={classes.imgHelpStepper} md={6} sm={12}>
                <Hidden smDown>
                  <Box classes={{ box: classes.imgHelpStepWrapper }}>
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
                  <Box classes={{ box: classes.imgHelpBkWrapper }}>
                    <Box classes={{ box: classes.imgHelpBk }}>
                      <MobileStepper
                        variant="dots"
                        steps={3}
                        position="static"
                        activeStep={activeHelpStep}
                        classes={{
                          root: classes.dotStepper,
                          dot: classes.dotStyle,
                          dotActive: classes.dotActiveStyle
                        }}
                      />
                    </Box>
                  </Box>
                </Hidden>
              </Grid>
            </Grid>
          </Row>
        </Column>

        <Hidden smUp>
          <Divider className={classes.divider} half />
        </Hidden>

        {/* Office list block */}
        <Column
          classes={{ box: clsx(classes.fixedWith, classes.blockWrapper) }}
        >
          <Row
            classes={{ box: classes.blockTitleWrapper }}
            style={
              isWidthDown("sm", width)
                ? { paddingBottom: 24, paddingTop: 0 }
                : { paddingTop: 0 }
            }
          >
            <Typography classes={{ box: classes.blockTitle }} textSecondary>
              {t("latestRecommendOffice")}
            </Typography>
          </Row>
          <Row
            classes={{ box: classes.blockContentWrapper }}
            style={{ overflowX: "hidden" }}
            fullWidth
          >
            {/* <Box alignChildrenStart> */}
            <div style={{ width: "100%", height: "100%" }}>
              <Carousel
                slidesPerPage={
                  isWidthDown("xs", width)
                    ? 1.3
                    : isWidthDown("sm", width)
                    ? 2
                    : isWidthDown("md", width)
                    ? 3
                    : 4
                }
                keepDirectionWhenDragging
              >
                {recommendedOffices.map((office, index) => (
                  <OfficeComponent
                    office={office}
                    key={index}
                    setFavorite={() => {
                      office.favorite = !office.favorite;
                    }}
                  />
                ))}
              </Carousel>
            </div>
            {/* </Box> */}
          </Row>
          <Row classes={{ box: classes.allLatestButton }}>
            <Button variant="secondary" shadow>
              <Typography fontSizeS fontWeightBold textSecondary>
                {t("allLatest", { count: "50+" })}
              </Typography>
            </Button>
          </Row>
        </Column>

        {/* Register block */}
        <Column backgroundPrimary fullWidth>
          <Column
            classes={{ box: clsx(classes.fixedWith, classes.blockWrapper) }}
          >
            <Row classes={{ box: classes.homeRegisterTitle }}>
              <Typography classes={{ box: classes.blockTitle }} textWhite>
                {t("homeRegisterTitle")}
              </Typography>
            </Row>
            <Row
              classes={{ box: classes.homeRegisterContent }}
              fullWidth
              textWhite
              textCenter
            >
              <div style={{ width: "100%", height: "100%" }}>
                <Carousel
                  slidesPerPage={1}
                  arrowLeft={
                    <Box
                      style={{
                        left: isWidthDown("sm", width) ? "-60px" : "-124px"
                      }}
                      classes={{ box: this.props.classes.homeRegisterArrow }}
                    >
                      <KeyboardArrowLeft
                        className={this.props.classes.homeRegisterArrowButton}
                      />
                    </Box>
                  }
                  arrowRight={
                    <Box
                      style={{
                        right: isWidthDown("sm", width) ? "-60px" : "-124px"
                      }}
                      classes={{ box: this.props.classes.homeRegisterArrow }}
                    >
                      <KeyboardArrowRight
                        className={this.props.classes.homeRegisterArrowButton}
                      />
                    </Box>
                  }
                >
                  <Column>
                    {!isWidthDown("sm", width) && (
                      <Typography paddingBottom fontSizeL>
                        1.
                      </Typography>
                    )}
                    <Typography
                      fontSizeXS={isWidthDown("sm", width)}
                      fontSizeS={!isWidthDown("sm", width)}
                      fontWeightBold
                      fullWidth
                    >
                      {t("homeRegisterContent")}
                    </Typography>
                  </Column>
                </Carousel>
              </div>
            </Row>
            <Row>
              <Button
                variant="secondary"
                className={classes.whiteShadowButton}
                onClick={() =>
                  this.props.history.push("/auth/register/landlord")
                }
              >
                {isWidthDown("sm", width) ? (
                  <Typography fontSizeXS fontWeightBold textSecondary>
                    {t("registerAndStart")}
                  </Typography>
                ) : (
                  <Typography fontSizeS fontWeightBold textSecondary>
                    {t("registerAndStartRENTGLOBALConsultant")}
                  </Typography>
                )}
              </Button>
            </Row>
          </Column>
        </Column>

        {/* RENTGLOBAL pros block */}
        <Column
          classes={{ box: clsx(classes.fixedWith, classes.blockWrapper) }}
        >
          <Grid container direction="row" className={classes.prosWrapper}>
            <Grid item xs={12} md={4}>
              {isWidthDown("sm", width) ? (
                <Row>
                  <Column>
                    <EmojiIcon className={classes.prosIcon} />
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
                    <EmojiIcon className={classes.prosIcon} />
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
                    <CalendarIcon className={classes.prosIcon} />
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
                    <CalendarIcon className={classes.prosIcon} />
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
                    <HeartIcon className={classes.prosIcon} />
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
                    <HeartIcon className={classes.prosIcon} />
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

        {/* Following block */}
        <Column
          classes={{ box: clsx(classes.fixedWith) }}
          paddingTop
          paddingBottom
        >
          <Grid container justify="space-between">
            <Grid item xs={12} sm={6}>
              <Column paddingTop paddingBottom>
                <Typography fontSizeS textSecondary>
                  {t("receiveNewsletter")}
                </Typography>
                <Row paddingTopHalf fullWidth>
                  <TextField
                    variant="outlined"
                    placeholder={t("yourEmailAddress")}
                    fullWidth
                  />
                </Row>
              </Column>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Column paddingTop paddingBottom>
                <Typography fontSizeS textSecondary>
                  {t("followUpSocials")}
                </Typography>
                <Row
                  paddingTopHalf
                  classes={{ box: classes.socialIconsWrapper }}
                >
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

        {/* Contact info block */}
        <Column
          classes={{ box: clsx(classes.fixedWith, classes.blockWrapper) }}
        >
          <Grid
            container
            justify="space-between"
            className={classes.contactInfoWrapper}
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
                    <Typography fontSizeS>{t("termsAndConditions")}</Typography>
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
      </Column>
    );
  }
}

export default withWidth()(
  withStyles(styleSheet)(withTranslation(["home", "common"])(Home))
);
