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
  Icon,
  Popover,
  Avatar,
  LinearProgress
} from "@material-ui/core";
import {
  Menu as MenuIcon,
  ExpandMore as ExpandMoreIcon,
  Close as CloseIcon,
  MailOutline,
  PersonOutline,
  NotificationsOutlined,
  ArrowRightAlt,
  HomeOutlined,
  DashboardOutlined
} from "@material-ui/icons";
import {
  Button,
  Link,
  Row,
  Column,
  Box,
  Stretch,
  Typography
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
    "&::before": {
      border: `10px solid black`
    }
  },

  accountAvatar: {
    width: 80,
    height: 80
  },

  profileProgress: {
    width: "100%"
  },

  profileProgressText: {},

  attentionIcon: {
    marginLeft: 25
  },

  menuIcon: {
    marginRight: 25
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
    this.props.navigate(path, this.props.role);
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

  handleToggleSidebar = value => {
    if (value) {
      this.props.onToggleSidebar(value);
    } else {
      this.props.onToggleSidebar(!this.props.sidebarOpened);
    }
  };

  renderAccountInfo = ({ user, navigate, classes, t }) => (
    <Column
      paddingTopDouble
      paddingBottomDouble
      paddingLeft
      paddingRight
      alignChildrenStart
    >
      <Row justifyChildrenCenter fullWidth>
        <Avatar alt={user.username} className={classes.accountAvatar} />
      </Row>
      <Row paddingTop fullWidth justifyChildrenCenter>
        <Typography fontSizeS textSecondary>
          {user.username}
        </Typography>
      </Row>
      <Row paddingTopDouble fullWidth>
        <LinearProgress
          color="primary"
          value={30}
          valueBuffer={50}
          // value="completed"
          variant="buffer"
          className={classes.profileProgress}
        />
      </Row>
      <Row paddingTopHalf fullWidth>
        <Typography classes={{ box: classes.profileProgressText }} textErrorRed>
          {t("profileNeedAttention")}
        </Typography>
        <Stretch />
        <Link to="#" onClick={() => navigate("profile")}>
          <Typography fontSizeS textErrorRed>
            <ArrowRightAlt className={classes.attentionIcon} />
          </Typography>
        </Link>
      </Row>
      <Row paddingTopDouble>
        <Link to="#" onClick={() => navigate("home")}>
          <Typography fontSizeS>
            <HomeOutlined className={classes.menuIcon} />
            {t("home")}
          </Typography>
        </Link>
      </Row>
      <Row paddingTop>
        <Link to="#" onClick={() => navigate("dashboard")}>
          <Typography fontSizeS>
            <DashboardOutlined className={classes.menuIcon} />
            {t("dashboard")}
          </Typography>
        </Link>
      </Row>
      <Row paddingTop>
        <Link to="#" onClick={() => navigate("logout")}>
          <Typography fontSizeS textErrorRed>
            <Icon className={classes.menuIcon}>power_settings_new</Icon>
            {t("signOut")}
          </Typography>
        </Link>
      </Row>
    </Column>
  );

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
                onClick={() => this.navigate("home")}
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
                      <Typography fontSizeS fontWeightMedium>
                        {t(language)}&nbsp;
                        <ExpandMoreIcon fontSize="small" />
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
                      <Typography fontSizeS fontWeightMedium>
                        {location}&nbsp;
                        <ExpandMoreIcon fontSize="small" />
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
                      <Typography fontSizeS fontWeightMedium>{t("help")}</Typography>
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
                      <MailOutline fontSize="small" />
                    </Button>
                  </Column>

                  {/* notifications */}
                  <Column paddingLeft>
                    <Button variant="icon">
                      <NotificationsOutlined fontSize="small" />
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
                          <Icon fontSize="small">keyboard_arrow_down</Icon>
                        </Typography>
                      )}
                      <PersonOutline fontSize="small" />
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
                      className={classes.accountInfoWrapper}
                    >
                      <AccountInfo
                        user={user}
                        navigate={path => {
                          this.handleCloseMenu("accountInfoEl")();
                          this.navigate(path);
                        }}
                        classes={classes}
                        t={t}
                      />
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
                    <Column paddingLeftDouble>
                      <Button
                        variant="secondary"
                        shadow
                        onClick={() =>
                          this.props.navigate('register", "landlord')
                        }
                      >
                        <Typography fontSizeS fontWeightBold>
                          {t("placeToRent")}
                        </Typography>
                      </Button>
                    </Column>
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
                      onClick={() => this.handleToggleSidebar()}
                      shadow
                    >
                      <CloseIcon fontSize="small" />
                    </Button>
                  ) : (
                    <Button
                      variant="icon"
                      link="primary"
                      background="normalLight"
                      outline="primary"
                      inverse
                      onClick={() => this.handleToggleSidebar()}
                      shadow
                    >
                      <MenuIcon fontSize="small" />
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
