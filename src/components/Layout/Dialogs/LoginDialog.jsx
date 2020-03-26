import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  // DialogActions,
  withStyles
} from "@material-ui/core";
import clsx from "clsx";
import { withTranslation } from "react-i18next";
import withWidth from "@material-ui/core/withWidth";
import { Typography, Row } from "../../../common/base-components";
import LoginForm from "../../Auth/LoginForm";

const styleSheet = theme => ({
  root: {
    maxWidth: 1024,
    maxHeight: 600,
    padding: 0,
    minWidth: 400,
    minHeight: 400,
    borderRadius: 8
  },

  header: {
    width: "100%",
    padding: 16,
    borderBottom: `1px solid ${theme.colors.primary.borderGrey}`
  },

  content: {
    padding: "16px 20px"
  }
});

class LoginDialog extends Component {
  static propTypes = {
    /** Auth state */
    auth: PropTypes.object,
    /** Login function */
    mappedLogin: PropTypes.func,
    /** Style for dialog */
    className: PropTypes.string,
    /** Flag for opened/closed dialog */
    open: PropTypes.bool,
    /** Event handler for closing dialog */
    onClose: PropTypes.func
  };

  /**
   * Event handler for login
   */
  handleLogin = payload => {
    this.props.mappedLogin(payload, this.props.history);
    this.handleClose();
  };

  /**
   * Event handler for closing dialog
   * @description Call props.onClose()
   */
  handleClose = () => {
    if (this.props.onClose) {
      this.props.onClose();
    }
  };

  /** Render function */
  render() {
    const { className, classes: s, t } = this.props;
    const { error, isLoading } = this.props.auth;

    return (
      <Dialog
        open={true}
        onClose={this.handleClose}
        aria-labelledby="help-dialog-title"
        classes={{ paper: clsx(s.root, className) }}
      >
        {/** dialog title */}
        <DialogTitle id="help-dialog-title" className={s.header}>
          <Row fullWidth justifyChildrenCenter>
            {/** header title */}
            <Typography fontSizeM textSecondary fontWeightBold>
              {t("loginToRENTGLOBAL")}
            </Typography>
          </Row>
        </DialogTitle>

        {/** dialog content */}
        <DialogContent className={s.content}>
          <LoginForm
            noTitle
            mappedLogin={this.handleLogin}
            error={error}
            isLoading={isLoading}
          />
        </DialogContent>

        {/** dialog footer */}
        {/* <DialogActions className={s.footer}>
        </DialogActions> */}
      </Dialog>
    );
  }
}

export default withStyles(styleSheet, { name: "LoginDialog" })(
  withTranslation("common")(withWidth()(LoginDialog))
);
