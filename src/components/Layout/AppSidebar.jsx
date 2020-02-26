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
  Divider,
  UserIcon,
  EditDocumentIcon,
  HomeIcon,
  TessiIcon,
  MapPointerIcon,
  HelpIcon,
  OptimizationIcon,
  DashboardIcon,
  OfficeIcon,
  NoteIcon,
  CalendarIcon,
  TicketIcon,
  ChatIcon,
  SettingIcon,
  ArrowUpIcon
} from "../../common/base-components";

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
      opacity: 0.98
    }
  },

  sidebarContent: {
    minHeight: "100%",
    width: "100%",
    position: "relative",
    paddingTop: 24,
    paddingBottom: 24,
    [theme.breakpoints.down("sm")]: {
      paddingTop: 17,
      paddingBottom: 10
    }
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
    paddingTop: 10,
    paddingBottom: 10,
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      marginTop: 2,
      marginBottom: 2,
      paddingLeft: 27
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
    color: theme.colors.primary.borderGrey,
    opacity: 1,
    [theme.breakpoints.down("sm")]: {
      marginRight: 32,
      opacity: 0.15,
      color: theme.colors.primary.darkGrey
    }
  },

  activeMenuIcon: {
    opacity: 1,
    color: theme.colors.primary.mainColor,
    [theme.breakpoints.down("sm")]: {
      color: theme.colors.primary.white
    }
  },

  iconComponent: {
    width: 16,
    height: 16,
    [theme.breakpoints.down("sm")]: {
      width: 24,
      height: 24
    }
  },

  divider: {
    backgroundColor: theme.colors.primary.darkColor,
    opacity: 0.5,
    marginTop: 13
  },

  moreWrapper: {
    paddingTop: 20,
    paddingBottom: 20
  },

  fullWidthButton: {
    width: "calc(100% - 40px)",
    margin: "12px 18px 12px 21px",
    border: `2px solid ${theme.colors.primary.darkColor}80`
  },

  chatItem: {
    paddingTop: 8,
    paddingBottom: 48
  },

  collapseButton: {
    position: "absolute",
    bottom: 0,
    opacity: 0.25
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
      { text: "home", link: "", icon: HomeIcon },
      { text: "chatWithTessi", link: "chat", icon: TessiIcon },
      { text: "login", link: "login", icon: UserIcon },
      { text: "register", link: "register", icon: EditDocumentIcon }
    ],
    landlord: [
      { text: "home", link: "", icon: HomeIcon },
      { text: "dashboard", link: "dashboard", icon: DashboardIcon },
      { text: "offices", link: "offices", icon: OfficeIcon },
      { text: "contracts", link: "contracts", icon: NoteIcon },
      {
        text: "optimization",
        link: "optimization",
        icon: OptimizationIcon
      },
      { text: "calendar", link: "calendar", icon: CalendarIcon },
      { text: "financials", link: "financial", icon: TicketIcon },
      { text: "support", link: "support", icon: ChatIcon },
      { text: "profile", link: "profile", icon: UserIcon },
      { text: "setting", link: "settings", icon: SettingIcon }
    ],
    company: [
      { text: "home", link: "", icon: HomeIcon },
      { text: "dashboard", link: "dashboard", icon: DashboardIcon },
      { text: "offices", link: "offices", icon: OfficeIcon },
      { text: "contracts", link: "contracts", icon: NoteIcon },
      { text: "calendar", link: "calendar", icon: CalendarIcon },
      { text: "financials", link: "financial", icon: TicketIcon },
      { text: "support", link: "support", icon: ChatIcon },
      { text: "profile", link: "profile", icon: UserIcon },
      { text: "setting", link: "settings", icon: SettingIcon }
    ]
  };

  // menu item component
  renderMenuItem = withWidth()(
    ({ active, item, navigate, width, classes, t }) => {
      const IconComponent = item.icon;
      const isHover = false;

      return (
        <React.Fragment>
          <Row
            classes={{
              box: clsx(
                classes.menuItem,
                (active || isHover) && classes.activeItem
              )
            }}
            fontWeightBold={active}
          >
            {isWidthDown("sm", width) ? (
              <Link
                to="#"
                onClick={() => navigate(item.link)}
                variant={active || isHover ? "white" : "normal"}
                inverse
              >
                <Typography fontSizeM alignChildrenCenter>
                  <Box
                    classes={{
                      box: clsx(
                        classes.menuIcon,
                        (active || isHover) && classes.activeMenuIcon
                      )
                    }}
                  >
                    <IconComponent className={classes.iconComponent} />
                  </Box>
                  {t(item.text)}
                </Typography>
              </Link>
            ) : (
              <Link
                to="#"
                onClick={() => navigate(item.link)}
                variant={active || isHover ? "primary" : "normal"}
              >
                <Typography fontSizeS alignChildrenCenter>
                  <Box
                    classes={{
                      box: clsx(
                        classes.menuIcon,
                        (active || isHover) && classes.activeMenuIcon
                      )
                    }}
                  >
                    <IconComponent className={classes.iconComponent} />
                  </Box>
                  {t(item.text)}
                </Typography>
              </Link>
            )}
          </Row>
        </React.Fragment>
      );
    }
  );

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
    const MenuItem = this.renderMenuItem;

    // get active item
    const activeItem = this.menus[role].find(
      item =>
        this.props.location.pathname === `${role && "/" + role}/${item.link}`
    );

    return (
      <div className={classes.sidebarWrapper}>
        <div className={classes.sidebarContent}>
          <Column alignChildrenEnd classes={{ box: classes.sidebarBody }}>
            {/* show main menus */}
            {this.menus[role].map(
              item => (
                <MenuItem
                  active={activeItem === item}
                  item={item}
                  navigate={this.navigate}
                  classes={classes}
                  t={t}
                  key={item.text}
                />
              )
            )}

            {/* show more buttons for mobile version */}
            {isWidthDown("sm", width) && (
              <>
                {!role && (
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
                    className={classes.fullWidthButton}
                  >
                    <Typography fontSizeS>{t("placeToRent")}</Typography>
                  </Button>
                )}

                {/* divider */}
                <Divider light styles={classes.divider} />

                {/* show more menus */}
                <Row fullWidth classes={{ box: classes.moreWrapper }}>
                  <Column fullWidth>
                    {role && (
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
                        className={classes.fullWidthButton}
                      >
                        <Typography fontSizeS>
                          {role === "landlord"
                            ? t("needOffice")
                            : t("placeToRent")}
                        </Typography>
                      </Button>
                    )}
                    {!role ? (
                      <>
                        <MenuItem
                          active={false}
                          item={{
                            text: "montreal",
                            link: "location",
                            icon: MapPointerIcon
                          }}
                          navigate={this.navigate}
                          classes={classes}
                          t={t}
                        />
                        <MenuItem
                          active={false}
                          item={{
                            text: "english",
                            link: "language",
                            icon: props => <Typography>EN</Typography>
                          }}
                          navigate={this.navigate}
                          classes={classes}
                          t={t}
                        />
                        <MenuItem
                          active={false}
                          item={{
                            text: "help",
                            link: "help",
                            icon: HelpIcon
                          }}
                          navigate={this.navigate}
                          classes={classes}
                          t={t}
                        />
                      </>
                    ) : (
                      <Row classes={{ box: classes.chatItem }} fullWidth>
                        <MenuItem
                          active={false}
                          item={{
                            text: "chatWithTessi",
                            link: "",
                            icon: TessiIcon
                          }}
                          navigate={this.navigate}
                          classes={classes}
                          t={t}
                        />
                      </Row>
                    )}
                  </Column>
                </Row>

                {/* collapse button */}
                <Column
                  classes={{ box: classes.collapseButton }}
                  paddingTop
                  fullWidth
                >
                  <Link
                    to="#"
                    onClick={this.props.onCollapse}
                    variant="secondaryDark"
                    inverse
                  >
                    <ArrowUpIcon />
                  </Link>
                </Column>
              </>
            )}
          </Column>
        </div>
      </div>
    );
  }
}

export default withWidth()(
  withRouter(withStyles(styleSheet)(withTranslation("common")(AppSidebar)))
);
