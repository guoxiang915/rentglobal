import React, { PureComponent } from "react";
import { withStyles } from "@material-ui/core/styles";
import { withTranslation } from "react-i18next";
import withWidth, { isWidthDown } from "@material-ui/core/withWidth";
import { Tabs, Tab } from "@material-ui/core";
import { KeyboardBackspace, Person } from "@material-ui/icons";
import {
  Column,
  Row,
  Box,
  Stretch,
  Button,
  ImageIcon,
  UserIcon,
  Typography,
  CheckIcon,
  EditIcon,
  ReviewIcon,
  Rating,
} from "../../common/base-components";
import { formatDate1 } from "../../utils/formatters";
import { CompanyReviews } from "../../common/base-layouts";
import { getProfileStatus } from "../../utils/validators";

const styleSheet = (theme) => ({
  root: {
    paddingLeft: theme.spacing(5),
    paddingRight: theme.spacing(5),
    [theme.breakpoints.down("xs")]: {
      paddingLeft: 0,
      paddingRight: 0,
    },
  },

  fullWidth: {
    width: "100%",
  },

  profilePanel: {
    [theme.breakpoints.down("xs")]: {
      position: "relative",
    },
  },

  accountAvatar: {
    width: 139,
    height: 139,
    marginRight: 32,
    borderRadius: "50%",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },

  accountName: {
    minHeight: 75,
  },

  verifyBadge: {
    fontSize: 11,
    background: theme.colors.primary.mainColor,
    color: theme.colors.primary.white,
    height: 25,
    alignItems: "center",
    borderRadius: 16,
    padding: "8px 13px 8px 10px",
    marginLeft: 16,
    [theme.breakpoints.down("xs")]: {
      marginRight: -158,
    },
  },

  editButton: {
    [theme.breakpoints.down("xs")]: {
      position: "absolute",
      right: 0,
      top: -20,
    },
  },

  tabs: {
    marginTop: 12,
    width: "100%",
    borderBottom: `1px solid ${theme.colors.primary.borderGrey}`,
  },

  indicator: {
    borderRadius: 2,
    height: 4,
  },

  tab: {
    textTransform: "none",
    minWidth: 0,
    padding: "16px 0px",
    marginRight: 28,
    marginTop: 56,
    [theme.breakpoints.down("xs")]: {
      marginRight: 16,
    },
  },
});

class PreviewProfile extends PureComponent {
  static propTypes = {};

  state = {
    currentTab: "reviews",
  };

  handleBack = () => {
    this.props.navigate("profile");
  };

  handleEdit = () => {
    this.props.navigate("profile");
  };

  handleChangeTab = (tab) => {
    this.setState({ currentTab: tab });
  };

  render() {
    const { classes: s, t, width } = this.props;
    const { user, userRole } = this.props.auth;
    const { currentTab } = this.state;

    const role = userRole || user?.role;

    // let profileCompleted = 0;
    // let profileCharged = 10;
    let profileCompleteness = null;
    const profileStatus = getProfileStatus(user, role);
    // profileCompleted = profileStatus.completed;
    // profileCharged = profileStatus.charged;
    profileCompleteness = profileStatus.completeness;

    const companyRating = 3.5;

    return (
      <Column
        classes={{ box: s.root }}
        fullWidth
        alignChildrenStart
        paddingTopDouble
        paddingBottomDouble
      >
        <Row fullWidth paddingBottom>
          <Stretch />
          <Button
            link='secondary'
            background='secondaryLight'
            onClick={this.handleBack}
          >
            <KeyboardBackspace />
            <Typography paddingLeft fontSizeS>
              {t("back")}
            </Typography>
          </Button>
        </Row>

        {/** show profile */}
        <Box paddingTopDouble />
        <Row
          classes={{ box: s.profilePanel }}
          fullWidth
          wrap
          column={isWidthDown("xs", width)}
        >
          {/* user avatar */}
          <Box
            alignChildrenCenter
            justifyChildrenCenter
            style={{
              backgroundImage: user.avatar
                ? `url("${user.avatar.bucketPath}")`
                : "none",
            }}
            border
            classes={{
              box: s.accountAvatar,
            }}
          >
            {!user.avatar &&
              (userRole === "company" ? (
                <ImageIcon className={s.smallIcon} variant='normal' />
              ) : (
                <UserIcon className={s.smallIcon} variant='normal' />
              ))}
            {isWidthDown("xs", width) && (
              <React.Fragment>
                {profileCompleteness !== "profileNeedAttention" && (
                  <Box classes={{ box: s.verifyBadge }}>
                    <CheckIcon style={{ width: 11, height: 11 }} />
                    <Typography paddingLeftHalf>{t("verified")}</Typography>
                  </Box>
                )}
                <Button
                  link='primary'
                  background='normalLight'
                  inverse
                  onClick={this.handleEdit}
                  classes={{ root: s.editButton }}
                >
                  <EditIcon style={{ width: 16, height: 16 }} />
                  <Typography paddingLeft fontSizeS>
                    {t("edit")}
                  </Typography>
                </Button>
              </React.Fragment>
            )}
          </Box>

          {/* user name */}
          <Column
            classes={{ box: s.accountName }}
            justifyChildrenCenter
            alignChildrenStart={!isWidthDown("xs", width)}
            alignChildrenCenter={isWidthDown("xs", width)}
            stretch
          >
            <Typography
              alignChildrenCenter
              fullWidth
              justifyChildrenCenter
              paddingTopDouble={isWidthDown("xs", width)}
            >
              <Typography
                textDarkGrey
                fontSizeXL={!isWidthDown("xs", width)}
                fontSizeXS={isWidthDown("xs", width)}
              >
                {user.generalInfo?.username || "User"}
              </Typography>
              {!isWidthDown("xs", width) && (
                <React.Fragment>
                  {profileCompleteness !== "profileNeedAttention" && (
                    <Box classes={{ box: s.verifyBadge }}>
                      <CheckIcon style={{ width: 11, height: 11 }} />
                      <Typography paddingLeftHalf>{t("verified")}</Typography>
                    </Box>
                  )}
                  <Stretch />
                  <Button
                    link='primary'
                    background='normalLight'
                    inverse
                    onClick={this.handleEdit}
                  >
                    <EditIcon style={{ width: 16, height: 16 }} />
                    <Typography paddingLeft fontSizeS>
                      {t("edit")}
                    </Typography>
                  </Button>
                </React.Fragment>
              )}
            </Typography>
            <Box paddingTopHalf column={isWidthDown("xs", width)}>
              <Box>
                <Typography paddingRight textGrey>
                  {t("startup")} (<Person style={{ width: 20, height: 20 }} />{" "}
                  {user.companyProfile?.companySize || 0})
                </Typography>
                <Typography paddingRight>
                  {user.generalInfo?.address?.city},{" "}
                  {user.generalInfo?.address?.country}
                </Typography>
              </Box>
              <Typography textGrey>
                {t("joined")}: {formatDate1(user.createdAt)}
              </Typography>
            </Box>
            <Box paddingTop>
              <Rating rating={companyRating} />
            </Box>
          </Column>
        </Row>
        <Row paddingTop>
          <Typography textGrey>{user.companyProfile?.shortDescription}</Typography>
        </Row>

        <Row fullWidth style={{ marginBottom: 24 }}>
          {/** Tabs */}
          <Tabs
            value={currentTab}
            onChange={this.handleChangeTab}
            aria-label='wrapped label tabs'
            indicatorColor='primary'
            textColor='primary'
            classes={{ root: s.tabs, indicator: s.indicator }}
            centered={isWidthDown("xs", width)}
          >
            <Tab
              value={"reviews"}
              label={
                <Row>
                  <ReviewIcon style={{ width: 18, height: 16 }} />
                  <Typography paddingLeftHalf fontSizeS>
                    {t("reviews")} (2)
                  </Typography>
                </Row>
              }
              classes={{ root: s.tab }}
            />
          </Tabs>
        </Row>

        <Row fullWidth paddingBottom>
          {currentTab === "reviews" && <CompanyReviews />}
        </Row>
      </Column>
    );
  }
}

export default withStyles(styleSheet)(
  withTranslation("common")(withWidth()(PreviewProfile))
);
