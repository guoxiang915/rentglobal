import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import "./Login.css";
import { withTranslation } from "react-i18next";
import {
  TextField,
  Button,
  Box,
  Column,
  Link,
  Divider,
  Typography,
  LockIcon,
} from "../../common/base-components";

const styleSheet = (theme) => ({
  formWrapper: {
    width: "100%",
  },

  formTitle: {
    color: theme.colors.primary.darkGrey,
    lineHeight: "26px",
    fontSize: "20px",
    marginTop: 8,
    textAlign: "center",
  },

  submitButton: {
    width: 200,
  },

  moreWrapper: {
    marginTop: 20,
  },

  outlineIcon: {
    color: theme.colors.primary.borderGrey,
  },
});

class SetNewPasswordForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      passwordError: null,
      confirmPassword: "",
      confirmPasswordError: null,
      error: null,
    };
  }

  /**
   * Event handler for changing textfields
   * @param {string} name Field name to update the state
   * @returns {Function} Event handler
   */
  handleChange = (name) => (event) => {
    this.setState({
      [name]: event.target.value,
    });
  };

  /**
   * Check form validations
   */
  validateForm = () => {
    if (this.state.password === "") {
      this.setState({ passwordError: this.props.t("passwordRequired") });
      return false;
    } else if (this.state.password !== this.state.confirmPassword) {
      this.setState({
        confirmPasswordError: this.props.t("confirmPasswordDifferent"),
      });
      return false;
    }
    return true;
  };

  /**
   * Submit the login form
   */
  handleSubmit = (e) => {
    e.preventDefault();
    const validForm = this.validateForm();
    if (!validForm) {
      return;
    }
    const payload = {
      token: this.props.token,
      password: this.state.password,
    };
    if (payload.password !== "") {
      this.props.mappedResetPassword(payload);
    }
  };

  render() {
    const { classes, t } = this.props;

    return (
      <form noValidate autoComplete="off" className={classes.formWrapper}>
        <Typography
          fontSizeM
          fontWeightBold
          textSecondary
          fullWidth
          paddingTopHalf
          justifyChildrenCenter
        >
          {t("setNewPassword")}
        </Typography>
        <Box paddingTop>
          <TextField
            id="password"
            placeholder={t("password")}
            value={this.state.password}
            onChange={this.handleChange("password")}
            type="password"
            variant="outlined"
            startAdornment={<LockIcon className={classes.outlineIcon} />}
            error={!!this.state.passwordError}
            helperText={this.state.passwordError}
            fullWidth
          />
        </Box>
        <Box paddingTop>
          <TextField
            id="confirmPassword"
            placeholder={t("confirmPassword")}
            value={this.state.confirmPassword}
            onChange={this.handleChange("confirmPassword")}
            type="password"
            variant="outlined"
            startAdornment={<LockIcon className={classes.outlineIcon} />}
            error={!!this.state.confirmPasswordError}
            helperText={this.state.confirmPasswordError}
            fullWidth
          />
        </Box>
        <Box paddingTopHalf justifyChildrenEnd fullWidth paddingBottom>
          <Button
            type="submit"
            variant="contained"
            size="medium"
            className={classes.submitButton}
            disabled={!this.state.password}
            onClick={this.handleSubmit}
          >
            <Typography fontSizeS fontWeightBold>
              {t("resetPassword")}
            </Typography>
          </Button>
        </Box>
        <Column classes={{ box: classes.moreWrapper }}>
          <Divider light />
          <Box paddingTop paddingBottom>
            <Typography fontSizeS fontWeightBold>
              <Link variant="primary" to="/auth/login">
                {t("login")}
              </Link>
            </Typography>
          </Box>
        </Column>
      </form>
    );
  }
}

SetNewPasswordForm.propTypes = {
  classes: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
};

export default withStyles(styleSheet)(
  withTranslation("common")(SetNewPasswordForm)
);
