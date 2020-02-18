import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { withTranslation } from "react-i18next";
import withMuiRoot from "../../withMuiRoot";
import {
  SwipeableDrawer,
  MenuItem,
  Grid,
  Hidden,
  Menu
} from "@material-ui/core";
import {
  Menu as MenuIcon,
  // AccountCircle,
  // Search as SearchIcon,
  // Notifications as NotiFicationIcon,
  // Save as SaveIcon,
  ExpandMore as ExpandMoreIcon
} from "@material-ui/icons";
import {
  Button,
  Link,
  Row,
  Column,
  Box,
  IconButton,
  Typography
} from "../../common/base-components";
import { SideMenu } from "../Layout";
import DrawerUser from "../DrawerUser";
import Auth from "../../utils/auth";
// import { Link as RouterLink } from "react-router-dom";

import "./style.css";
import Logo from "../../assets/logo.svg";
import MiniLogo from "../../assets/mini-logo.svg";

const authObj = new Auth();

const styleSheet = theme => ({
  root: {
    flexGrow: 1,
    // marginTop: 70,
    boxShadow: "0px 34px 34px #00000026",
    height: "100%",
    background: "rgba(255, 255, 255, .8)",
    backdropFilter: "blur(10px)",
    [theme.breakpoints.down("sm")]: {
      boxShadow: "0px 14px 14px #00000026"
    }
  },

  flex: {
    flexGrow: 1
  },

  sideDrawer: {
    width: 300
  },

  list: {
    width: 250
  },

  textField: {
    marginLeft: theme.spacing(),
    marginRight: theme.spacing(),
    border: "0 !important",
    textDecoration: "none !important",
    borderBottom: "none !important",
    display: "block",
    lineHeight: "2.0rem",
    width: "95%",
    padding: 2,
    fontSize: 16
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
    fontSize: "16px",
    padding: theme.spacing()
  },

  shadowButton: {
    boxShadow: "0px 6px 12px #D7DF234D"
  },

  headerMenu: {
    zIndex: 1500,
    minWidth: 200,
    position: "relative",
    top: 30
  },

  menuButton: {
    padding: 5
  },

  stickyBar: {
    width: "100%",
    height: 4,
    background: `linear-gradient(97deg, ${theme.colors.primary.mainColor} 0%, ${theme.colors.primary.darkColor} 100%)`
  }
});

class Appwrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drawerOpen: false,
      routePath: "",
      anchorEl: null,
      locationEl: null,
      languageEl: null
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.handleSaveProfile = this.handleSaveProfile.bind(this);
  }

  componentDidMount() {
    this.setState({
      routePath: this.props.history.location.pathname
    });

    this.props.history.listen(location => {
      // console.log(location.pathname);
      this.setState({
        routePath: location.pathname
      });
    });
  }

  toggleDrawer = open => {
    this.setState({
      drawerOpen: open
    });
  };

  navigate = path => {
    this.setState({
      drawerOpen: false
    });

    switch (path) {
      case "home":
        this.props.history.push("/");
        break;
      case "login":
        this.props.history.push("/auth/login");
        break;
      case "logout":
        authObj.removeToken();
        this.props.mappedlogout();
        this.props.history.push("/auth/login");
        break;
      default:
        this.props.history.push("/");
        break;
    }
  };

  handleMenu = el => event => {
    const newState = {};
    newState[el] = event.currentTarget;
    this.setState(newState);
  };

  handleClose = el => () => {
    const newState = {};
    newState[el] = null;
    this.setState(newState);
  };

  handleSearch = () => {
    this.props.mappedshowSearchBar();
    this.props.history.push("/search");
  };

  goBack = () => {
    this.props.mappedshowAppBar();
    this.props.history.goBack();
  };

  handleSaveProfile = () => {
    this.props.mappedupdateUser(
      this.props.auth.modifiedUserTosave,
      this.props.history
    );
  };

  handleSelectLocation = location => () => {
    this.handleClose("locationEl")();
  };

  handleSelectLanguage = language => () => {
    this.handleClose("languageEl")();
  };

  handleHelp = () => {};

  render() {
    const { classes, t } = this.props;
    const { isLoggedIn, user } = this.props.auth;
    const {
      // anchorEl,
      drawerOpen,
      locationEl,
      languageEl
    } = this.state;

    // const open = Boolean(anchorEl);

    // const homeLinks = (
    //   <div>
    //     <IconButton
    //       aria-owns={open ? "menu-appbar" : null}
    //       aria-haspopup="true"
    //       onClick={this.handleSearch}
    //       color="inherit"
    //     >
    //       <SearchIcon />
    //     </IconButton>
    //     <IconButton
    //       aria-owns={open ? "menu-appbar" : null}
    //       aria-haspopup="true"
    //       onClick={this.handleMenu("anchorEl")}
    //       color="inherit"
    //     >
    //       <NotiFicationIcon />
    //     </IconButton>
    //     <IconButton
    //       aria-owns={open ? "menu-appbar" : null}
    //       aria-haspopup="true"
    //       onClick={this.handleMenu("anchorEl")}
    //       color="inherit"
    //     >
    //       <AccountCircle />
    //     </IconButton>

    //     <Menu
    //       id="menu-appbar"
    //       anchorEl={anchorEl}
    //       anchorOrigin={{
    //         vertical: "top",
    //         horizontal: "right"
    //       }}
    //       transformOrigin={{
    //         vertical: "top",
    //         horizontal: "right"
    //       }}
    //       open={open}
    //       onClose={this.handleClose("anchorEl")}
    //     >
    //       <MenuItem onClick={this.handleClose("anchorEl")}>
    //         <RouterLink to="/edit-profile">Profile</RouterLink>
    //       </MenuItem>
    //       <MenuItem onClick={this.handleClose("anchorEl")}>My account</MenuItem>
    //     </Menu>
    //   </div>
    // );

    // const editProfileLinks = (
    //   <div>
    //     <IconButton
    //       aria-owns={open ? "menu-appbar" : null}
    //       aria-haspopup="true"
    //       onClick={this.handleSaveProfile}
    //       color="inherit"
    //     >
    //       <SaveIcon />
    //     </IconButton>
    //   </div>
    // );

    const location = "Montreal";
    const language = "en";

    return (
      <div className={classes.root}>
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
          className={classes.headerWrapper}
        >
          <Grid item>
            <div className={classes.logoWrapper}>
              <div
                onClick={() => this.navigate("home")}
                className={classes.logoNavigator}
              >
                {isLoggedIn ? (
                  <>
                    <Hidden smDown>
                      <img src={Logo} className={classes.logo} alt="RENTGLOBAL" />
                    </Hidden>
                    <Hidden smUp>
                      <img src={MiniLogo} className={classes.logo} alt="RENTGLOBAL" />
                    </Hidden>
                  </>
                ) : (
                  <img src={Logo} className={classes.logo} alt="RENTGLOBAL" />
                )}
              </div>
              {!isLoggedIn && (
                <Hidden smDown>
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
                        <Typography fontSizeS>
                          {t(language)}
                          <ExpandMoreIcon />
                        </Typography>
                      </Button>
                      <Menu
                        id="language-menu"
                        anchorEl={languageEl}
                        keepMounted
                        open={Boolean(languageEl)}
                        onClose={this.handleClose("languageEl")}
                        className={classes.headerMenu}
                      >
                        <MenuItem
                          onClick={this.handleSelectLanguage("English")}
                        >
                          English
                        </MenuItem>
                        <MenuItem onClick={this.handleSelectLanguage("French")}>
                          French
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
                        <Typography fontSizeS>
                          {location}
                          <ExpandMoreIcon />
                        </Typography>
                      </Button>
                      <Menu
                        id="location-menu"
                        anchorEl={locationEl}
                        keepMounted
                        open={Boolean(locationEl)}
                        onClose={this.handleClose("locationEl")}
                        className={classes.headerMenu}
                      >
                        <MenuItem
                          onClick={this.handleSelectLocation("Montreal")}
                        >
                          Montreal
                        </MenuItem>
                        <MenuItem
                          onClick={this.handleSelectLocation("Toronto")}
                        >
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
                        <Typography fontSizeS>{t("help")}</Typography>
                      </Button>
                    </Column>
                  </Box>
                </Hidden>
              )}
            </div>
          </Grid>
          <Grid item>
            {isLoggedIn ? (
              <Row></Row>
            ) : (
              <Row>
                <Hidden smDown>
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
                      className={classes.shadowButton}
                      onClick={() =>
                        this.props.history.push("/auth/register/landlord")
                      }
                    >
                      <Typography fontSizeS fontWeightBold>{t("placeToRent")}</Typography>
                    </Button>
                  </Column>
                </Hidden>
                <Hidden smUp>
                  <IconButton
                    onClick={() => this.toggleDrawer(true)}
                    className={classes.menuButton}
                    color="inherit"
                    aria-label="Menu"
                    variant="outline"
                  >
                    <MenuIcon />
                  </IconButton>
                  <SwipeableDrawer
                    open={drawerOpen}
                    onClose={() => this.toggleDrawer(false)}
                    onOpen={() => this.toggleDrawer(true)}
                    disableSwipeToOpen={isLoggedIn ? false : true}
                    className={classes.sideDrawer}
                  >
                    <div>
                      {user && <DrawerUser user={user} />}
                      <SideMenu
                        isLoggedIn={isLoggedIn}
                        navigate={this.navigate}
                      />
                    </div>
                  </SwipeableDrawer>
                </Hidden>
              </Row>
            )}
          </Grid>
        </Grid>
        {/* 
        {showSearchBar && !showAppBar && (
          <AppBar position="fixed" style={{ backgroundColor: "white" }}>
            <Toolbar>
              {isLoggedIn && (
                <IconButton onClick={() => this.goBack()} aria-label="Menu">
                  <ArrowBackIcon />
                </IconButton>
              )}
              <input
                type="text"
                placeholder="Search for people"
                className={classes.textField}
              />
            </Toolbar>
          </AppBar>
        )}
       */}
        {isLoggedIn && <div className={classes.stickyBar}></div>}
      </div>
    );
  }
}

export default withMuiRoot(
  withStyles(styleSheet)(withTranslation("common")(Appwrapper))
);
