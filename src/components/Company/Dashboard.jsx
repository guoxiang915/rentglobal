import React, { PureComponent, useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import { withRouter } from "react-router-dom";
import { withTranslation } from "react-i18next";
import withWidth, { isWidthDown } from "@material-ui/core/withWidth";
import PropTypes from "prop-types";
import { Launch as LaunchIcon } from "@material-ui/icons";
import { ArrowBackIos } from "@material-ui/icons";
import {
  Row,
  Column,
  Stretch,
  Box,
  Link,
  LinearProgress,
  Typography,
  GoogleMap,
  GoogleMapMarker,
  Button,
  Checkbox,
  BuildingsIcon,
  ArrowRightAltIcon,
  ImageIcon,
  UserIcon,
  FavoriteIcon,
  NoteIcon,
  StarOutlineIcon,
  CalendarIcon,
  AdjustIcon,
  CloseIcon,
  CarouselWrapper,
  TextField,
  TessiIcon,
  SearchIcon,
} from "../../common/base-components";
import { formatDate, getWeekday } from "../../utils/formatters";
import { getProfileStatus } from "../../utils/validators";
import { TabWrapper, StatisticIconBox } from "../../common/base-layouts";
import { ConditionalWrapper } from "../../utils/helpers";

const styleSheet = (theme) => ({
  root: {
    paddingLeft: theme.spacing(5),
    paddingRight: theme.spacing(5),
    marginBottom: 120,
    [theme.breakpoints.down("sm")]: {
      paddingLeft: 27,
      paddingRight: 27,
      marginBottom: 80,
    },
  },

  fullWidth: {
    width: "100%",
  },

  lightIcon: {
    color: theme.colors.primary.darkGrey,
    opacity: 0.15,
  },

  normalIcon: {
    color: theme.colors.primary.grey,
  },

  darkIcon: {
    color: theme.colors.primary.darkGrey,
  },

  searchBoxPanel: {
    padding: "23px 33px 27px",
    background: theme.colors.primary.mainColor,
    borderRadius: 8,
  },

  searchInputBox: {
    maxWidth: 500,
  },

  searchInput: {
    backgroundColor: theme.colors.primary.white,
  },

  searchInputProps: {
    color: theme.colors.primary.darkGrey,

    "&::placeholder": {
      opacity: 1,
    },
  },

  profilePanel: {
    background: theme.colors.primary.white,
    padding: "23px 33px 27px",
    position: "relative",
    borderRadius: 8,
  },

  accountAvatar: {
    width: 80,
    height: 80,
    marginRight: 24,
  },

  accountName: {
    minHeight: 75,
  },

  previewWrapper: {
    position: "absolute",
    top: 0,
    right: 0,
    padding: 10,
    paddingLeft: 18,
    width: 228,
  },

  profileCompletenessWrapper: {
    position: "absolute",
    bottom: 0,
    right: 0,
    padding: 14,
    paddingLeft: 18,
    width: 228,
    background: theme.colors.primary.whiteGrey,
  },

  profileProgress: {
    marginBottom: 10,
  },

  attentionIcon: {
    marginLeft: 25,
    width: 11,
    height: 8,
  },

  officesMapWrapper: {
    marginTop: 20,
    marginBottom: 20,
    width: "100%",
  },

  tabWrapper: {
    paddingTop: 28,
  },

  officesMap: {
    position: "relative",
    width: "100%",
    height: 450,
    maxHeight: "calc(100vh - 130px)",
    [theme.breakpoints.down("sm")]: {
      height: 450,
    },
    [theme.breakpoints.down("xs")]: {
      height: 570,
      marginLeft: -27,
      marginRight: -27,
      width: "calc(100% + 54px)",
    },
  },

  statisticBoxWrapper: {},

  statisticBox: {
    marginBottom: 10,
    padding: 0,
    paddingRight: 8,
    "&:last-of-type": {
      paddingRight: 0,
    },
  },

  currentOfficeWrapper: {
    width: 232,
    height: "100%",
  },

  officeFilterWrapper: {
    position: "absolute",
    top: 0,
    left: 0,
    paddingTop: 7,
    [theme.breakpoints.down("xs")]: {
      paddingTop: 30,
      paddingLeft: 20,
    },
  },

  officeFilters: {
    paddingLeft: 6,
  },

  officeFilter: {
    background: theme.colors.primary.white,
    width: 162,
  },

  toggleFilterButton: {
    width: 32,
    height: 32,
    marginLeft: 12,
    background: theme.colors.primary.white,
    "&:hover": {
      background: theme.colors.primary.white,
    },
  },

  clearCurrentOfficeButton: {
    width: 32,
    height: 32,
    position: "absolute",
    top: "calc(50% - 16px)",
    right: 16,
    background: theme.colors.primary.white,
    "&:hover": {
      background: theme.colors.primary.white,
    },
  },

  officeDetailWrapper: {
    height: "100%",
    background: theme.colors.primary.white,
  },

  officeDetail: {
    width: 235,
    padding: 12,
  },

  officeFullView: {
    padding: 25,
    background: theme.colors.primary.mainColor,
    cursor: "pointer",
  },
});

class Dashboard extends PureComponent {
  static propTypes = {
    navigate: PropTypes.func,
    getOffices: PropTypes.func.isRequired,

    classes: PropTypes.object,
    t: PropTypes.func,
  };

  state = {
    offices: [],
    showOfficeFilters: true,
    currentOfficeFilter: "allOffices",
    currentOffice: null,
  };

  markerTooltipIcons = {
    independentOffice: null,
    privateOffice: null,
    assignedWorkstation: null,
    unassignedWorkstation: null,
  };

  officeFilters = {
    allOffices: {
      name: "allOffices",
    },
    myOffices: {
      name: "myOffices",
    },
  };

  /** Navigation */
  navigate = (path) => () => {
    this.props.navigate(path);
  };

  /** Get offices */
  componentDidMount() {
    this.props.getOffices().then(
      (response) => {
        const offices = response.data.docs;

        this.officeFilters.allOffices.value = offices;
        // TODO: Filter my offices
        this.officeFilters.myOffices.value = offices.filter(
          (o) => !!o.leasedBy
        );
        this.setState({ offices });
      },
      () => {}
    );
  }

  /** navigate to office detail page */
  handleNavigateOfficeDetail = (office, t) => () => {
    if (office.published === true) {
      this.props.navigate(
        "offices",
        `${office._id}/${office.location.country}/${t(office.officeType)}/${
          office.numberOfEmployees
        } ${t("employees")}/${office.refId}-${office.title}`.replace(
          /\s+/g,
          "-"
        )
      );
    } else {
      this.props.navigate("offices", `${office._id}/edit`);
    }
  };

  /** Toggle office filter */
  handleToggleOfficeFilter = () => {
    this.setState({ showOfficeFilters: !this.state.showOfficeFilters });
  };

  /** Set office filter */
  handleSelectOfficeFilter = (filter) => () => {
    this.setState({
      currentOfficeFilter: filter,
      offices: this.officeFilters[filter].value,
    });
  };

  /** Select office from map */
  handleSelectOffice = (office) => () => {
    this.setState({ currentOffice: office || null });
  };

  /** Clear selected office */
  handleClearCurrentOffice = () => {
    this.setState({ currentOffice: null });
  };

  /** Preview in dashboard */
  handlePreview = () => {
    // TODO: Preview office
    console.log("preview");
  };

  handleChangeTessiQuery = (e) => {
    this.setState({ tessiQuery: e.target.value });
  };

  handleChatOrSearch = (tessiQuery) => {
    if (/hi/i.test(tessiQuery)) {
      // TODO: goto chat page
    } else if (tessiQuery) {
      this.props.navigate("/search");
    }
  };

  renderDateTime = () => {
    const [time, setTime] = React.useState(new Date());

    useEffect(() => {
      const intervalId = setInterval(() => setTime(new Date()), 1000 * 60);
      return () => clearInterval(intervalId);
    }, []);

    return (
      <Column alignChildrenEnd>
        <Typography fontSizeXS textMediumGrey>
          {[formatDate(time), getWeekday(time)].join(" ")}
        </Typography>
        <Typography fontSizeS textSecondary paddingTopHalf>
          {time.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
          })}
        </Typography>
      </Column>
    );
  };

  /**
   * Renderer function
   */
  render() {
    const { width, classes: s, t } = this.props;
    const {
      offices,
      currentOffice,
      showOfficeFilters,
      currentOfficeFilter,
      tessiQuery,
    } = this.state;
    const { user, userRole } = this.props.auth;
    const profileStatus = getProfileStatus(user, userRole);
    const {
      completed: profileCompleted,
      charged: profileCharged,
      completeness: profileCompleteness,
    } = profileStatus;

    const DateTime = this.renderDateTime;
    const filteredOffices = offices.filter(
      (office) => office.location?.coordinates
    );

    return (
      <Column
        classes={{ box: s.root }}
        fullWidth
        alignChildrenStart
        paddingTopDouble
        paddingBottomDouble
      >
        {/** title */}
        <Row fullWidth style={{ marginBottom: 45 }} alignChildrenStart>
          <Typography fontSizeM textSecondary>
            {t("dashboard")}
          </Typography>
          {isWidthDown("xs", width) ? (
            <React.Fragment>
              <Stretch />
              <div style={{ marginTop: 4 }}>
                <DateTime />
              </div>
            </React.Fragment>
          ) : null}
        </Row>

        {/** show sub title and datetime */}
        <Row fullWidth alignChildrenCenter>
          <BuildingsIcon
            style={{ width: 27, height: 22 }}
            className={s.lightIcon}
          />
          <Typography paddingLeft fontSizeS textMediumGrey>
            {t("welcomeToCompany")}
          </Typography>

          {!isWidthDown("xs", width) ? (
            <React.Fragment>
              <Stretch />
              <DateTime />
            </React.Fragment>
          ) : null}
        </Row>

        {/** show search box */}
        <Box paddingTopDouble />
        <Row
          classes={{ box: s.searchBoxPanel }}
          fullWidth
          wrap
          justifyChildrenCenter
        >
          <TextField
            fullWidth
            variant='outlined'
            value={tessiQuery}
            onChange={this.handleChangeTessiQuery}
            placeholder={t("sayHiOrSearch")}
            className={s.searchInputBox}
            classes={{ root: clsx(s.searchInput) }}
            styles={{
              input: clsx(
                s.searchInputProps,
                tessiQuery && s.limitedSearchInputProps
              ),
            }}
            endAdornment={
              <Button
                variant='icon'
                background='primary'
                style={{ margin: 0 }}
                className={clsx(
                  s.inputButtonIcon,
                  s.searchInputIcon,
                  tessiQuery && s.landingButton
                )}
                shadow
                onClick={() => this.handleChatOrSearch(tessiQuery)}
              >
                {!tessiQuery ? (
                  <ArrowRightAltIcon
                    style={{
                      color: "white",
                      width: 18,
                      height: 18,
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
                    <Typography paddingLeft>{t("chatWithTessi")}</Typography>
                  </Typography>
                ) : (
                  <Typography
                    fontSizeS
                    fontWeightBold
                    textWhite
                    alignChildrenCenter
                  >
                    <SearchIcon />
                    <Typography paddingLeft>{t("advancedSearch")}</Typography>
                  </Typography>
                )}
              </Button>
            }
          />
        </Row>

        {/** show profile */}
        <Box paddingTopDouble />
        <Row classes={{ box: s.profilePanel }} fullWidth wrap>
          {/* user avatar */}
          <Box
            alignChildrenCenter
            justifyChildrenCenter
            style={{
              borderRadius: userRole === "company" ? 8 : "50%",
              backgroundImage: user.avatar
                ? `url("${user.avatar.bucketPath}")`
                : "none",
              backgroundSize: "cover",
              backgroundPosition: "center",
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
          </Box>

          {/* user name and last login datetime */}
          <Column
            classes={{ box: s.accountName }}
            justifyChildrenCenter
            alignChildrenStart
          >
            <Typography fontSizeS textSecondary>
              {user.generalInfo?.username || "Unknown"}
            </Typography>
            <Typography fontSizeXS textMediumGrey paddingTopHalf>
              {t("lastLogin", {
                datetime: [
                  formatDate(user.updatedAt),
                  new Date(user.updatedAt).toLocaleTimeString(),
                ].join(" "),
              })}
            </Typography>
          </Column>

          {/* profile completeness */}
          <Stretch />
          <Column style={{ minHeight: 60, width: 228 }}>
            <Column classes={{ box: s.previewWrapper }}>
              <Button
                link='primary'
                background='normalLight'
                inverse
                onClick={this.handlePreview}
              >
                <LaunchIcon style={{ width: 16, height: 16 }} />
                <Typography paddingLeft fontSizeS>
                  {t("preview")}
                </Typography>
              </Button>
            </Column>
            <Column classes={{ box: s.profileCompletenessWrapper }}>
              <LinearProgress
                value={profileCompleted}
                valueBuffer={profileCharged}
                styles={{
                  root: s.profileProgress,
                }}
              />
              <Link to='#' onClick={this.navigate("profile")}>
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
          </Column>
        </Row>

        {/** show google map with offices in it */}
        <Row classes={{ box: s.officesMapWrapper }}>
          <ConditionalWrapper
            condition={isWidthDown("sm", width)}
            wrapper={(children) => (
              <TabWrapper
                open
                insideOpen
                title={t("map")}
                bodyClass={s.tabWrapper}
              >
                {children}
              </TabWrapper>
            )}
          >
            <Row classes={{ box: s.officesMap }}>
              <Column stretch fullHeight noOverflow relative>
                <GoogleMap
                  coordinates={
                    filteredOffices && filteredOffices.length
                      ? filteredOffices.map(
                        (office) => office.location?.coordinates
                      )
                      : []
                  }
                  center={
                    filteredOffices &&
                    filteredOffices.length &&
                    filteredOffices[filteredOffices.length - 1]?.location
                      ?.coordinates
                  }
                  markers={
                    filteredOffices &&
                    filteredOffices.length &&
                    filteredOffices.map((office, index) => (
                      <GoogleMapMarker
                        key={index}
                        size={30}
                        lat={office.location.coordinates.lat}
                        lng={office.location.coordinates.lng}
                        color={
                          currentOffice === office ? "mainColor" : undefined
                        }
                        badge={
                          office.leasedBy && {
                            title: office.leasedBy.overduePayment,
                            color: "error",
                          }
                        }
                      />
                    ))
                  }
                />

                {currentOffice && (
                  <Button
                    variant='icon'
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
              {(!isWidthDown("xs", width) || !currentOffice) && (
                <Row
                  classes={{ box: s.officeFilterWrapper }}
                  alignChildrenStart
                >
                  {showOfficeFilters && (
                    <Column classes={{ box: s.officeFilters }}>
                      {Object.entries(this.officeFilters).map(
                        ([key, filter]) => (
                          <React.Fragment key={key}>
                            <Box paddingBottomHalf>
                              <Checkbox
                                variant='outlined'
                                isChecked={key === currentOfficeFilter}
                                label={`${t(filter.name)} (${
                                  filter.value ? filter.value.length : 0
                                })`}
                                onChange={this.handleSelectOfficeFilter(key)}
                                className={s.officeFilter}
                              />
                            </Box>
                          </React.Fragment>
                        )
                      )}
                    </Column>
                  )}

                  <Button
                    variant='icon'
                    className={s.toggleFilterButton}
                    onClick={this.handleToggleOfficeFilter}
                  >
                    {showOfficeFilters ? (
                      <ArrowBackIos
                        style={{ width: 18, height: 18, marginLeft: 6 }}
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
              )}

              {/* TODO: Show office detail info once clicked in company dashboard */}
              {/* show office detail info */}
              {/* {currentOffice && (
                <Column classes={{ box: s.officeDetailWrapper }}>
                  <Box classes={{ box: s.officeDetail }}>
                    <OfficeDetailItem office={currentOffice} />
                  </Box>
                  <Stretch />
                  <Box
                    classes={{ box: s.officeFullView }}
                    onClick={this.handleNavigateOfficeDetail(currentOffice, t)}
                    fullWidth
                    justifyChildrenCenter
                  >
                    <Typography fontSizeXS textWhite>
                      {t("fullView")}
                    </Typography>
                  </Box>
                </Column>
              )} */}
            </Row>
          </ConditionalWrapper>
        </Row>

        {/** show statistics */}
        <Row classes={{ box: s.statisticBoxWrapper }} wrap fullWidth>
          <ConditionalWrapper
            condition={isWidthDown("sm", width)}
            wrapper={(children) => (
              <TabWrapper
                open
                insideOpen
                title={t("stat")}
                bodyClass={s.tabWrapper}
              >
                <CarouselWrapper itemWidth={200} itemOffset={0}>
                  {children}
                </CarouselWrapper>
              </TabWrapper>
            )}
          >
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
                  <CalendarIcon
                    className={s.lightIcon}
                    style={{ width: 16, height: 15 }}
                  />
                }
                title={t("calendarEvents")}
                statistics={[{ value: 4, variant: "primary" }]}
              />
            </Box>
            <Box classes={{ box: s.statisticBox }}>
              <StatisticIconBox
                icon={
                  <StarOutlineIcon
                    className={s.lightIcon}
                    style={{ width: 17, height: 19 }}
                  />
                }
                title={t("reviews")}
                statistics={[{ value: 1, variant: "primary" }]}
              />
            </Box>
          </ConditionalWrapper>
        </Row>
      </Column>
    );
  }
}

export default withWidth()(
  withRouter(withStyles(styleSheet)(withTranslation("common")(Dashboard)))
);
