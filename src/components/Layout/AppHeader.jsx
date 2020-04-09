import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { withTranslation } from "react-i18next";
import PropTypes from "prop-types";
import clsx from "clsx";
import withWidth, { isWidthDown } from "@material-ui/core/withWidth";
import { withRouter } from "react-router-dom";
import { MenuItem, Grid, Menu, Popover, Paper, Badge } from "@material-ui/core";
import {
  Button,
  Link,
  Row,
  Column,
  Box,
  Stretch,
  Typography,
  Divider,
  LinearProgress,
  HomeIcon,
  UsersIcon,
  BuildingsIcon,
  PowerIcon,
  ArrowRightAltIcon,
  EmailIcon,
  AlarmIcon,
  UserIcon,
  CloseIcon,
  MenuIcon,
  ArrowDownIcon,
  DashboardIcon,
  ImageIcon,
} from "../../common/base-components";
import { getProfileStatus } from "../../utils/validators";

import "./style.css";
import Logo from "../../assets/logo.svg";
import MiniLogo from "../../assets/mini-logo.svg";

const styleSheet = (theme) => ({
  root: {
    flexGrow: 1,
    // marginTop: 70,
    height: "100%",
    background: "rgba(255, 255, 255, .8)",
    backdropFilter: "blur(10px)",
    boxShadow: "0px 10px 10px #0000000D",
    [theme.breakpoints.down("sm")]: {
      boxShadow: "0px 10px 10px #0000001A",
    },
  },

  loggedIn: {
    boxShadow: "0px 14px 14px #15151514",
    [theme.breakpoints.down("sm")]: {
      boxShadow: "0px 14px 14px #15151514",
    },
  },

  headerWrapper: {
    height: "100%",
    paddingLeft: theme.spacing(4) - 2,
    paddingRight: theme.spacing(4) - 2,
    [theme.breakpoints.down("sm")]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
  },

  logoWrapper: {
    display: "flex",
    marginRight: theme.spacing(2),
    height: 38,
  },

  logoNavigator: {
    width: "fit-content",
    cursor: "pointer",
  },

  logo: {
    height: "100%",
  },

  grayButton: {
    padding: theme.spacing(),
  },

  headerMenu: {
    zIndex: 1500,
    minWidth: 200,
    position: "relative",
    top: 30,
  },

  stickyBar: {
    width: "100%",
    height: 4,
    background: `linear-gradient(97deg, ${theme.colors.primary.mainColor} 0%, ${theme.colors.primary.darkColor} 100%)`,
  },

  accountInfoWrapper: {
    background: "transparent",
    boxShadow: "none",
    overflow: "visible",
  },

  accountInfoContentWrapper: {
    position: "relative",
    top: 15,
    boxShadow: "0px 2px 4px #00000014",
    border: `1px solid ${theme.colors.primary.borderGrey}`,
    [theme.breakpoints.down("sm")]: {
      right: -29,
    },
    "&::before": {
      position: "absolute",
      top: -8,
      right: 36,
      content: '" "',
      width: 16,
      height: 16,
      background: theme.colors.primary.white,
      border: `1px solid ${theme.colors.primary.borderGrey}`,
      borderBottom: "none",
      borderRight: "none",
      transform: "rotate(45deg)",
    },
  },

  accountInfoContent: {
    paddingTop: 30,
  },

  profileCompletenessWrapper: {
    background: theme.colors.primary.whiteGrey,
  },

  accountBlockWrapper: {
    width: "100%",
    padding: 14,
    paddingLeft: 18,
  },

  accountAvatar: {
    width: 80,
    height: 80,
  },

  profileProgress: {
    marginBottom: 10,
  },

  attentionIcon: {
    marginLeft: 25,
    width: 11,
    height: 8,
  },

  menuIcon: {
    marginRight: 25,
  },

  accountNavItem: {
    paddingTop: 12,
    paddingBottom: 12,
  },

  smallIcon: {
    width: 16,
    height: 16,
  },

  accountNavIcon: {
    marginRight: 25,
    color: theme.colors.primary.borderGrey,
    opacity: 1,
  },

  errorRedIcon: {
    color: theme.colors.primary.errorRed,
    opacity: 1,
  },

  arrowDownIcon: {
    width: 12,
    height: 7,
  },

  divider: {
    left: -18,
    right: -14,
    position: "relative",
    width: "calc(100% + 32px)",
  },
});

class AppHeader extends Component {
  static propTypes = {
    auth: PropTypes.object,
    sidebarOpened: PropTypes.bool,
    location: PropTypes.string,
    language: PropTypes.string,

    onToggleRole: PropTypes.func,
    onToggleSidebar: PropTypes.func,
    onSelectLocation: PropTypes.func,
    onSelectLanguage: PropTypes.func,
    navigate: PropTypes.func,

    width: PropTypes.string.isRequired,
    classes: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired,
  };

  state = {
    locationEl: null,
    languageEl: null,
    accountInfoEl: null,
    dialog: null,
  };

  handleNavigate = (path) => () => {
    this.props.navigate(path);
  };

  handleMenu = (el) => (event) => {
    const newState = {};
    newState[el] = event.currentTarget;
    this.setState(newState);
  };

  handleCloseMenu = (el) => () => {
    const newState = {};
    newState[el] = null;
    this.setState(newState);
  };

  handleSelectLocation = (location) => () => {
    this.props.onSelectLocation(location);
    this.handleCloseMenu("locationEl")();
  };

  handleSelectLanguage = (language) => () => {
    this.props.onSelectLanguage(language);
    this.handleCloseMenu("languageEl")();
  };

  handleHelp = () => {
    this.props.navigate("help");
  };

  handleCloseDialog = () => {
    this.setState({ dialog: null });
  };

  handleToggleSidebar = (value) => () => {
    this.props.onToggleSidebar(value);
  };

  /** Navigate from Account Info panel */
  handleAccountInfoNavigate = (path) => () => {
    this.handleCloseMenu("accountInfoEl")();
    this.props.navigate(path);
  };

  /** Toggle role when user selects another role in Account Info panel */
  handleAccountInfoToggleRole = (role) => () => {
    this.handleCloseMenu("accountInfoEl")();
    // console.log(this.props.auth.user.role);
    // const userRole = this.props.auth.user.role;
    // if (role !== userRole) {
    //   this.props.onToggleRole();
    // }
    this.props.onToggleRole(role);
  };

  /**
   * Render Account Navigation Item
   * @typedef Props
   * @property  {function}  onClick
   * @property  {component} icon
   * @property  {string}    text
   * @property  {boolean}   errorRed
   * @property  {object}    classes
   */
  renderAccountNavItem = ({
    onClick,
    icon,
    text,
    errorRed,
    active,
    classes,
  }) => {
    const NavIcon = icon;
    return (
      <Row classes={{ box: classes.accountNavItem }}>
        <Link to="#" onClick={onClick}>
          <Typography
            fontSizeS
            textErrorRed={errorRed}
            textPrimary={active}
            alignChildrenCenter
          >
            <Box>
              <NavIcon
                className={clsx(
                  classes.smallIcon,
                  classes.accountNavIcon,
                  errorRed && classes.errorRedIcon
                )}
              />
            </Box>
            {text}
          </Typography>
        </Link>
      </Row>
    );
  };

  /**
   * Render Account Info Form
   * @typedef Props
   * @property  {string}    role
   * @property  {object}    user
   * @property  {object}    profileProgress
   * @property  {function}  navigate
   * @property  {function}  onToggleRole
   * @property  {object}    classes
   * @property  {function}  t
   */
  renderAccountInfo = ({
    role,
    user,
    profileProgress,
    navigate,
    onToggleRole,
    location,
    classes: s,
    t,
  }) => {
    const NavItem = this.renderAccountNavItem;
    const {
      profileCompleted,
      profileCharged,
      profileCompleteness,
    } = profileProgress;
    const profile = user[`${role}Profile`];

    console.log(role, user.roles);

    return (
      <Column alignChildrenStart classes={{ box: s.accountInfoContent }}>
        {/* user avatar */}
        <Row justifyChildrenCenter fullWidth>
          <Box
            alignChildrenCenter
            justifyChildrenCenter
            style={{
              borderRadius: role === "landlord" ? 8 : "50%",
              backgroundImage: user.avatar
                ? `url("${user.avatar.bucketPath}")`
                : "none",
              backgroundSize: "contain",
              backgroundPosition: "center",
            }}
            border
            classes={{
              box: clsx(s.accountAvatar),
            }}
          >
            {!user.avatar &&
              (role === "landlord" ? (
                <ImageIcon className={s.smallIcon} variant="normal" />
              ) : (
                <UserIcon className={s.smallIcon} variant="normal" />
              ))}
          </Box>
        </Row>

        {/* username */}
        <Row
          paddingTop
          classes={{ box: s.accountBlockWrapper }}
          justifyChildrenCenter
        >
          <Typography fontSizeS textSecondary>
            {profile ? profile.username : "Unknown"}
          </Typography>
        </Row>

        {/* profile completeness */}
        <Row classes={{ box: s.profileCompletenessWrapper }} fullWidth>
          <Column classes={{ box: s.accountBlockWrapper }}>
            <LinearProgress
              value={profileCompleted}
              valueBuffer={profileCharged}
              styles={{
                root: s.profileProgress,
              }}
            />
            <Link to="#" onClick={navigate("profile")}>
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

        {/* links */}
        <Row fullWidth>
          <Column classes={{ box: s.accountBlockWrapper }} alignChildrenStart>
            {location.pathname !== "/" && (
              <NavItem
                onClick={navigate("home")}
                icon={HomeIcon}
                text={t("home")}
                classes={s}
              />
            )}
            {location.pathname !== `/${role}/dashboard/` && (
              <NavItem
                onClick={navigate("dashboard")}
                icon={DashboardIcon}
                text={t("dashboard")}
                classes={s}
              />
            )}
            <Box padding2 />
            <Divider className={s.divider} />
            {user.roles.map((r, index) => (
              <React.Fragment key={index}>
                <NavItem
                  onClick={onToggleRole(r)}
                  icon={r === "company" ? UsersIcon : BuildingsIcon}
                  text={
                    r === "company" ? t("companyPanel") : t("landlordPanel")
                  }
                  active={role === r}
                  classes={s}
                />
              </React.Fragment>
            ))}
            <Divider className={s.divider} />
            <Box padding2 />
            <NavItem
              onClick={navigate("logout")}
              icon={PowerIcon}
              text={t("signOut")}
              classes={s}
              errorRed
            />
          </Column>
        </Row>
      </Column>
    );
  };

  /** Renderer function */
  render() {
    const {
      sidebarOpened,
      location,
      language,
      notifications,
      mails,
      width,
      classes,
      t,
    } = this.props;
    const { isLoggedIn, user } = this.props.auth;
    const { locationEl, languageEl, accountInfoEl, dialog } = this.state;
    const role = isLoggedIn ? user.role : "";

    const AccountInfo = withRouter(this.renderAccountInfo);

    // calculate profile completeness
    let profileCompleted = 0;
    let profileCharged = 10;
    let profileCompleteness = null;
    if (isLoggedIn) {
      const profileStatus = getProfileStatus(user, role);
      profileCompleted = profileStatus.completed;
      profileCharged = profileStatus.charged;
      profileCompleteness = profileStatus.completeness;
    }

    return (
      <div className={clsx(classes.root, isLoggedIn && classes.loggedIn)}>
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
          className={classes.headerWrapper}
        >
          {/* logo, language, location settings wrapper */}
          <Grid item>
            <div className={classes.logoWrapper}>
              {/* logo image */}
              <div
                onClick={this.handleNavigate("home")}
                className={classes.logoNavigator}
              >
                {isLoggedIn ? (
                  <>
                    {!isWidthDown("sm", width) ? (
                      <img src={Logo} className={classes.logo} alt="RENTGLOBAL" />
                    ) : (
                      <img src={MiniLogo} className={classes.logo} alt="RENTGLOBAL" />
                    )}
                  </>
                ) : (
                  <img src={Logo} className={classes.logo} alt="RENTGLOBAL" />
                )}
              </div>

              {/* language, location, help menu */}
              {!isLoggedIn && !isWidthDown("sm", width) && (
                <Box paddingLeftDouble>
                  <Column>
                    <Button
                      aria-controls="language-menu"
                      aria-haspopup="true"
                      onClick={this.handleMenu("languageEl")}
                      color="secondary"
                      transparent
                      className={classes.grayButton}
                    >
                      <Typography
                        fontSizeS
                        fontWeightMedium
                        alignChildrenCenter
                      >
                        {t(language)}&nbsp;&nbsp;
                        <ArrowDownIcon className={classes.arrowDownIcon} />
                      </Typography>
                    </Button>
                    <Menu
                      id="language-menu"
                      anchorEl={languageEl}
                      keepMounted
                      open={Boolean(languageEl)}
                      onClose={this.handleCloseMenu("languageEl")}
                      className={classes.headerMenu}
                    >
                      <MenuItem onClick={this.handleSelectLanguage("en")}>
                        {t("english")}
                      </MenuItem>
                      <MenuItem onClick={this.handleSelectLanguage("fr")}>
                        {t("french")}
                      </MenuItem>
                    </Menu>
                  </Column>
                  <Column>
                    <Button
                      aria-controls="location-menu"
                      aria-haspopup="true"
                      onClick={this.handleMenu("locationEl")}
                      color="secondary"
                      transparent
                      className={classes.grayButton}
                    >
                      <Typography
                        fontSizeS
                        fontWeightMedium
                        alignChildrenCenter
                      >
                        {location}&nbsp;&nbsp;
                        <ArrowDownIcon className={classes.arrowDownIcon} />
                      </Typography>
                    </Button>
                    <Menu
                      id="location-menu"
                      anchorEl={locationEl}
                      keepMounted
                      open={Boolean(locationEl)}
                      onClose={this.handleCloseMenu("locationEl")}
                      className={classes.headerMenu}
                    >
                      <MenuItem onClick={this.handleSelectLocation("Montreal")}>
                        {t("montreal")}
                      </MenuItem>
                      <MenuItem onClick={this.handleSelectLocation("Toronto")}>
                        {t("toronto")}
                      </MenuItem>
                    </Menu>
                  </Column>
                  <Column>
                    <Button
                      onClick={this.handleHelp}
                      color="secondary"
                      transparent
                      className={classes.grayButton}
                    >
                      <Typography fontSizeS fontWeightMedium>
                        {t("help")}
                      </Typography>
                    </Button>
                  </Column>
                </Box>
              )}
            </div>
          </Grid>

          {/* menu options */}
          <Grid item>
            <Row>
              {isLoggedIn ? (
                <>
                  {!isWidthDown("sm", width) && (
                    <>
                      {/* chat with TESSI */}
                      <Column paddingLeftDouble>
                        <Typography fontSizeS fontWeightBold>
                          <Link variant="primary" to="/">
                            {t("chatWithTessi")}
                          </Link>
                        </Typography>
                      </Column>

                      {/* role switcher */}
                      <Column paddingLeftDouble>
                        <Button
                          variant="secondary"
                          shadow
                          onClick={() =>
                            this.props.onToggleRole(
                              role === "landlord" ? "company" : "landlord"
                            )
                          }
                        >
                          <Typography fontSizeS fontWeightBold>
                            {t(
                              role === "landlord" ? "needOffice" : "placeToRent"
                            )}
                          </Typography>
                        </Button>
                      </Column>
                    </>
                  )}

                  {/* mails */}
                  <Column paddingLeftDouble>
                    <Button variant="icon">
                      <Badge
                        color="primary"
                        badgeContent={
                          mails &&
                          (mails.length > 3 ? `${mails.length}+` : mails.length)
                        }
                      >
                        <EmailIcon className={classes.smallIcon} />
                      </Badge>
                    </Button>
                  </Column>

                  {/* notifications */}
                  <Column paddingLeft>
                    <Button variant="icon">
                      <Badge
                        color="primary"
                        badgeContent={
                          notifications &&
                          (notifications.length > 9
                            ? `${notifications.length}+`
                            : notifications.length)
                        }
                      >
                        <AlarmIcon className={classes.smallIcon} />
                      </Badge>
                    </Button>
                  </Column>

                  {/* account info */}
                  <Column paddingLeft>
                    {/* account avatar & icon */}
                    <Button
                      variant="icon"
                      aria-describedby="accountinfo-popover"
                      onClick={this.handleMenu("accountInfoEl")}
                    >
                      {!isWidthDown("sm", width) && (
                        <Typography paddingRight>
                          <ArrowDownIcon className={classes.arrowDownIcon} />
                        </Typography>
                      )}
                      <Badge
                        color="error"
                        badgeContent="!"
                        invisible={
                          profileCompleteness !== "profileNeedAttention"
                        }
                      >
                        <UserIcon className={classes.smallIcon} />
                      </Badge>
                    </Button>

                    {/* account info panel */}
                    <Popover
                      id="accountinfo-popover"
                      open={Boolean(accountInfoEl)}
                      anchorEl={accountInfoEl}
                      onClose={this.handleCloseMenu("accountInfoEl")}
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "right",
                      }}
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      classes={{ paper: classes.accountInfoWrapper }}
                    >
                      <Paper className={classes.accountInfoContentWrapper}>
                        <AccountInfo
                          role={role}
                          user={user}
                          profileProgress={{
                            profileCompleteness,
                            profileCompleted,
                            profileCharged,
                          }}
                          navigate={this.handleAccountInfoNavigate}
                          onToggleRole={this.handleAccountInfoToggleRole}
                          classes={classes}
                          t={t}
                        />
                      </Paper>
                    </Popover>
                  </Column>
                </>
              ) : (
                !isWidthDown("sm", width) && (
                  <>
                    <Column>
                      <Typography fontSizeS>
                        <Link variant="body2" to="/">
                          {t("home")}
                        </Link>
                      </Typography>
                    </Column>
                    <Column paddingLeftDouble>
                      <Typography fontSizeS fontWeightBold>
                        <Link variant="primary" to="/">
                          {t("chatWithTessi")}
                        </Link>
                      </Typography>
                    </Column>
                    <Column paddingLeftDouble>
                      <Typography fontSizeS>
                        <Link variant="body2" to="/auth/login">
                          {t("login")}
                        </Link>
                      </Typography>
                    </Column>
                    <Column paddingLeftDouble>
                      <Typography fontSizeS>
                        <Link variant="body2" to="/auth/register">
                          {t("register")}
                        </Link>
                      </Typography>
                    </Column>
                    {!isWidthDown("md", width) && (
                      <Column paddingLeftDouble>
                        <Button
                          variant="secondary"
                          shadow
                          onClick={() =>
                            this.props.navigate("register/landlord")
                          }
                        >
                          <Typography fontSizeS fontWeightBold>
                            {t("placeToRent")}
                          </Typography>
                        </Button>
                      </Column>
                    )}
                  </>
                )
              )}
              {isWidthDown("sm", width) && (
                <Column paddingLeft>
                  {sidebarOpened ? (
                    <Button
                      variant="icon"
                      link="white"
                      background="primary"
                      outline="primary"
                      onClick={this.handleToggleSidebar(!sidebarOpened)}
                      shadow
                    >
                      <CloseIcon className={classes.smallIcon} />
                    </Button>
                  ) : (
                    <Button
                      variant="icon"
                      link="primary"
                      background="normalLight"
                      outline="primary"
                      inverse
                      onClick={this.handleToggleSidebar(!sidebarOpened)}
                      shadow
                    >
                      <MenuIcon className={classes.smallIcon} />
                    </Button>
                  )}
                </Column>
              )}
            </Row>
          </Grid>
        </Grid>

        {/* thin bar at the bottom of header */}
        {isLoggedIn && <div className={classes.stickyBar}></div>}

        {/** dialog */}
        {dialog}
      </div>
    );
  }
}

export default withWidth()(
  withStyles(styleSheet)(withTranslation("common")(AppHeader))
);
