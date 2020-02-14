import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import { Trans, withTranslation } from "react-i18next";
import { Box, Column } from "../../common/base-components";
import { CheckCircleOutline } from "@material-ui/icons";

const styleSheet = theme => ({
  formWrapper: {
    width: "100%",
    paddingTop: 45,
    paddingBottom: 75
  },

  successIcon: {
    fontSize: 40
  },

  formTitle: {
    color: theme.colors.primary.darkGrey,
    lineHeight: "26px",
    fontSize: "20px",
    marginTop: 8,
    textAlign: "center"
  },

  formSubtitle: {
    color: theme.colors.primary.grey,
    lineHeight: "20px",
    fontSize: "16px",
    textAlign: "center"
  }
});

class SendVerificationForm extends Component {
  render() {
    const { email, classes, t } = this.props;

    return (
      <form noValidate autoComplete="off" className={classes.formWrapper}>
        <Column fullWidth>
          <CheckCircleOutline color="primary" className={classes.successIcon} />
          <Box paddingTop>
            <Typography className={classes.formTitle}>
              {t("verificationSent")}
            </Typography>
          </Box>
          <Box paddingTop>
            <Typography className={classes.formSubtitle}>
              <Trans i18nKey="checkEmailForVerification">
                <Typography color="primary" component="span">
                  {{ email: email }}
                </Typography>
              </Trans>
            </Typography>
          </Box>
        </Column>
      </form>
    );
  }
}

SendVerificationForm.propTypes = {
  classes: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
  mappedRegister: PropTypes.func.isRequired
};

export default withStyles(styleSheet)(
  withTranslation("common")(SendVerificationForm)
);
