import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { withTranslation } from "react-i18next";
import { Column, Button, Typography } from "../../common/base-components";
import { ErrorOutline } from "@material-ui/icons";

const styleSheet = theme => ({
  formWrapper: {
    width: "100%",
    paddingTop: 45,
    paddingBottom: 75
  },

  failedIcon: {
    fontSize: 40,
    color: theme.colors.primary.errorRed
  },

  fixedWidthButton: {
    width: 220
  },

  dividerPadding: {
    marginTop: 80
  }
});

class VerifyEmailFailedForm extends PureComponent {
  handleRegister = () => {
    this.props.navigate("register");
  };

  render() {
    const { classes, t } = this.props;

    return (
      <form noValidate autoComplete="off" className={classes.formWrapper}>
        <Column fullWidth>
          <ErrorOutline className={classes.failedIcon} />
          <Typography fontSizeM fontWeightBold textSecondary paddingTop>
            {t("verificationFailed")}
          </Typography>
          <Typography fontSizeS textMediumGrey paddingTop>
            {t("emailVerificationFailedMsg")}
          </Typography>
          <Column paddingTopDouble fullWidth>
            <Button
              variant="contained"
              size="medium"
              className={classes.fixedWidthButton}
              onClick={this.handleRegister}
            >
              <Typography fontSizeS fontWeightBold>
                {t("register")}
              </Typography>
            </Button>
          </Column>
        </Column>
      </form>
    );
  }
}

VerifyEmailFailedForm.propTypes = {
  classes: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
  navigate: PropTypes.func
};

export default withStyles(styleSheet)(
  withTranslation("common")(VerifyEmailFailedForm)
);
