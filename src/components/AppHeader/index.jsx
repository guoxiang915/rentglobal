import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { withTranslation } from "react-i18next";
import PropTypes from "prop-types";
import clsx from "clsx";
import withWidth, { isWidthDown } from "@material-ui/core/withWidth";
import {
  MenuItem,
  Grid,
  Menu,
  Popover,
  LinearProgress,
  Paper
} from "@material-ui/core";
import {
  Button,
  Link,
  Row,
  Column,
  Box,
  Stretch,
  Typography,
  Divider,
  HomeIcon,
  UsersIcon,
  PowerIcon,
  ArrowRightAltIcon,
  EmailIcon,
  AlarmIcon,
  UserIcon,
  CloseIcon,
  MenuIcon,
  ArrowDownIcon,
  DashboardIcon,
  ImageIcon
} from "../../common/base-components";

import "./style.css";
import Logo from "../../assets/logo.svg";
import MiniLogo from "../../assets/mini-logo.svg";

const styleSheet = theme => ({
  root: {
    flexGrow: 1,
    // marginTop: 70,
    height: "100%",
    background: "rgba(255, 255, 255, .8)",
    backdropFilter: "blur(10px)",
    boxShadow: "0px 10px 10px #0000000D",
    [theme.breakpoints.down("sm")]: {
      boxShadow: "0px 10px 10px #0000001A"
    }
  },

  loggedIn: {
    boxShadow: "0px 14px 14px #15151514",
    [theme.breakpoints.down("sm")]: {
      boxShadow: "0px 14px 14px #15151514"
    }
  },

  headerWrapper: {
    height: "100%",
    paddingLeft: theme.spacing(4) - 2,
    paddingRight: theme.spacing(4) - 2,
    [theme.breakpoints.down("sm")]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2)
    }
  },

  logoWrapper: {
    display: "flex",
    marginRight: theme.spacing(2),
    height: 38
  },

  logoNavigator: {
    width: "fit-content",
    cursor: "pointer"
  },

  logo: {
    height: "100%"
  },

  grayButton: {
    padding: theme.spacing()
  },

  headerMenu: {
    zIndex: 1500,
    minWidth: 200,
    position: "relative",
    top: 30
  },

  stickyBar: {
    width: "100%",
    height: 4,
    background: `linear-gradient(97deg, ${theme.colors.primary.mainColor} 0%, ${theme.colors.primary.darkColor} 100%)`
  },

  accountInfoWrapper: {
    background: "transparent",
    boxShadow: "none",
    overflow: "visible"
  },

  accountInfoContentWrapper: {
    position: "relative",
    top: 15,
    boxShadow: "0px 2px 4px #00000014",
    border: `1px solid ${theme.colors.primary.borderGrey}`,
    [theme.breakpoints.down("sm")]: {
      right: -29
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
      transform: "rotate(45deg)"
    }
  },

  accountInfoContent: {
    paddingTop: 30,
    paddingBottom: 6,
    paddingLeft: 18,
    paddingRight: 14
  },

  accountAvatar: {
    width: 80,
    height: 80
  },

  profileProgress: {
    width: "100%",
    background: theme.colors.primary.borderGrey
  },

  bar2Buffer: {
    color: theme.colors.primary.errorRed,
    background: theme.colors.primary.errorRed
  },

  dashedBuffer: {
    background: "none"
  },

  attentionIcon: {
    marginLeft: 25,
    width: 11,
    height: 8
  },

  menuIcon: {
    marginRight: 25
  },

  accountNavItem: {
    paddingTop: 12,
    paddingBottom: 12
  },

  smallIcon: {
    width: 16,
    height: 16
  },

  accountNavIcon: {
    marginRight: 25,
    color: theme.colors.primary.borderGrey,
    opacity: 1
  },

  errorRedIcon: {
    color: theme.colors.primary.errorRed,
    opacity: 1
  },

  arrowDownIcon: {
    width: 12,
    height: 7
  },

  divider: {
    left: -18,
    right: -14,
    position: "relative",
    width: "calc(100% + 32px)"
  }
});

class AppHeader extends Component {
  static propTypes = {
    auth: PropTypes.object,
    role: PropTypes.oneOf(["landlord", "company", ""]).isRequired,
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
    t: PropTypes.func.isRequired
  };

  state = {
    locationEl: null,
    languageEl: null,
    accountInfoEl: null
  };

  navigate = path => {
    if (path === "switchRole") {
      this.props.onToggleRole(
        this.props.role === "landlord" ? "company" : "landlord"
      );
    } else {
      this.props.navigate(path, this.props.role);
    }
  };

  handleNavigate = path => () => {
    this.navigate(path);
  };

  handleMenu = el => event => {
    const newState = {};
    newState[el] = event.currentTarget;
    this.setState(newState);
  };

  handleCloseMenu = el => () => {
    const newState = {};
    newState[el] = null;
    this.setState(newState);
  };

  handleSelectLocation = location => () => {
    this.props.onSelectLocation(location);
    this.handleCloseMenu("locationEl")();
  };

  handleSelectLanguage = language => () => {
    this.props.onSelectLanguage(language);
    this.handleCloseMenu("languageEl")();
  };

  handleHelp = () => {};

  handleToggleRole = () => {
    this.props.onToggleRole(
      this.props.role === "landlord" ? "company" : "landlord"
    );
  };

  handleToggleSidebar = value => () => {
    this.props.onToggleSidebar(value);
  };

  renderAccountNavItem = ({ onClick, icon, text, errorRed, classes }) => {
    const NavIcon = icon;
    return (
      <Row classes={{ box: classes.accountNavItem }}>
        <Link to="#" onClick={onClick}>
          <Typography fontSizeS textErrorRed={errorRed} alignChildrenCenter>
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

  // Account Info PopOver Component
  renderAccountInfo = ({ role, user, navigate, classes, t }) => {
    const NavItem = this.renderAccountNavItem;
    const profileCompleted = 30;
    const profileCompleteness = 50;

    const handleNavigate = path => () => navigate(path);

    return (
      <Column alignChildrenStart classes={{ box: classes.accountInfoContent }}>
        {/* user avatar */}
        <Row justifyChildrenCenter fullWidth>
          <Box
            alignChildrenCenter
            justifyChildrenCenter
            style={{ borderRadius: role === "landlord" ? 8 : "50%" }}
            border
            classes={{
              box: clsx(classes.accountAvatar)
            }}
          >
            {user.profile_image ? (
              <img src={user.profile_image} alt={user.username} />
            ) : role === "landlord" ? (
              <ImageIcon className={classes.smallIcon} variant="normal" />
            ) : (
              <UserIcon className={classes.smallIcon} variant="normal" />
            )}
          </Box>
        </Row>

        {/* username */}
        <Row paddingTop fullWidth justifyChildrenCenter>
          <Typography fontSizeS textSecondary>
            {user.username}
          </Typography>
        </Row>

        {/* profile completeness linearprogress */}
        <Row paddingTopDouble fullWidth>
          <LinearProgress
            color="primary"
            value={profileCompleted}
            valueBuffer={profileCompleteness}
            variant="buffer"
            classes={{
              root: classes.profileProgress,
              bar2Buffer: classes.bar2Buffer,
              dashed: classes.dashedBuffer
            }}
          />
        </Row>

        {/* profile completeness text */}
        <Row paddingTopHalf fullWidth>
          <Typography fontSizeXS textErrorRed>
            {profileCompleted < 100
              ? t("profileNeedAttention")
              : t("profileCompleted")}
          </Typography>
          <Stretch />
          <Link to="#" onClick={handleNavigate("profile")}>
            <Typography fontSizeS textErrorRed>
              <ArrowRightAltIcon
                className={classes.attentionIcon}
                variant={profileCompleted < 100 ? "errorRed" : "normal"}
              />
            </Typography>
          </Link>
        </Row>

        {/* links */}
        <Box paddingTopDouble />
        <NavItem
          onClick={handleNavigate("home")}
          icon={HomeIcon}
          text={t("home")}
          classes={classes}
        />
        <NavItem
          onClick={handleNavigate("dashboard")}
          icon={DashboardIcon}
          text={t("dashboard")}
          classes={classes}
        />
        <Box padding2 />
        <Divider className={classes.divider} />
        <NavItem
          onClick={handleNavigate("switchRole")}
          icon={UsersIcon}
          text={role === "company" ? t("landlordPanel") : t("companyPanel")}
          classes={classes}
        />
        <Divider className={classes.divider} />
        <Box padding2 />
        <NavItem
          onClick={handleNavigate("logout")}
          icon={PowerIcon}
          text={t("signOut")}
          classes={classes}
          errorRed
        />
      </Column>
    );
  };

  render() {
    const {
      role,
      sidebarOpened,
      location,
      language,
      width,
      classes,
      t
    } = this.props;
    const { isLoggedIn, user } = this.props.auth;
    const { locationEl, languageEl, accountInfoEl } = this.state;

    const AccountInfo = this.renderAccountInfo;

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
                      <MenuItem onClick={this.handleSelectLanguage("English")}>
                        {t("english")}
                      </MenuItem>
                      <MenuItem onClick={this.handleSelectLanguage("French")}>
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
                        Montreal
                      </MenuItem>
                      <MenuItem onClick={this.handleSelectLocation("Toronto")}>
                        Toronto
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
                          onClick={this.handleToggleRole}
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
                      <EmailIcon className={classes.smallIcon} />
                    </Button>
                  </Column>

                  {/* notifications */}
                  <Column paddingLeft>
                    <Button variant="icon">
                      <AlarmIcon className={classes.smallIcon} />
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
                      <UserIcon className={classes.smallIcon} />
                    </Button>

                    {/* account info panel */}
                    <Popover
                      id="accountinfo-popover"
                      open={Boolean(accountInfoEl)}
                      anchorEl={accountInfoEl}
                      onClose={this.handleCloseMenu("accountInfoEl")}
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "right"
                      }}
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "right"
                      }}
                      classes={{ paper: classes.accountInfoWrapper }}
                    >
                      <Paper className={classes.accountInfoContentWrapper}>
                        <AccountInfo
                          role={role}
                          user={user}
                          navigate={path => {
                            this.handleCloseMenu("accountInfoEl")();
                            this.navigate(path);
                          }}
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
                            this.props.navigate("register", "landlord")
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
      </div>
    );
  }
}

export default withWidth()(
  withStyles(styleSheet)(withTranslation("common")(AppHeader))
);
