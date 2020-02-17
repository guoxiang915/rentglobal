import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import { Trans, withTranslation } from "react-i18next";
import HeaderImage from "../../assets/img/img_header.jpg";
import HeaderImageLarger from "../../assets/img/img_header@2x.jpg";
import {
  Typography,
  Grid,
  Card,
  Hidden,
  Slide,
  Fade,
  MobileStepper,
  Collapse,
  Icon
} from "@material-ui/core";
import { LinkedIn, Facebook, Instagram, Twitter } from "@material-ui/icons";
import {
  Box,
  Row,
  Column,
  TextField,
  Button,
  Link
} from "../../common/base-components";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import { offices } from "../../common/mock/officeMockData";
import gallery1 from "../../assets/img/img_gallery_01@2x.png";
import gallery2 from "../../assets/img/img_gallery_02@2x.png";
import gallery3 from "../../assets/img/img_gallery_03@2x.png";

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
    maxHeight: "calc(100vh - 100px)",
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
    padding: "128px 16px 56px 16px",
    [theme.breakpoints.down("sm")]: {
      padding: "24px 16px"
    }
  },

  searchWrapper: {
    maxWidth: 600,
    width: "100%",
    boxShadow: "0px 24px 24px #0000001A;",
    padding: `${theme.spacing(4)}px ${theme.spacing(4.5)}px`,
    borderRadius: 8,
    [theme.breakpoints.down("sm")]: {
      boxShadow: "0px 14px 14px #0000001A",
      padding: `${theme.spacing(2)}px ${theme.spacing(1.5)}px`
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

  searchBox: {
    marginTop: 14,
    [theme.breakpoints.down("sm")]: {
      marginTop: 8
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
    fontSize: "24px",
    [theme.breakpoints.down("sm")]: {
      fontSize: "16px"
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
    color: theme.colors.primary.borderGrey,
    fontWeight: 100
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
    position: "relative"
  },

  imgHelpStepWrapper: {
    paddingLeft: "calc(100% - 363px - 20px)"
  },

  imgHelpStep: {
    boxShadow: "0px 18px 18px #0000001A",
    borderRadius: theme.spacing(),
    width: 363,
    height: 500
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

  recommendedOfficeWrapper: {
    width: 245,
    marginRight: 20
  },

  recommendedOfficeCarousel: {
    width: "100%",
    height: 175,
    borderRadius: 8,
    position: "relative",
    overflow: "hidden"
  },

  favoriteOfficeIcon: {
    position: "absolute",
    top: 8,
    right: 16
  },

  officeImage: {
    width: "100%",
    height: 175
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

  shadowButton: {
    boxShadow: "0px 6px 12px #D7DF234D"
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
    fontSize: "14px",
    textAlign: "center",
    paddingTop: 53,
    paddingBottom: 53,
    maxWidth: 724,
    color: "white",
    [theme.breakpoints.down("sm")]: {
      paddingTop: 24,
      paddingBottom: 24
    }
  },

  prosWrapper: {
    paddingTop: 45,
    paddingBottom: 50
  },

  socialIconsWrapper: {
    height: 55
  },

  contactInfoWrapper: {
    paddingTop: 58,
    paddingBottom: 20
  }
});

class Home extends Component {
  static defaultProps = {
    recommendedOffices: offices
  };

  state = {
    activeHelpStep: 0
  };

  textStepper = ({ active, index, label, content, onClick, ...props }) => (
    <div onClick={() => onClick(index)}>
      <Hidden smDown>
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
              {index}
            </Box>
          </Box>
          <Column alignChildrenStart>
            <Typography
              variant="h6"
              color={!active ? "secondary" : ""}
              className={this.props.classes.textStepTitle}
            >
              {label}
            </Typography>
            <Box paddingTopHalf>
              <Typography
                className={this.props.classes.textStepContent}
                color={!active ? "secondary" : ""}
              >
                {content}
              </Typography>
            </Box>
          </Column>
        </Box>
      </Hidden>
      <Hidden smUp>
        <Column
          classes={{ box: this.props.classes.textStepWrapper }}
          alignChildrenStart
        >
          <Row classes={{ box: this.props.classes.textStepIconWrapper }}>
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
            <Typography
              variant="h6"
              className={this.props.classes.textStepTitle}
            >
              {label}
            </Typography>
            <Icon className={this.props.classes.textStepExpandIcon}>
              {active ? "keyboard_arrow_down" : "keyboard_arrow_up"}
            </Icon>
          </Row>
          <Collapse in={active}>
            <Row paddingTopHalf>
              <Typography
                className={this.props.classes.textStepContent}
                color={!active ? "secondary" : ""}
              >
                {content}
              </Typography>
            </Row>
          </Collapse>
        </Column>
      </Hidden>
    </div>
  );

  imgStepper = ({ active, imgSrc }) =>
    active && (
      <Fade in={active}>
        <Slide direction="left" in={active}>
          <Box classes={{ box: this.props.classes.imgHelpStep }}>
            <img src={imgSrc} alt="Gallery" />
          </Box>
        </Slide>
      </Fade>
    );

  officeWrapper = ({ office }) => (
    <Column
      classes={{ box: this.props.classes.recommendedOfficeWrapper }}
      alignChildrenStart
    >
      <Box classes={{ box: this.props.classes.recommendedOfficeCarousel }}>
        <Box classes={{ box: this.props.classes.favoriteOfficeIcon }}>
          <Icon>heart</Icon>
        </Box>
        <Carousel
          showThumbs={false}
          showIndicators={false}
          swipable={false}
          showStatus={false}
        >
          {office.images.map((img, index) => (
            <div key={index}>
              <img
                src={img.image}
                alt=""
                className={this.props.classes.officeImage}
              />
              <p className="legend">{img.location}</p>
            </div>
          ))}
        </Carousel>
      </Box>
      <Box paddingTopHalf>
        <Typography className={this.props.classes.textMedium}>
          {office.title}
        </Typography>
      </Box>
      <Row paddingTopHalf>
        <Icon color="primary">star</Icon>
        <Typography color="secondary">{office.rating}</Typography>
      </Row>
      <Row>
        <Typography color="primary">${office.price} CAD/month</Typography>
      </Row>
    </Column>
  );

  handleSelectActiveStep = activeHelpStep => () => {
    this.setState({ activeHelpStep });
  };

  render() {
    const { recommendedOffices, classes, t } = this.props;
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
          <Grid
            container
            justify="space-between"
            alignItems="center"
            direction="column"
            className={classes.landingBoard}
          >
            <Grid item width="100%">
              <Card className={classes.searchWrapper}>
                <Column alignChildrenStart>
                  <Typography variant="h6" className={classes.landingTitle}>
                    <Trans i18nKey="dashboardLandingTitle">
                      <Typography
                        color="primary"
                        variant="h6"
                        component="span"
                        className={classes.landingTitle}
                      >
                        {{ name: "TESSI" }}
                      </Typography>
                      <br />
                    </Trans>
                  </Typography>
                  <Typography
                    variant="caption"
                    className={classes.landingSubtitle}
                  >
                    {t("dashboardLandingSubtitle")}
                  </Typography>
                  <TextField
                    fullWidth
                    variant="outlined"
                    placeholder={t("sayHiOrSearch")}
                    className={classes.searchBox}
                  />
                </Column>
              </Card>
            </Grid>
            <Grid item>
              <Grid
                container
                spacing={5}
                direction="row"
                alignItems="center"
                justify="center"
              >
                <Grid item>
                  <Button>{t("chatWithTessi")}</Button>
                </Grid>
                <Grid item>
                  <Button>{t("advancedSearch")}</Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>

        {/* RENTGLOBAL helper block */}
        <Column
          classes={{ box: clsx(classes.fixedWith, classes.blockWrapper) }}
        >
          <Row classes={{ box: classes.blockTitleWrapper }}>
            <Typography variant="h6" className={classes.blockTitle}>
              <Trans i18nKey="howHelpFind">
                <Typography
                  color="primary"
                  variant="h6"
                  component="span"
                  className={classes.blockTitle}
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

        {/* Office list block */}
        <Column
          classes={{ box: clsx(classes.fixedWith, classes.blockWrapper) }}
        >
          <Row classes={{ box: classes.blockTitleWrapper }}>
            <Typography variant="h6" className={classes.blockTitle}>
              {t("latestRecommendOffice")}
            </Typography>
          </Row>
          <Row classes={{ box: classes.blockContentWrapper }} fullWidth>
            <Box alignChildrenStart>
              {recommendedOffices.map((office, index) => (
                <OfficeComponent office={office} key={index} />
              ))}
            </Box>
          </Row>
          <Row classes={{ box: classes.allLatestButton }}>
            <Button variant="secondary" className={classes.shadowButton}>
              {t("allLatest", { count: "50+" })}
            </Button>
          </Row>
        </Column>

        {/* Register block */}
        <Column backgroundPrimary fullWidth>
          <Column
            classes={{ box: clsx(classes.fixedWith, classes.blockWrapper) }}
          >
            <Row classes={{ box: classes.homeRegisterTitle }}>
              <Typography variant="h6" className={classes.blockTitle}>
                {t("homeRegisterTitle")}
              </Typography>
            </Row>
            <Row
              classes={{ box: classes.homeRegisterContent }}
              fullWidth
              color="white"
            >
              {t("homeRegisterContent")}
            </Row>
            <Row>
              <Button
                variant="secondary"
                className={classes.whiteShadowButton}
                onClick={() =>
                  this.props.history.push("/auth/register/landlord")
                }
              >
                {t("registerAndStartRENTGLOBALConsultant")}
              </Button>
            </Row>
          </Column>
        </Column>

        {/* RENTGLOBAL pros block */}
        <Column
          classes={{ box: clsx(classes.fixedWith, classes.blockWrapper) }}
        >
          <Grid container direction="row" className={classes.prosWrapper}>
            <Grid item xs={12} sm={4}>
              <Column>
                <Row>
                  <Icon color="primary" fontSize="large">
                    face
                  </Icon>
                </Row>
                <Row paddingTop>
                  <Typography variant="h6">{t("flexibility")}</Typography>
                </Row>
                <Row>
                  <Typography>{t("minimumCommitment")}</Typography>
                </Row>
              </Column>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Column>
                <Row>
                  <Icon color="primary" fontSize="large">
                    date_range
                  </Icon>
                </Row>
                <Row paddingTop>
                  <Typography variant="h6">{t("confiance")}</Typography>
                </Row>
                <Row>
                  <Typography>{t("personalMonitoring")}</Typography>
                </Row>
              </Column>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Column>
                <Row>
                  <Icon color="primary" fontSize="large">
                    favorite_border
                  </Icon>
                </Row>
                <Row paddingTop>
                  <Typography variant="h6">{t("simplicity")}</Typography>
                </Row>
                <Row>
                  <Typography>{t("turnkeySolution")}</Typography>
                </Row>
              </Column>
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
                <Typography>{t("receiveNewsletter")}</Typography>
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
                <Typography>{t("followUpSocials")}</Typography>
                <Row
                  paddingTopHalf
                  classes={{ box: classes.socialIconsWrapper }}
                >
                  <Box paddingLeft paddingRight>
                    <Link to="#">
                      <Twitter fontSize="large" />
                    </Link>
                  </Box>
                  <Box paddingLeft paddingRight>
                    <Link to="#">
                      <Facebook fontSize="large" />
                    </Link>
                  </Box>
                  <Box paddingLeft paddingRight>
                    <Link to="#">
                      <Instagram fontSize="large" />
                    </Link>
                  </Box>
                  <Box paddingLeft paddingRight>
                    <Link to="#">
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
                <Typography variant="h6">{t("rentglobal")}</Typography>
                <Column paddingTop alignChildrenStart>
                  <Link to="/">
                    <Typography variant="body1">{t("aboutUs")}</Typography>
                  </Link>
                  <Link to="/">
                    <Typography variant="body1">{t("news")}</Typography>
                  </Link>
                  <Link to="/">
                    <Typography variant="body1">{t("careers")}</Typography>
                  </Link>
                  <Link to="/">
                    <Typography variant="body1">{t("contactUs")}</Typography>
                  </Link>
                </Column>
              </Column>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Column paddingTopDouble paddingBottomDouble alignChildrenStart>
                <Typography variant="h6">{t("discover")}</Typography>
                <Column paddingTop alignChildrenStart>
                  <Link to="/">
                    <Typography variant="body1">{t("howItWorks")}</Typography>
                  </Link>
                  <Link to="/">
                    <Typography variant="body1">{t("legalNotice")}</Typography>
                  </Link>
                  <Link to="/">
                    <Typography variant="body1">
                      {t("privacyPolicy")}
                    </Typography>
                  </Link>
                  <Link to="/">
                    <Typography variant="body1">
                      {t("termsAndConditions")}
                    </Typography>
                  </Link>
                </Column>
              </Column>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Column paddingTopDouble paddingBottomDouble alignChildrenStart>
                <Typography variant="h6">{t("support")}</Typography>
                <Column paddingTop alignChildrenStart>
                  <Link to="/">
                    <Typography variant="body1">{t("help")}</Typography>
                  </Link>
                  <Link to="/auth/login">
                    <Typography variant="body1">{t("login")}</Typography>
                  </Link>
                  <Link to="/auth/register">
                    <Typography variant="body1">{t("register")}</Typography>
                  </Link>
                  <Link to="/">
                    <Typography variant="body1">{t("support")}</Typography>
                  </Link>
                </Column>
              </Column>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Column paddingTopDouble paddingBottomDouble alignChildrenStart>
                <Typography variant="h6">{t("contact")}</Typography>
                <Column paddingTop alignChildrenStart>
                  <Typography variant="body1">
                    1176, street Bishop, Montreal,
                  </Typography>
                  <Typography variant="body1">QC H3G 2E3</Typography>
                  <Typography variant="body1">info@dokstation.ca</Typography>
                  <Typography variant="body1">Phone: (514) 461-3030</Typography>
                </Column>
              </Column>
            </Grid>
          </Grid>
        </Column>
      </Column>
    );
  }
}

export default withStyles(styleSheet)(
  withTranslation(["home", "common"])(Home)
);
