import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { withTranslation } from "react-i18next";
import withWidth from "@material-ui/core/withWidth";
import PropTypes from "prop-types";
import {
  Row,
  Column,
  Stretch,
  Box,
  Link,
  LinearProgress,
  Typography,
  GoogleMap,
  BuildingsIcon,
  ArrowRightAltIcon,
  ImageIcon,
  UserIcon,
  FavoriteIcon,
  NoteIcon,
  OptimizationIcon,
  CalendarIcon
} from "../../common/base-components";
import { formatDate, getWeekday } from "../../utils/formatters";
import { getProfileStatus } from "../../utils/validators";
import { StatisticIconBox } from "../../common/base-layouts";

const styleSheet = theme => ({
  root: {
    paddingLeft: theme.spacing(5),
    paddingRight: theme.spacing(5),
    [theme.breakpoints.down("sm")]: {
      paddingLeft: 27,
      paddingRight: 27
    }
  },

  fullWidth: {
    width: "100%"
  },

  lightIcon: {
    color: theme.colors.primary.darkGrey,
    opacity: 0.15
  },

  profilePanel: {
    background: theme.colors.primary.white,
    padding: "23px 33px 27px",
    position: "relative"
  },

  accountAvatar: {
    width: 80,
    height: 80
  },

  accountName: {
    paddingLeft: 24
  },

  profileCompletenessWrapper: {
    position: "absolute",
    bottom: 0,
    right: 0,
    padding: 14,
    paddingLeft: 18,
    width: 228,
    background: theme.colors.primary.whiteGrey
  },

  profileProgress: {
    marginBottom: 10
  },

  attentionIcon: {
    marginLeft: 25,
    width: 11,
    height: 8
  },

  officesMap: {
    width: "100%",
    height: 450,
    paddingTop: 40,
    paddingBottom: 30,
    [theme.breakpoints.down("sm")]: {
      height: 350
    },
    [theme.breakpoints.down("xs")]: {
      height: 250
    }
  },

  statisticBox: {
    marginBottom: 10,
    padding: "0px 4px",
    borderRight: `1px solid ${theme.colors.primary.borderGrey}`,
    "&:last-of-type": {
      paddingRight: 0,
      borderRight: "none"
    }
  }
});

class Dashboard extends Component {
  static propTypes = {
    navigate: PropTypes.func,
    getOffices: PropTypes.func.isRequired,

    classes: PropTypes.object,
    t: PropTypes.func
  };

  state = { offices: [] };

  /** Navigation */
  navigate = path => () => {
    this.props.navigate(path);
  };

  /** Get landlord offices */
  componentDidMount() {
    this.props.getOffices().then(
      response => this.setState({ offices: response.data }),
      error => {}
    );
  }

  /** navigate to office detail page */
  handleNavigateOfficeDetail = office => () => {
    if (office.published === true) {
      this.props.navigate("landlord/offices", office._id);
    } else {
      this.props.navigate("landlord/offices", `${office._id}/edit`);
    }
  };

  /** Set favorite of office */
  handleSetFavorite = office => () => {
    // TODO: call backend api to set favorite
    office.favorite = !office.favorite;
    this.setState({});
  };

  /**
   * Renderer function
   */
  render() {
    const { classes: s, t } = this.props;
    const { offices } = this.state;
    const { user } = this.props.auth;
    const role = "landlord";
    const profile = user[`${role}Profile`];
    const profileStatus = getProfileStatus(user, role);
    const {
      completed: profileCompleted,
      charged: profileCharged,
      completeness: profileCompleteness
    } = profileStatus;

    return (
      <Column
        classes={{ box: s.root }}
        fullWidth
        alignChildrenStart
        paddingTopDouble
        paddingBottomDouble
      >
        {/** title */}
        <Typography fontSizeM textSecondary style={{ marginBottom: 45 }}>
          {t("dashboard")}
        </Typography>

        {/** show sub title and datetime */}
        <Row fullWidth alignChildrenCenter>
          <BuildingsIcon
            style={{ width: 27, height: 22 }}
            className={s.lightIcon}
          />
          <Typography paddingLeft fontSizeS textMediumGrey>
            {t("welcomeToLandlord")}
          </Typography>

          <Stretch />

          <Column alignChildrenEnd>
            <Typography fontSizeXS textMediumGrey>
              {[formatDate(new Date()), getWeekday(new Date())].join(" ")}
            </Typography>
            <Typography fontSizeS textSecondary paddingTopHalf>
              {new Date().toLocaleTimeString()}
            </Typography>
          </Column>
        </Row>

        {/** show profile */}
        <Box paddingTopDouble />
        <Row classes={{ box: s.profilePanel }} fullWidth>
          {/* user avatar */}
          <Box
            alignChildrenCenter
            justifyChildrenCenter
            style={{
              borderRadius: role === "landlord" ? 8 : "50%",
              backgroundImage: user.avatar
                ? `url("${user.avatar.bucketPath}")`
                : "none",
              backgroundSize: "contain",
              backgroundPosition: "center"
            }}
            border
            classes={{
              box: s.accountAvatar
            }}
          >
            {!user.avatar &&
              (role === "landlord" ? (
                <ImageIcon className={s.smallIcon} variant="normal" />
              ) : (
                <UserIcon className={s.smallIcon} variant="normal" />
              ))}
          </Box>

          {/* user name and last login datetime */}
          <Column
            classes={{ box: s.accountName }}
            justifyChildrenCenter
            alignChildrenStart
          >
            <Typography fontSizeS textSecondary>
              {profile.username}
            </Typography>
            <Typography fontSizeXS textMediumGrey paddingTopHalf>
              {t("lastLogin", {
                datetime: [
                  formatDate(user.updatedAt),
                  new Date(user.updatedAt).toLocaleTimeString()
                ].join(" ")
              })}
            </Typography>
          </Column>

          {/* profile completeness */}
          <Column classes={{ box: s.profileCompletenessWrapper }}>
            <LinearProgress
              value={profileCompleted}
              valueBuffer={profileCharged}
              styles={{
                root: s.profileProgress
              }}
            />
            <Link to="#" onClick={this.navigate("profile")}>
              <Box
                fullWidth
                textPrimary={profileCompleteness === "profileCompleted"}
                textMediumGrey={profileCompleteness === "profileNotComplete"}
                textErrorRed={profileCompleteness === "profileNeedAttention"}
              >
                <Typography fontSizeXS>{t(profileCompleteness)}</Typography>
                <Stretch />
                <Typography fontSizeS alignChildrenCenter>
                  <ArrowRightAltIcon
                    className={s.attentionIcon}
                    variant={profileCompleted < 100 ? "errorRed" : "normal"}
                  />
                </Typography>
              </Box>
            </Link>
          </Column>
        </Row>

        {/** show google map with offices in it */}
        <Row classes={{ box: s.officesMap }}>
          <GoogleMap
            coordinates={offices
              .filter(office => office.location && office.location.coordinates)
              .map(office => office.location.coordinates)}
          />
        </Row>

        {/** show statistics */}
        <Row fullWidth wrap style={{ marginLeft: -4 }}>
          <Box classes={{ box: s.statisticBox }}>
            <StatisticIconBox
              icon={
                <FavoriteIcon
                  className={s.lightIcon}
                  style={{ width: 14, height: 13 }}
                />
              }
              title={t("favoriteOffice")}
              statistics={[{ value: 0, variant: "primary" }]}
            />
          </Box>
          <Box classes={{ box: s.statisticBox }}>
            <StatisticIconBox
              icon={
                <NoteIcon
                  className={s.lightIcon}
                  style={{ width: 14, height: 16 }}
                />
              }
              title={t("totalContracts")}
              statistics={[{ value: 2, variant: "primary" }]}
            />
          </Box>
          <Box classes={{ box: s.statisticBox }}>
            <StatisticIconBox
              icon={
                <OptimizationIcon
                  className={s.lightIcon}
                  style={{ width: 17, height: 19 }}
                />
              }
              title={t("totalOptimization")}
              statistics={[{ value: 1, variant: "primary" }]}
            />
          </Box>
          <Box classes={{ box: s.statisticBox }}>
            <StatisticIconBox
              icon={
                <CalendarIcon
                  className={s.lightIcon}
                  style={{ width: 16, height: 15 }}
                />
              }
              title={t("calendarEvents")}
              statistics={[{ value: 4, variant: "primary" }]}
            />
          </Box>
        </Row>
      </Column>
    );
  }
}

export default withWidth()(
  withStyles(styleSheet)(withTranslation("common")(Dashboard))
);
