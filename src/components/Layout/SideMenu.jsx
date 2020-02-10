import React, { Component } from "react";
import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import {
  ExitToApp as LogoutIcon,
  LockOpen as LoginIcon,
  Chat as ChatIcon,
  Photo as PhotoIcon
} from "@material-ui/icons";
import { withTranslation } from "react-i18next";

const styleSheet = theme => ({
  menuItem: {
    "&:focus": {
      backgroundColor: theme.palette.primary.main,
      "& $primary, & $icon": {
        color: theme.palette.common.white
      }
    }
  },
  primary: {},
  icon: {},
  fullList: {
    width: 300
  }
});

class SideMenu extends Component {
  render() {
    const { classes, t } = this.props;
    const { isLoggedIn } = this.props;

    return (
      <div>
        <Paper>
          <MenuList className={classes.fullList}>
            <MenuItem
              onClick={() => this.props.navigate("home")}
              className={classes.menuItem}
            >
              <ListItemIcon className={classes.icon}>
                <PhotoIcon />
              </ListItemIcon>
              <ListItemText
                classes={{ primary: classes.primary }}
                inset
                primary="Home"
              />
            </MenuItem>

            <MenuItem
              onClick={() => this.props.navigate("profile")}
              className={classes.menuItem}
            >
              <ListItemIcon className={classes.icon}>
                <ChatIcon />
              </ListItemIcon>
              <ListItemText
                classes={{ primary: classes.primary }}
                inset
                primary="Profile"
              />
            </MenuItem>
            {isLoggedIn ? (
              <MenuItem
                onClick={() => this.props.navigate("logout")}
                className={classes.menuItem}
              >
                <ListItemIcon className={classes.icon}>
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText
                  classes={{ primary: classes.primary }}
                  inset
                  primary={t("logout")}
                />
              </MenuItem>
            ) : (
              <MenuItem
                onClick={() => this.props.navigate("login")}
                className={classes.menuItem}
              >
                <ListItemIcon className={classes.icon}>
                  <LoginIcon />
                </ListItemIcon>
                <ListItemText
                  classes={{ primary: classes.primary }}
                  inset
                  primary={t("login")}
                />
              </MenuItem>
            )}
          </MenuList>
        </Paper>
      </div>
    );
  }
}

export default withStyles(styleSheet)(withTranslation("common")(SideMenu));
