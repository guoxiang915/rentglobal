import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { withTranslation } from "react-i18next";
import { withRouter } from "react-router-dom";
import withWidth, { isWidthDown } from "@material-ui/core/withWidth";
import PropTypes from "prop-types";
import clsx from "clsx";
import {
  Link,
  Typography,
  Row,
  Column,
  Box,
  Button,
  Divider
} from "../../common/base-components";
import {
  KeyboardArrowUp,
  HomeOutlined,
  PersonOutline,
  EditOutlined,
  DashboardOutlined,
  ChatOutlined,
  BusinessOutlined,
  NoteOutlined,
  DirectionsBusOutlined,
  DateRangeOutlined,
  AttachMoneyOutlined,
  ContactSupportOutlined,
  SettingsOutlined,
  HelpOutline,
  LocationOnOutlined
} from "@material-ui/icons";

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

  sidebarContent: {
    minHeight: "100%",
    width: "100%",
    position: "relative"
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
    t: PropTypes.func
  };

  menus = {
    "": [
      { text: "home", link: "", icon: <HomeOutlined /> },
      { text: "chatWithTessi", link: "chat", icon: <ChatOutlined /> },
      { text: "login", link: "login", icon: <PersonOutline /> },
      { text: "register", link: "register", icon: <EditOutlined /> }
    ],
    landlord: [
      { text: "home", link: "", icon: <HomeOutlined /> },
      { text: "dashboard", link: "dashboard", icon: <DashboardOutlined /> },
      { text: "offices", link: "offices", icon: <BusinessOutlined /> },
      { text: "contracts", link: "contracts", icon: <NoteOutlined /> },
      {
        text: "optimization",
        link: "optimization",
        icon: <DirectionsBusOutlined />
      },
      { text: "calendar", link: "calendar", icon: <DateRangeOutlined /> },
      { text: "financials", link: "financial", icon: <AttachMoneyOutlined /> },
      { text: "support", link: "support", icon: <ContactSupportOutlined /> },
      { text: "profile", link: "profile", icon: <PersonOutline /> },
      { text: "setting", link: "settings", icon: <SettingsOutlined /> }
    ],
    company: [
      { text: "home", link: "", icon: <HomeOutlined /> },
      { text: "dashboard", link: "dashboard", icon: <DashboardOutlined /> },
      { text: "offices", link: "offices", icon: <BusinessOutlined /> },
      { text: "contracts", link: "contracts", icon: <NoteOutlined /> },
      { text: "calendar", link: "calendar", icon: <DateRangeOutlined /> },
      { text: "financials", link: "financial", icon: <AttachMoneyOutlined /> },
      { text: "support", link: "support", icon: <ContactSupportOutlined /> },
      { text: "profile", link: "profile", icon: <PersonOutline /> },
      { text: "setting", link: "settings", icon: <SettingsOutlined /> }
    ]
  };

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
                {/* <Icon className={classes.menuIcon}>{item.icon}</Icon> */}
                <Box classes={{ box: classes.menuIcon }}>{item.icon}</Box>
                {t(item.text)}
              </Typography>
            </Link>
          ) : (
            <Link to={link} variant={active ? "primary" : "normal"}>
              <Typography fontSizeS>
                {/* <Icon className={classes.menuIcon}>{item.icon}</Icon> */}
                <Box classes={{ box: classes.menuIcon }}>{item.icon}</Box>
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
        <div className={classes.sidebarContent}>
          <Column
            alignChildrenEnd
            classes={{ box: classes.sidebarBody }}
            paddingTopDouble
            paddingBottomDouble
          >
            {this.menus[role].map(item =>
              this.renderMenuItem(role, item, this.navigate)
            )}
          </Column>
          {isWidthDown("sm", width) && (
            <>
              <Divider light styles={classes.divider} />
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
                  onClick={() =>
                    role
                      ? this.handleToggleRole()
                      : this.props.navigate("register", "landlord")
                  }
                  className={classes.fixedWidthButton}
                >
                  <Typography fontSizeS>
                    {role === "landlord" ? t("needOffice") : t("placeToRent")}
                  </Typography>
                </Button>
                {!role ? (
                  <Row classes={{ box: classes.chatItem }} fullWidth>
                    <Column alignChildrenStart>
                      {this.renderMenuItem(
                        role,
                        {
                          text: "montreal",
                          link: "location",
                          // icon: "location_on"
                          icon: <LocationOnOutlined />
                        },
                        this.navigate
                      )}
                      {this.renderMenuItem(
                        role,
                        {
                          text: "english",
                          link: "language",
                          // icon: "en"
                          icon: "EN"
                        },
                        this.navigate
                      )}
                      {this.renderMenuItem(
                        role,
                        {
                          text: "help",
                          link: "help",
                          // icon: "help_outline"
                          icon: <HelpOutline />
                        },
                        this.navigate
                      )}
                    </Column>
                  </Row>
                ) : (
                  <Row classes={{ box: classes.chatItem }} fullWidth>
                    {this.renderMenuItem(
                      role,
                      {
                        text: "chatWithTessi",
                        link: "",
                        // icon: "settings"
                        icon: <ChatOutlined />
                      },
                      this.navigate
                    )}
                  </Row>
                )}
              </Column>
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
      </div>
    );
  }
}

export default withWidth()(
  withRouter(withStyles(styleSheet)(withTranslation("common")(AppSidebar)))
);
