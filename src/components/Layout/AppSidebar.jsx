import React, { PureComponent } from "react";
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
  DashboardIcon,
  OfficeIcon,
  CalendarIcon,
  ArrowUpIcon
} from "../../common/base-components";

const styleSheet = theme => ({
  sidebarWrapper: {
    height: "100%",
    borderRight: `1px solid ${theme.colors.primary.borderGrey}`,
    overflowY: "auto",
    "-webkit-overflow-scrolling": "touch",
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
    width: 150,
    [theme.breakpoints.down("sm")]: {
      width: "100%"
    }
  },

  menuItem: {
    position: "relative",
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
    "&:after": {
      position: "absolute",
      right: 0,
      top: 0,
      width: 4,
      height: "100%",
      content: "' '",
      borderRadius: 2,
      border: "none",
      background: theme.colors.primary.mainColor,
      [theme.breakpoints.down("sm")]: {
        background: theme.colors.primary.white
      }
    }
  },

  menuIcon: {
    marginRight: 26,
    color: theme.colors.primary.borderGrey,
    // stroke: theme.colors.primary.borderGrey,
    opacity: 1,
    [theme.breakpoints.down("sm")]: {
      marginRight: 32,
      opacity: 0.15,
      color: theme.colors.primary.darkGrey
      // stroke: theme.colors.primary.darkGrey
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

class AppSidebar extends PureComponent {
  static propTypes = {
    language: PropTypes.string,
    onToggleRole: PropTypes.func,
    onCollapse: PropTypes.func,
    navigate: PropTypes.func,
    onSelectLanguage: PropTypes.func,

    width: PropTypes.string,
    classes: PropTypes.object,
    t: PropTypes.func
  };

  menus = {
    "": [
      { text: "login", link: "login", icon: UserIcon },
      { text: "register", link: "register", icon: EditDocumentIcon }
    ],
    landlord: [
      { text: "dashboard", link: "dashboard", icon: DashboardIcon },
      { text: "offices", link: "offices", icon: OfficeIcon },
      { text: "calendar", link: "calendar", icon: CalendarIcon },
      { text: "profile", link: "profile", icon: UserIcon }
    ],
    company: [
      { text: "dashboard", link: "dashboard", icon: DashboardIcon },
      { text: "offices", link: "offices", icon: OfficeIcon },
      { text: "calendar", link: "calendar", icon: CalendarIcon },
      { text: "profile", link: "profile", icon: UserIcon }
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

  /** Navigate pages */
  navigate = path => {
    this.props.navigate(path);
  };

  handleToggleLanguage = () => {
    if (this.props.onSelectLanguage) {
      const lang = this.props.language === "en" ? "fr" : "en";
      this.props.onSelectLanguage(lang);
    }
  };

  render() {
    const { userRole, width, language, classes: s, t } = this.props;
    const MenuItem = this.renderMenuItem;

    /** Get active item */
    const activeItem = this.menus[userRole].find(item => {
      let link = `${userRole && item.role !== false ? `/${userRole}` : ""}/${
        item.link
      }`;
      if (item.link === "login") {
        link = "login";
      } else if (item.link === "register") {
        link = "register";
      }
      return item.exact
        ? this.props.location.pathname === link ||
            this.props.location.pathname === `${link}/`
        : this.props.location.pathname.startsWith(link);
    });

    return (
      <div className={s.sidebarWrapper}>
        <div className={s.sidebarContent}>
          <Column alignChildrenEnd classes={{ box: s.sidebarBody }}>
            {/** Show main menus */}
            {this.menus[userRole].map(item => (
              <MenuItem
                active={activeItem === item}
                item={item}
                navigate={this.navigate}
                classes={s}
                t={t}
                key={item.text}
              />
            ))}

            {/* show more buttons for mobile version */}
            {isWidthDown("sm", width) && (
              <React.Fragment>
                {!userRole && (
                  <Button
                    link="normal"
                    background="primary"
                    outline="primaryDark"
                    inverse
                    onClick={() =>
                      this.navigate(
                        "/auth/register/landlord?redirect=/landlord/offices/add"
                      )
                    }
                    className={s.fullWidthButton}
                  >
                    <Typography fontSizeS>{t("placeToRent")}</Typography>
                  </Button>
                )}

                {/* divider */}
                <Divider light styles={s.divider} />

                {/* show more menus */}
                <Row fullWidth classes={{ box: s.moreWrapper }}>
                  <Column fullWidth>
                    {userRole && (
                      <Button
                        link="normal"
                        background="primary"
                        outline="primaryDark"
                        inverse
                        onClick={() => {
                          const roleToSet =
                            userRole === "landlord" ? "company" : "landlord";
                          this.props.onToggleRole(
                            roleToSet,
                            roleToSet === "landlord"
                              ? "/landlord/offices/add"
                              : null
                          );
                        }}
                        className={s.fullWidthButton}
                      >
                        <Typography fontSizeS>
                          {userRole === "landlord"
                            ? t("needOffice")
                            : t("placeToRent")}
                        </Typography>
                      </Button>
                    )}
                    {!userRole ? (
                      <React.Fragment>
                        <MenuItem
                          active={false}
                          item={
                            language === "en"
                              ? {
                                text: "english",
                                icon: () => <Typography>EN</Typography>
                              }
                              : {
                                text: "french",
                                icon: () => <Typography>FR</Typography>
                              }
                          }
                          navigate={this.handleToggleLanguage}
                          classes={s}
                          t={t}
                        />
                      </React.Fragment>
                    ) : null}
                  </Column>
                </Row>

                {/* collapse button */}
                <Column
                  classes={{ box: s.collapseButton }}
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
              </React.Fragment>
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
