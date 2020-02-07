import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { withTranslation } from "react-i18next";
import withMuiRoot from "../../withMuiRoot";
import {
  AppBar,
  Toolbar,
  Typography,
  SwipeableDrawer,
  MenuItem,
  Grid,
  Hidden,
  Menu
} from "@material-ui/core";
import {
  Menu as MenuIcon,
  AccountCircle,
  Search as SearchIcon,
  Notifications as NotiFicationIcon,
  ArrowBack as ArrowBackIcon,
  Save as SaveIcon,
  ExpandMore as ExpandMoreIcon
} from "@material-ui/icons";
import {
  Button,
  Link,
  Select,
  Box,
  Row,
  Stretch,
  Column,
  IconButton
} from "../../common/base-components";
import { SideMenu } from "../Layout";
import DrawerUser from "../DrawerUser";
import Auth from "../../utils/auth";
import { Link as RouterLink } from "react-router-dom";

import "./style.css";
import Logo from "../../assets/logo.svg";

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

  headerMenu: {
    zIndex: 1500,
    minWidth: 200,
    position: "relative",
    top: 30
  },

  menuButton: {
    padding: 5
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
      console.log(location.pathname);
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
        this.props.history.push("/login");
        break;
      case "logout":
        authObj.removeToken();
        this.props.mappedlogout();
        this.props.history.push("/login");
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

  render() {
    const { classes, t } = this.props;
    const { isLoggedIn, user, isLoading, error } = this.props.auth;
    const {
      anchorEl,
      routePath,
      drawerOpen,
      locationEl,
      languageEl
    } = this.state;
    const open = Boolean(anchorEl);
    const { showAppBar, showSearchBar, appBarTitle } = this.props.appState;

    const homeLinks = (
      <div>
        <IconButton
          aria-owns={open ? "menu-appbar" : null}
          aria-haspopup="true"
          onClick={this.handleSearch}
          color="inherit"
        >
          <SearchIcon />
        </IconButton>
        <IconButton
          aria-owns={open ? "menu-appbar" : null}
          aria-haspopup="true"
          onClick={this.handleMenu("anchorEl")}
          color="inherit"
        >
          <NotiFicationIcon />
        </IconButton>
        <IconButton
          aria-owns={open ? "menu-appbar" : null}
          aria-haspopup="true"
          onClick={this.handleMenu("anchorEl")}
          color="inherit"
        >
          <AccountCircle />
        </IconButton>

        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right"
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right"
          }}
          open={open}
          onClose={this.handleClose("anchorEl")}
        >
          <MenuItem onClick={this.handleClose("anchorEl")}>
            <RouterLink to="/edit-profile">Profile</RouterLink>
          </MenuItem>
          <MenuItem onClick={this.handleClose("anchorEl")}>My account</MenuItem>
        </Menu>
      </div>
    );

    const editProfileLinks = (
      <div>
        <IconButton
          aria-owns={open ? "menu-appbar" : null}
          aria-haspopup="true"
          onClick={this.handleSaveProfile}
          color="inherit"
        >
          <SaveIcon />
        </IconButton>
      </div>
    );

    const location = "Montreal";

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
                <img src={Logo} className={classes.logo} />
              </div>
              <Hidden smDown>
                <Button
                  aria-controls="location-menu"
                  aria-haspopup="true"
                  onClick={this.handleMenu("locationEl")}
                  color="secondary"
                  transparent
                >
                  {t("changeLocation", { location })}
                  <ExpandMoreIcon />
                </Button>
                <Menu
                  id="location-menu"
                  anchorEl={locationEl}
                  keepMounted
                  open={Boolean(locationEl)}
                  onClose={this.handleClose("locationEl")}
                  className={classes.headerMenu}
                >
                  <MenuItem onClick={this.handleSelectLocation("Montreal")}>
                    Montreal
                  </MenuItem>
                  <MenuItem onClick={this.handleSelectLocation("Toronto")}>
                    Toronto
                  </MenuItem>
                </Menu>
              </Hidden>
            </div>
          </Grid>
          <Grid item>
            <Row>
              <Hidden smDown>
                <Column>
                  <Button
                    aria-controls="language-menu"
                    aria-haspopup="true"
                    onClick={this.handleMenu("languageEl")}
                    color="secondary"
                    transparent
                  >
                    {t("en")}
                  </Button>
                  <Menu
                    id="language-menu"
                    anchorEl={languageEl}
                    keepMounted
                    open={Boolean(languageEl)}
                    onClose={this.handleClose("languageEl")}
                    className={classes.headerMenu}
                  >
                    <MenuItem onClick={this.handleSelectLanguage("English")}>
                      English
                    </MenuItem>
                    <MenuItem onClick={this.handleSelectLanguage("French")}>
                      French
                    </MenuItem>
                  </Menu>
                </Column>
                <Column paddingLeft>
                  <Button variant="secondary">{t("placeToRent")}</Button>
                </Column>
                <Column paddingLeft>
                  <Link variant="body2" to="/login">
                    {t("loginOrRegister")}
                  </Link>
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
          </Grid>
        </Grid>
        {/* {showAppBar && !showSearchBar && (
          <AppBar position="fixed" style={{ backgroundColor: "#1466F7" }}>
            <Toolbar>
              <IconButton
                onClick={() => this.toggleDrawer(true)}
                className={classes.menuButton}
                color="inherit"
                aria-label="Menu"
              >
                <MenuIcon />
              </IconButton>
              {isLoggedIn && routePath === "/" ? (
                <IconButton
                  onClick={() => this.toggleDrawer(true)}
                  className={classes.menuButton}
                  color="inherit"
                  aria-label="Menu"
                >
                  <MenuIcon />
                </IconButton>
              ) : isLoggedIn && routePath !== "/" ? (
                <IconButton
                  onClick={this.goBack}
                  className={classes.menuButton}
                  color="inherit"
                  aria-label="Menu"
                >
                  <ArrowBackIcon />
                </IconButton>
              ) : (
                ""
              )}
              <Typography
                variant="subtitle1"
                color="inherit"
                className={classes.flex}
              >
                {appBarTitle}
              </Typography>
              {isLoggedIn && routePath === "/"
                ? homeLinks
                : isLoggedIn && routePath === "/edit-profile"
                ? editProfileLinks
                : isLoggedIn && routePath === "/compose"
                ? homeLinks
                : ""}
            </Toolbar>
          </AppBar>
        )}
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
        <SwipeableDrawer
          open={drawerOpen}
          onClose={() => this.toggleDrawer(false)}
          onOpen={() => this.toggleDrawer(true)}
          disableSwipeToOpen={isLoggedIn ? false : true}
          className={classes.sideDrawer}
        >
          <div>
            <DrawerUser user={user} />
            <SideMenu isLoggedIn={isLoggedIn} navigate={this.navigate} />
          </div>
        </SwipeableDrawer>
       */}
      </div>
    );
  }
}

export default withMuiRoot(
  withStyles(styleSheet)(withTranslation("common")(Appwrapper))
);
