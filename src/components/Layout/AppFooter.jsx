import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Box, Column, Stretch, Link, Row } from "../../common/base-components";
import { Typography } from "@material-ui/core";
import MiniLogo from "../../assets/mini-logo-gray.svg";
import { withTranslation } from "react-i18next";
import withMuiRoot from "../../withMuiRoot";

const styleSheet = theme => ({
  footerWrapper: {
    height: "100%",
    borderTop: `0.5px solid ${theme.colors.primary.borderGrey}`,
    paddingTop: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  },

  container: {
    justifyContent: "center",
    maxWidth: 1024
  },

  navWrapper: {
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      alignItems: "flex-start"
    }
  },

  navLink: {
    color: theme.colors.primary.grey,
    marginRight: theme.spacing(2)
  },

  logoWrapper: {},

  miniLogo: {}
});

class AppFooter extends Component {
  render() {
    const { classes, t } = this.props;
    return (
      <Column classes={{ box: classes.footerWrapper }}>
        <Row classes={{ box: classes.container }} fullWidth>
          <Box classes={{ box: classes.navWrapper }}>
            <Typography variant="caption" className={classes.navLink}>
              {t("allRightsReserved")}
            </Typography>
            <Typography variant="caption">
              <Link to="/terms" styles={classes.navLink}>
                {t("terms")}
              </Link>
              <Link to="/privacy" styles={classes.navLink}>
                {t("privacy")}
              </Link>
              <Link to="/sitemap" styles={classes.navLink}>
                {t("siteMap")}
              </Link>
            </Typography>
          </Box>
          <Stretch />
          <Box classes={{ box: classes.logoWrapper }}>
            <img src={MiniLogo} className={classes.miniLogo} alt="RENTGLOBAL"/>
          </Box>
        </Row>
      </Column>
    );
  }
}

export default withMuiRoot(
  withStyles(styleSheet)(withTranslation("common")(AppFooter))
);
