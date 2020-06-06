import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  withStyles
} from "@material-ui/core";
import clsx from "clsx";
import { withTranslation } from "react-i18next";
import withWidth, { isWidthDown } from "@material-ui/core/withWidth";
import {
  Button,
  Typography,
  Column,
  Row,
  Stretch,
  Checkbox
} from "../../../common/base-components";
import { DeleteIcon, CloseIcon } from "../../../common/base-components/Icons";

const styleSheet = theme => ({
  root: {
    maxWidth: 535,
    padding: 0,
    width: "90%",
    borderRadius: 8
  },

  primary: {
    background: theme.colors.primary.mainColor
  },
  error: {
    background: theme.colors.primary.errorRed
  },

  header: {
    width: "100%",
    height: 5,
    padding: 0
  },

  contentWrapper: {
    padding: "24px 42px 45px",
    [theme.breakpoints.down("sm")]: {
      padding: "20px 24px 35px"
    }
  },

  footer: {
    padding: "0px 40px 27px 40px",
    [theme.breakpoints.down("xs")]: {
      padding: "0px 40px 45px 40px"
    }
  }
});

class DeleteAccountDialog extends PureComponent {
  static propTypes = {
    open: PropTypes.bool,
    onConfirm: PropTypes.func,
    onClose: PropTypes.func
  };

  static defaultProps = {
    open: true
  };

  state = {
    adknowledgeDelete: false
  };

  buttonStyles = {
    primary: {
      variant: "primary"
    },
    error: {
      link: "errorRedNormal",
      background: "secondaryLight"
    }
  };

  handleConfirm = () => {
    if (this.props.onConfirm) {
      this.props.onConfirm();
      this.handleClose();
    }
  };

  handleClose = () => {
    if (this.props.onClose) {
      this.props.onClose();
    }
  };

  handleAdknowledge = () => {
    this.setState({ adknowledgeDelete: !this.state.adknowledgeDelete });
  };

  render() {
    const { open, className, classes: s, width, t } = this.props;
    const variant = "error";

    return (
      <Dialog
        open={open}
        onClose={this.handleClose}
        aria-labelledby="confirm-dialog-title"
        classes={{ paper: clsx(s.root, className) }}
      >
        <DialogTitle
          id="confirm-dialog-title"
          className={clsx(s.header, variant && s[`${variant}`])}
        >
          <React.Fragment />
        </DialogTitle>
        <DialogContent className={s.contentWrapper}>
          <Column>
            <Row style={{ marginTop: 27 }}>
              <Typography
                fontSizeL={!isWidthDown("xs", width)}
                fontSizeM={isWidthDown("xs", width)}
                textSecondary
                fontWeightBold
                justifyChildrenCenter
                textCenter
              >
                {t("confirmDeleteAccount")}
              </Typography>
            </Row>
            <Row style={{ marginTop: 27 }}>
              <Typography
                fontSizeM={!isWidthDown("xs", width)}
                fontSizeS={isWidthDown("xs", width)}
                textSecondary
                fontWeightBold
                textCenter
              >
                {t("deleteImplication")}
              </Typography>
            </Row>
            <Row style={{ marginTop: 27 }}>
              <Checkbox
                label={
                  <Typography paddingLeft fontSizeM>
                    {t("adknowledgeDelete")}
                  </Typography>
                }
                isChecked={this.state.adknowledgeDelete}
                onChange={this.handleAdknowledge}
              />
            </Row>
          </Column>
        </DialogContent>
        <DialogActions className={s.footer}>
          <Row fullWidth>
            <Button
              link="errorRed"
              background="secondaryLight"
              onClick={this.handleClose}
            >
              <Typography fontSizeS alignChildrenCenter>
                <CloseIcon style={{ width: 10, height: 10 }} />
                <Typography paddingLeft>{t("cancel")}</Typography>
              </Typography>
            </Button>
            <Stretch />
            <Button
              onClick={this.handleConfirm}
              autoFocus
              disabled={!this.state.adknowledgeDelete}
              {...this.buttonStyles[variant]}
            >
              <Typography fontSizeS alignChildrenCenter>
                <DeleteIcon style={{ width: 15, height: 12 }} />
                <Typography paddingLeft>{t("deleteAccount")}</Typography>
              </Typography>
            </Button>
          </Row>
        </DialogActions>
      </Dialog>
    );
  }
}

export default withStyles(styleSheet, { name: "DeleteAccountDialog" })(
  withTranslation("common")(withWidth()(DeleteAccountDialog))
);
