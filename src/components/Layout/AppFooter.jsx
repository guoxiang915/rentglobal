import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Box, Column, Stretch, Link, Row } from "../../common/base-components";
import { Typography } from "@material-ui/core";
import MiniLogo from "../../assets/mini-logo-gray.svg";
import { withTranslation } from "react-i18next";
import withMuiRoot from "../../withMuiRoot";

const styleSheet = theme => ({
  footerWrapper: {
    borderTop: `0.5px solid ${theme.colors.primary.borderGrey}`,
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(5),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },

  container: {
    justifyContent: "center",
    maxWidth: 1000
  },

  navWrapper: {},

  logoWrapper: {},

  miniLogo: {}
});

class AppFooter extends Component {
  render() {
    const { classes, t } = this.props;
    return (
      <Column classes={{box: classes.footerWrapper}}>
        <Row classes={{ box: classes.container }} fullWidth>
          <Box classes={{ box: classes.navWrapper }}>
            <Typography variant="caption">
              {t("allRightsReserved")}
              <Link to="/terms">{t("terms")}</Link>
              <Link to="/terms">{t("privacy")}</Link>
              <Link to="/terms">{t("siteMap")}</Link>
            </Typography>
          </Box>
          <Stretch />
          <Box classes={{ box: classes.logoWrapper }}>
            <img src={MiniLogo} className={classes.miniLogo} />
          </Box>
        </Row>
      </Column>
    );
  }
}

export default withMuiRoot(
  withStyles(styleSheet)(withTranslation("common")(AppFooter))
);
