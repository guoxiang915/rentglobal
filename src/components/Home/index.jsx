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
  Step,
  Stepper,
  StepLabel,
  StepIcon,
  StepConnector,
  StepContent,
  Hidden,
  Slide,
  Fade,
  MobileStepper,
  Collapse,
  Icon
} from "@material-ui/core";
import {
  Box,
  Row,
  Column,
  TextField,
  Button
} from "../../common/base-components";

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
    width: 234,
    marginRight: 20
  },

  officeImage: {
    width: "100%",
    height: 175,
    borderRadius: 8
  },

  ratingText: {}
});

class Home extends Component {
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

  officeWrapper = () => (
    <Column classes={{ box: this.props.classes.recommendedOfficeWrapper }}>
      <img src="" alt="" className={this.props.classes.officeImage} />
      <Typography className={this.props.classes.textMedium}>
        Title (or Short Description)
      </Typography>
      <Row>
        <Icon color="primary">star</Icon>
        <Typography color="secondary">3.5</Typography>
      </Row>
      <Row>
        <Typography color="primary">$4500 CAD/month</Typography>
      </Row>
    </Column>
  );

  handleSelectActiveStep = activeHelpStep => () => {
    this.setState({ activeHelpStep });
  };

  render() {
    const { classes, t } = this.props;
    const { activeHelpStep } = this.state;
    const TextStepComponent = this.textStepper;
    const ImgStepComponent = this.imgStepper;
    const OfficeComponent = this.officeWrapper;

    return (
      <Column className={classes.root}>
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
                  active={activeHelpStep == 0}
                  onClick={this.handleSelectActiveStep(0)}
                />
                <TextStepComponent
                  index="2"
                  label={t("howHelpFind2_title")}
                  content={t("howHelpFind2_content")}
                  active={activeHelpStep == 1}
                  onClick={this.handleSelectActiveStep(1)}
                />
                <TextStepComponent
                  index="3"
                  label={t("howHelpFind3_title")}
                  content={t("howHelpFind3_content")}
                  active={activeHelpStep == 2}
                  onClick={this.handleSelectActiveStep(2)}
                />
              </Grid>
              <Grid item className={classes.imgHelpStepper} md={6} sm={12}>
                <Hidden smDown>
                  <Box classes={{ box: classes.imgHelpStepWrapper }}>
                    <ImgStepComponent
                      active={activeHelpStep == 0}
                      imgSrc={gallery1}
                    />
                    <ImgStepComponent
                      active={activeHelpStep == 1}
                      imgSrc={gallery2}
                    />
                    <ImgStepComponent
                      active={activeHelpStep == 2}
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
        <Column
          classes={{ box: clsx(classes.fixedWith, classes.blockWrapper) }}
        >
          <Row classes={{ box: classes.blockTitleWrapper }}>
            <Typography variant="h6" className={classes.blockTitle}>
              {t("latestRecommendOffice")}
            </Typography>
          </Row>
          <Row classes={{ box: classes.blockContentWrapper }}>
            <OfficeComponent />
            <OfficeComponent />
            <OfficeComponent />
            <OfficeComponent />
          </Row>
        </Column>
      </Column>
    );
  }
}

export default withStyles(styleSheet)(
  withTranslation(["home", "common"])(Home)
);
