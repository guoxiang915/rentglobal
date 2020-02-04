import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import withMuiRoot from "../../withMuiRoot";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import SideMenu from "../SideMenu";
import DrawerUser from "../DrawerUser";
import Auth from "../../utils/auth";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import SearchIcon from "@material-ui/icons/Search";
import NotiFicationIcon from "@material-ui/icons/Notifications";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { Link as RouterLink } from "react-router-dom";
import SaveIcon from "@material-ui/icons/Save";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Logo from "../../assets/logo.svg";

import "./style.css";
import { Grid } from "@material-ui/core";
import { withTranslation } from "react-i18next";
import {
  Button,
  Link,
  Select,
  Box,
  Row,
  Stretch,
  Column
} from "../../common/base-components";

const authObj = new Auth();

const styleSheet = theme => ({
  root: {
    flexGrow: 1,
    // marginTop: 70,
    boxShadow: "0px 34px 34px #00000026",
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
    padding: theme.spacing(4) - 4,
    paddingBottom: theme.spacing(4) - 8,
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(2)
    }
  },

  logoWrapper: {
    display: "flex",
    marginRight: theme.spacing(2)
  },

  logo: {
    height: 44
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

    // if (isLoading) {
    //   return null;
    // }

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
              <Link to="/">
              <img src={Logo} className={classes.logo} />
              </Link>
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
              >
                <MenuItem onClick={this.handleSelectLocation("Montreal")}>
                  Montreal
                </MenuItem>
                <MenuItem onClick={this.handleSelectLocation("Toronto")}>
                  Toronto
                </MenuItem>
              </Menu>
            </div>
          </Grid>
          <Grid item>
            <Row>
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
                <Link variant="body2" to="/login">{t("loginOrRegister")}</Link>
              </Column>
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
