import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Typography, Grid } from "@material-ui/core";
import { withTranslation } from "react-i18next";
import { Button, Row, Box, Column, Link } from "../../common/base-components";
import {
  Business as LandlordIcon,
  PeopleOutline as CompanyIcon,
  ArrowForward
} from "@material-ui/icons";

const styleSheet = theme => ({
  formWrapper: {
    width: "100%",
    marginTop: 54,
    maxWidth: 1024
  },

  selectorWrapper: {
    maxWidth: 340,
    [theme.breakpoints.down("sm")]: {
      alignItems: "center"
    }
  },

  formTitle: {
    color: theme.colors.primary.darkGrey,
    fontSize: "26px",
    lineHeight: "34px",
    textAlign: "left",
    [theme.breakpoints.down("sm")]: {
      fontSize: "20px",
      textAlign: "center"
    }
  },

  formSubtitle: {
    color: theme.colors.primary.darkGrey,
    fontSize: "20px",
    lineHeight: "26px",
    textAlign: "left",
    [theme.breakpoints.down("sm")]: {
      fontSize: "16px",
      textAlign: "center"
    }
  },

  signupButton: {
    marginTop: theme.spacing(7),
    [theme.breakpoints.down("sm")]: {
      marginTop: theme.spacing(4)
    }
  },

  switchText: {
    fontSize: "14px"
  },

  switchTextWrapper: {
    paddingTop: 40
  }
});

class SelectRegisterForm extends Component {
  handleSelectRegister = registerMode => () => {
    if (registerMode) {
      this.props.navigate(`register/${registerMode}`);
    }
  };

  render() {
    const { classes, t } = this.props;

    return (
      <Column fullWidth>
        <Grid container className={classes.formWrapper}>
          <Grid item xs={12} sm={6}>
            <Column fullWidth padding>
              <Column
                alignChildrenStart
                classes={{ box: classes.selectorWrapper }}
              >
                <LandlordIcon color="secondary" fontSize="large" />
                <Box paddingTopHalf>
                  <Typography className={classes.formTitle}>
                    {t("amLandlord")}
                  </Typography>
                </Box>
                <Box paddingTopHalf>
                  <Typography className={classes.formSubtitle}>
                    {t("iHavePlaceToRent")}
                  </Typography>
                </Box>
                <Button
                  className={classes.signupButton}
                  onClick={this.handleSelectRegister("landlord")}
                >
                  {t("landlordSignup")}
                  <Box paddingLeft>
                    <ArrowForward fontSize="small" />
                  </Box>
                </Button>
              </Column>
            </Column>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Column fullWidth padding>
              <Column
                alignChildrenStart
                classes={{ box: classes.selectorWrapper }}
              >
                <CompanyIcon color="secondary" fontSize="large" />
                <Box paddingTopHalf>
                  <Typography className={classes.formTitle}>
                    {t("needOffice")}
                  </Typography>
                </Box>
                <Box paddingTopHalf>
                  <Typography className={classes.formSubtitle}>
                    {t("iLookForOffice")}
                  </Typography>
                </Box>
                <Button
                  className={classes.signupButton}
                  onClick={this.handleSelectRegister("company")}
                >
                  {t("companySignup")}
                  <Box paddingLeft>
                    <ArrowForward fontSize="small" />
                  </Box>
                </Button>
              </Column>
            </Column>
          </Grid>
        </Grid>
        <Row fullWidth classes={{ box: classes.switchTextWrapper }}>
          <Column fullWidth>
            <Typography color="secondary" className={classes.switchText}>
              {t("alreadyHaveAccount")}
              <Link to="/auth/login" variant="primary">
                &nbsp;{t("login")}
              </Link>
            </Typography>
          </Column>
        </Row>
      </Column>
    );
  }
}

SelectRegisterForm.propTypes = {
  classes: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
  navigate: PropTypes.func
};

export default withStyles(styleSheet)(
  withTranslation("common")(SelectRegisterForm)
);
