import React from "react";
import { withStyles } from "@material-ui/core/styles";
import {
  Box,
  Column,
  Stretch,
  Link,
  Row,
  Typography,
} from "../../common/base-components";
import MiniLogo from "../../assets/mini-logo-gray.svg";
import { withTranslation } from "react-i18next";
import withMuiRoot from "../../withMuiRoot";

const styleSheet = (theme) => ({
  footerWrapper: {
    height: "100%",
    borderTop: `0.5px solid ${theme.colors.primary.borderGrey}`,
    paddingTop: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },

  container: {
    justifyContent: "center",
    maxWidth: 1024,
  },

  navWrapper: {
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      alignItems: "flex-start",
    },
  },

  navLink: {
    color: theme.colors.primary.grey,
    marginRight: theme.spacing(2),
  },

  logoWrapper: {},

  miniLogo: {},
});

const AppFooter = ({ classes, t }) => (
  <Column classes={{ box: classes.footerWrapper }}>
    <Row classes={{ box: classes.container }} fullWidth>
      <Box classes={{ box: classes.navWrapper }}>
        <Typography textMediumGrey fontSizeXS paddingRight>
          {t("allRightsReserved")}
        </Typography>
        <Typography fontSizeXS>
          <Box paddingRight span>
            <Link variant="normalLight" to="#">
              {t("terms")}
            </Link>
          </Box>
          <Box paddingRight span>
            <Link variant="normalLight" to="#">
              {t("privacy")}
            </Link>
          </Box>
          <Box span>
            <Link variant="normalLight" to="#">
              {t("siteMap")}
            </Link>
          </Box>
        </Typography>
      </Box>
      <Stretch />
      <Box classes={{ box: classes.logoWrapper }}>
        <img src={MiniLogo} className={classes.miniLogo} alt="RENTGLOBAL" />
      </Box>
    </Row>
  </Column>
);

export default withMuiRoot(
  withStyles(styleSheet)(withTranslation("common")(AppFooter))
);
