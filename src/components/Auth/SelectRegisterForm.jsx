import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Container, Grid } from "@material-ui/core";
import { withTranslation } from "react-i18next";
import {
  Button,
  Row,
  Box,
  Column,
  Link,
  Typography,
  UsersIcon,
  BuildingsIcon,
  ArrowRightAltIcon,
} from "../../common/base-components";

const styleSheet = (theme) => ({
  formWrapper: {
    // width: "100%",
    marginTop: 54,
    // maxWidth: 1024
  },

  selectorWrapper: {
    maxWidth: 340,
    [theme.breakpoints.down("sm")]: {
      alignItems: "center",
    },
  },

  formTitle: {
    color: theme.colors.primary.darkGrey,
    fontSize: "26px",
    lineHeight: "34px",
    textAlign: "left",
    [theme.breakpoints.down("sm")]: {
      fontSize: "20px",
      textAlign: "center",
    },
  },

  formSubtitle: {
    color: theme.colors.primary.darkGrey,
    fontSize: "20px",
    lineHeight: "26px",
    textAlign: "left",
    [theme.breakpoints.down("sm")]: {
      fontSize: "16px",
      textAlign: "center",
    },
  },

  signupButton: {
    marginTop: theme.spacing(7),
    [theme.breakpoints.down("sm")]: {
      marginTop: theme.spacing(4),
    },
  },

  switchText: {
    fontSize: "14px",
  },

  switchTextWrapper: {
    paddingTop: 40,
  },

  outlineIcon: {
    color: theme.colors.primary.borderGrey,
  },

  rightColumn: {
    position: "relative",
    "&:before": {
      content: '" "',
      position: "absolute",
      left: 0,
      top: 67,
      bottom: 16,
      borderLeft: `1px solid ${theme.colors.primary.borderGrey}`,
      [theme.breakpoints.down("sm")]: {
        border: "none",
      },
    },
  },
});

class SelectRegisterForm extends PureComponent {
  handleSelectRegister = (registerMode) => () => {
    if (registerMode) {
      this.props.navigate(`register/${registerMode}`);
    }
  };

  render() {
    const { classes: s, t } = this.props;

    return (
      <Container>
        <Column fullWidth>
          <Grid container className={s.formWrapper}>
            <Grid item xs={12} sm={6}>
              <Column fullWidth padding>
                <Column
                  alignChildrenStart
                  classes={{ box: s.selectorWrapper }}
                  textLightGrey
                >
                  <BuildingsIcon fontSize="large" className={s.outlineIcon} />
                  <Box paddingTopHalf>
                    <Typography
                      fontSizeL
                      fontWeightBold
                      textSecondary
                      fullWidth
                      paddingTopHalf
                      textLeft
                      // classes={{ box: classes.formTitle }}
                    >
                      {t("amLandlord")}
                    </Typography>
                  </Box>
                  <Box paddingTopHalf>
                    <Typography
                      fontSizeM
                      textSecondary
                      classes={{ box: s.formSubtitle }}
                    >
                      {t("iHavePlaceToRent")}
                    </Typography>
                  </Box>
                  <Button
                    className={s.signupButton}
                    onClick={this.handleSelectRegister("landlord")}
                  >
                    <Typography fontSizeS fontWeightBold textWhite>
                      {t("landlordSignup")}
                      <Box paddingLeft alignChildrenCenter>
                        <ArrowRightAltIcon style={{ width: 14, height: 10 }} />
                      </Box>
                    </Typography>
                  </Button>
                </Column>
              </Column>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Column fullWidth padding classes={{ box: s.rightColumn }}>
                <Column
                  alignChildrenStart
                  classes={{ box: s.selectorWrapper }}
                  textLightGrey
                >
                  <UsersIcon fontSize="large" className={s.outlineIcon} />
                  <Box paddingTopHalf>
                    <Typography
                      fontSizeL
                      fontWeightBold
                      textSecondary
                      fullWidth
                      paddingTopHalf
                      textLeft
                      // classes={{ box: classes.formTitle }}
                    >
                      {t("needOffice")}
                    </Typography>
                  </Box>
                  <Box paddingTopHalf>
                    <Typography
                      fontSizeM
                      textSecondary
                      classes={{ box: s.formSubtitle }}
                    >
                      {t("iLookForOffice")}
                    </Typography>
                  </Box>
                  <Button
                    className={s.signupButton}
                    onClick={this.handleSelectRegister("company")}
                  >
                    <Typography fontSizeS fontWeightBold textWhite>
                      {t("companySignup")}
                      <Box paddingLeft alignChildrenCenter>
                        <ArrowRightAltIcon style={{ width: 14, height: 10 }} />
                      </Box>
                    </Typography>
                  </Button>
                </Column>
              </Column>
            </Grid>
          </Grid>
          <Row fullWidth classes={{ box: s.switchTextWrapper }}>
            <Column fullWidth>
              <Typography textSecondary fontSizeS>
                {t("alreadyHaveAccount")}
                <Link to="/auth/login" variant="primary">
                  &nbsp;{t("login")}
                </Link>
              </Typography>
            </Column>
          </Row>
        </Column>
      </Container>
    );
  }
}

SelectRegisterForm.propTypes = {
  classes: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
  navigate: PropTypes.func,
};

export default withStyles(styleSheet)(
  withTranslation("common")(SelectRegisterForm)
);
