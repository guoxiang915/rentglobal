import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { withTranslation } from "react-i18next";
import clsx from "clsx";
import { Icon } from "@material-ui/core";
import { Link, Typography, Row, Column } from "../../common/base-components";

const styleSheet = theme => ({
  sidebarWrapper: {
    height: "100%",
    borderRight: `1px solid ${theme.colors.primary.borderGrey}`
  },
  sidebarBody: {
    width: 204,
    [theme.breakpoints.down("sm")]: {
      width: "100%"
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
    borderRight: `4px solid ${theme.colors.primary.mainColor}`
  },
  menuIcon: {
    marginRight: 26,
    [theme.breakpoints.down("sm")]: {
      marginRight: 32
    }
  }
});

class AppSidebar extends Component {
  normalMenu = [];
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

  renderMenuItem = (itemType, item) => {
    const { classes, t } = this.props;
    const link = `/${itemType}/${item.link}`;
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
          <Link to={link} variant={active ? "primary" : "normal"}>
            <Typography fontSizeS>
              <Icon className={classes.menuIcon}>{item.icon}</Icon>
              {t(item.text)}
            </Typography>
          </Link>
        </Row>
      </React.Fragment>
    );
  };

  render() {
    const { classes } = this.props;
    const { isLoggedIn } = this.props.auth;
    const { role } = this.props;

    return (
      <div className={classes.sidebarWrapper}>
        <Column
          alignChildrenEnd
          classes={{ box: classes.sidebarBody }}
          paddingTopDouble
          paddingBottomDouble
        >
          {!isLoggedIn
            ? this.normalMenu.map(item => this.renderMenuItem("", item))
            : role === "landlord"
            ? this.landlordMenu.map(item =>
                this.renderMenuItem("landlord", item)
              )
            : this.companyMenu.map(item => this.renderMenuItem("office", item))}
        </Column>
      </div>
    );
  }
}

export default withStyles(styleSheet)(withTranslation("common")(AppSidebar));
