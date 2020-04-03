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
  Button,
  Checkbox,
  BuildingsIcon,
  ArrowRightAltIcon,
  ImageIcon,
  UserIcon,
  FavoriteIcon,
  NoteIcon,
  OptimizationIcon,
  CalendarIcon,
  AdjustIcon,
  CloseIcon
} from "../../common/base-components";
import { formatDate, getWeekday } from "../../utils/formatters";
import { getProfileStatus } from "../../utils/validators";
import { StatisticIconBox } from "../../common/base-layouts";
import { ArrowBackIos } from "@material-ui/icons";

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

  normalIcon: {
    color: theme.colors.primary.grey
  },

  darkIcon: {
    color: theme.colors.primary.darkGrey
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
    position: "relative",
    width: "100%",
    height: 450,
    marginTop: 40,
    marginBottom: 40,
    [theme.breakpoints.down("sm")]: {
      height: 350
    },
    [theme.breakpoints.down("xs")]: {
      height: 250
    }
  },

  statisticBoxWrapper: {
    marginLeft: -3,
    width: "calc(100% + 3px)"
  },

  statisticBox: {
    marginBottom: 10,
    padding: "0px 4px 0px 3px",
    borderRight: `1px solid ${theme.colors.primary.borderGrey}`,
    "&:last-of-type": {
      paddingRight: 0,
      borderRight: "none"
    }
  },

  currentOfficeWrapper: {
    width: 232,
    height: "100%"
  },

  officeFilterWrapper: {
    position: "absolute",
    top: 0,
    left: 0,
    paddingTop: 7
  },

  officeFilters: {
    paddingLeft: 6
  },

  officeFilter: {
    background: theme.colors.primary.white,
    width: 162
  },

  toggleFilterButton: {
    width: 32,
    height: 32,
    marginLeft: 12,
    background: theme.colors.primary.white,
    "&:hover": {
      background: theme.colors.primary.white
    }
  },

  clearCurrentOfficeButton: {
    width: 32,
    height: 32,
    position: "absolute",
    top: "calc(50% - 16px)",
    right: 16,
    background: theme.colors.primary.white,
    "&:hover": {
      background: theme.colors.primary.white
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

  state = {
    offices: [],
    leasedOffices: [],
    availableOffices: [],
    independentOffices: [],
    privateOffices: [],
    assignedOffices: [],
    unassignedOffices: [],
    showOfficeFilters: true,
    currentOfficeFilter: "allOffices",
    currentOffice: null
  };

  /** Navigation */
  navigate = path => () => {
    this.props.navigate(path);
  };

  /** Get landlord offices */
  componentDidMount() {
    this.props.getOffices().then(
      response =>
        this.setState({
          offices: response.data,
          leasedOffices: response.data.filter(o => !!o.leasedBy),
          availableOffices: response.data.filter(o => !o.leasedBy),
          independentOffices: response.data.filter(
            o => o.officeType === "independentOffice"
          ),
          privateOffices: response.data.filter(
            o => o.officeType === "privateOffice"
          ),
          assignedOffices: response.data.filter(
            o => o.officeType === "assignedWorkstation"
          ),
          unassignedOffices: response.data.filter(
            o => o.officeType === "unassignedWorkstation"
          )
        }),
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

  /** Toggle office filter */
  handleToggleOfficeFilter = () => {
    this.setState({ showOfficeFilters: !this.state.showOfficeFilters });
  };

  /** Set office filter */
  handleSelectOfficeFilter = filter => () => {
    this.setState({ currentOfficeFilter: filter });
  };

  /** Select office from map */
  handleSelectOffice = coord => {
    console.log(coord);
    this.setState({
      currentOffice:
        this.state.offices.find(o => o.location.coordinates === coord) || null
    });
  };

  /** Clear selected office */
  handleClearCurrentOffice = () => {
    this.setState({ currentOffice: null });
  };

  /**
   * Renderer function
   */
  render() {
    const { classes: s, t } = this.props;
    const {
      offices,
      currentOffice,
      showOfficeFilters,
      currentOfficeFilter,
      leasedOffices,
      availableOffices,
      independentOffices,
      privateOffices,
      assignedOffices,
      unassignedOffices
    } = this.state;
    const { user } = this.props.auth;
    const role = "landlord";
    const profile = user[`${role}Profile`];
    const profileStatus = getProfileStatus(user, role);
    const {
      completed: profileCompleted,
      charged: profileCharged,
      completeness: profileCompleteness
    } = profileStatus;

    const officeFilters = [
      {
        name: "allOffices",
        value: offices
      },
      {
        name: "leased",
        value: leasedOffices
      },
      {
        name: "available",
        value: availableOffices
      },
      {
        name: "independent",
        value: independentOffices
      },
      {
        name: "privateOffice",
        value: privateOffices
      },
      {
        name: "assigned",
        value: assignedOffices
      },
      {
        name: "unassigned",
        value: unassignedOffices
      }
    ];

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
          <Column stretch fullHeight noOverflow>
            <GoogleMap
              coordinates={offices
                .filter(
                  office => office.location && office.location.coordinates
                )
                .map(office => office.location.coordinates)}
              onClickMarker={this.handleSelectOffice}
            />

            {currentOffice && (
              <Button
                variant="icon"
                className={s.clearCurrentOfficeButton}
                onClick={this.handleClearCurrentOffice}
              >
                <CloseIcon
                  style={{ width: 11, height: 11 }}
                  className={s.normalIcon}
                />
              </Button>
            )}
          </Column>

          {/* show office filters */}
          <Row classes={{ box: s.officeFilterWrapper }} alignChildrenStart>
            {showOfficeFilters && (
              <Column classes={{ box: s.officeFilters }}>
                {officeFilters.map((filter, index) => (
                  <React.Fragment key={index}>
                    <Box paddingBottomHalf>
                      <Checkbox
                        variant="outlined"
                        isChecked={filter.name === currentOfficeFilter}
                        label={
                          t(filter.name) + " (" + filter.value.length + ")"
                        }
                        onChange={this.handleSelectOfficeFilter(filter.name)}
                        className={s.officeFilter}
                      />
                    </Box>
                  </React.Fragment>
                ))}
              </Column>
            )}

            <Button
              variant="icon"
              className={s.toggleFilterButton}
              onClick={this.handleToggleOfficeFilter}
            >
              {showOfficeFilters ? (
                <ArrowBackIos
                  style={{ width: 12, height: 16 }}
                  className={s.normalIcon}
                />
              ) : (
                <AdjustIcon
                  style={{ width: 19, height: 18 }}
                  className={s.normalIcon}
                />
              )}
            </Button>
          </Row>

          {/* show office detail info */}
          {currentOffice && (
            <>
              <Column></Column>
            </>
          )}
        </Row>

        {/** show statistics */}
        <Row classes={{ box: s.statisticBoxWrapper }} wrap>
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
