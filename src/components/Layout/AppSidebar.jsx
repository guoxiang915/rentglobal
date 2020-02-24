import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { withTranslation } from "react-i18next";
import { withRouter } from "react-router-dom";
import withWidth, { isWidthDown } from "@material-ui/core/withWidth";
import PropTypes from "prop-types";
import clsx from "clsx";
import { Icon } from "@material-ui/core";
import {
  Link,
  Typography,
  Row,
  Column,
  Button,
  Divider
} from "../../common/base-components";
import { KeyboardArrowUp } from "@material-ui/icons";

const styleSheet = theme => ({
  sidebarWrapper: {
    height: "100%",
    borderRight: `1px solid ${theme.colors.primary.borderGrey}`,
    overflowY: "auto",
    [theme.breakpoints.down("sm")]: {
      borderRight: "none",
      background: theme.colors.primary.mainColor,
      width: "100%",
      height: "100%",
      position: "absolute",
      zIndex: 1000,
      opacity: 0.95
    }
  },

  sidebarBody: {
    width: 204,
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      paddingLeft: 27
    }
  },

  menuItem: {
    width: 150,
    overflow: "hidden",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      height: 50
    }
  },

  activeItem: {
    borderRight: `4px solid ${theme.colors.primary.mainColor}`,
    [theme.breakpoints.down("sm")]: {
      borderColor: theme.colors.primary.white
    }
  },

  menuIcon: {
    marginRight: 26,
    [theme.breakpoints.down("sm")]: {
      marginRight: 32
    }
  },

  divider: {
    backgroundColor: theme.colors.primary.darkColor
  },

  moreWrapper: {
    paddingLeft: 27,
    paddingRight: 27,
    paddingTop: 32,
    paddingBottom: 20
  },

  fixedWidthButton: {
    width: "100%"
  },

  chatItem: {
    paddingTop: 20,
    paddingBottom: 48
  },

  collapseButton: {
    position: "absolute",
    bottom: 0
  }
});

class AppSidebar extends Component {
  static propTypes = {
    onToggleRole: PropTypes.func,
    onCollapse: PropTypes.func,
    navigate: PropTypes.func,

    width: PropTypes.string,
    classes: PropTypes.object,
    t: PropTypes.number
  };

  normalMenu = [
    { text: "home", link: "", icon: "home" },
    { text: "chatWithTessi", link: "chat", icon: "home" },
    { text: "login", link: "login", icon: "person" },
    { text: "register", link: "register", icon: "edit" }
  ];
  landlordMenu = [
    { text: "home", link: "", icon: "home" },
    { text: "dashboard", link: "dashboard", icon: "dashboard" },
    { text: "offices", link: "offices", icon: "business" },
    { text: "contracts", link: "contracts", icon: "note" },
    { text: "optimization", link: "optimization", icon: "directions_bus" },
    { text: "calendar", link: "calendar", icon: "date_range" },
    { text: "financials", link: "financial", icon: "attach_money" },
    { text: "support", link: "support", icon: "contact_support" },
    { text: "profile", link: "profile", icon: "person" },
    { text: "setting", link: "settings", icon: "settings" }
  ];
  companyMenu = [
    { text: "home", link: "", icon: "home" },
    { text: "dashboard", link: "dashboard", icon: "dashboard" },
    { text: "offices", link: "offices", icon: "business" },
    { text: "contracts", link: "contracts", icon: "note" },
    { text: "calendar", link: "calendar", icon: "date_range" },
    { text: "financials", link: "financial", icon: "attach_money" },
    { text: "support", link: "support", icon: "contact_support" },
    { text: "profile", link: "profile", icon: "person" },
    { text: "setting", link: "settings", icon: "settings" }
  ];

  renderMenuItem = (itemType, item, navigate) => {
    const { width, classes, t } = this.props;
    const link = `${itemType && "/" + itemType}/${item.link}`;
    const active = link === this.props.location.pathname;

    return (
      <React.Fragment key={item.text}>
        <Row
          paddingTopHalf
          paddingBottomHalf
          classes={{
            box: clsx(classes.menuItem, active && classes.activeItem)
          }}
        >
          {isWidthDown("sm", width) ? (
            <Link
              to="#"
              onClick={() => navigate(item.link)}
              variant={active ? "white" : "normal"}
              inverse
            >
              <Typography fontSizeM>
                <Icon className={classes.menuIcon}>{item.icon}</Icon>
                {t(item.text)}
              </Typography>
            </Link>
          ) : (
            <Link to={link} variant={active ? "primary" : "normal"}>
              <Typography fontSizeS>
                <Icon className={classes.menuIcon}>{item.icon}</Icon>
                {t(item.text)}
              </Typography>
            </Link>
          )}
        </Row>
      </React.Fragment>
    );
  };

  navigate = path => {
    this.props.navigate(path, this.props.role);
  };

  handleToggleRole = () => {
    this.props.onToggleRole(
      this.props.role === "landlord" ? "company" : "landlord"
    );
  };

  render() {
    const { role, width, classes, t } = this.props;

    return (
      <div className={classes.sidebarWrapper}>
        <Column
          alignChildrenEnd
          classes={{ box: classes.sidebarBody }}
          paddingTopDouble
          paddingBottomDouble
        >
          {role === "" &&
            this.normalMenu.map(item =>
              this.renderMenuItem("", item, this.navigate)
            )}
          {role === "landlord" &&
            this.landlordMenu.map(item =>
              this.renderMenuItem("landlord", item, this.navigate)
            )}
          {role === "company" &&
            this.companyMenu.map(item =>
              this.renderMenuItem("company", item, this.navigate)
            )}
        </Column>
        {isWidthDown("sm", width) && (
          <>
            <Divider light styles={classes.divider} />
            {role === "landlord" ||
              (role === "company" && (
                <Column
                  classes={{
                    box: clsx(classes.moreWrapper, classes.sidebarBody)
                  }}
                >
                  <Button
                    link="normal"
                    background="primary"
                    outline="primaryDark"
                    inverse
                    onClick={this.handleToggleRole}
                    className={classes.fixedWidthButton}
                  >
                    <Typography fontSizeS>
                      {role === "landlord" ? t("needOffice") : t("placeToRent")}
                    </Typography>
                  </Button>
                  <Row classes={{ box: classes.chatItem }} fullWidth>
                    {this.renderMenuItem("landlord", {
                      text: "chatWithTessi",
                      link: "",
                      icon: "settings"
                    })}
                  </Row>
                </Column>
              ))}
            <Column
              classes={{ box: classes.collapseButton }}
              paddingTop
              paddingBottomHalf
              fullWidth
            >
              <Link
                to="#"
                onClick={this.props.onCollapse}
                variant="secondaryDark"
                inverse
              >
                <KeyboardArrowUp />
              </Link>
            </Column>
          </>
        )}
      </div>
    );
  }
}

export default withWidth()(
  withRouter(withStyles(styleSheet)(withTranslation("common")(AppSidebar)))
);
