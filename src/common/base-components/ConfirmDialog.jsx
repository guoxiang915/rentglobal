import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  withStyles
} from "@material-ui/core";
import clsx from "clsx";
import { withTranslation } from "react-i18next";
import withWidth, { isWidthDown } from "@material-ui/core/withWidth";
import { Button, Typography, Row, Stretch } from ".";
import { CheckIcon, DeleteIcon, CloseIcon } from "./Icons";

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
    padding: "55px 40px",
    [theme.breakpoints.down("xs")]: {
      padding: "40px 40px 30px 40px"
    }
  },

  footer: {
    padding: "0px 40px 27px 40px",
    [theme.breakpoints.down("xs")]: {
      padding: "0px 40px 45px 40px"
    }
  }
});

export const ConfirmDialog = withStyles(styleSheet, { name: "ConfirmDialog" })(
  withWidth()(
    class ConfirmDialog extends Component {
      static propTypes = {
        variant: PropTypes.string,
        open: PropTypes.bool,
        text: PropTypes.string.isRequired,
        confirmLabel: PropTypes.string,
        closeLabel: PropTypes.string,
        onConfirm: PropTypes.func,
        onClose: PropTypes.func
      };

      static defaultProps = {
        open: true,
        variant: "primary",
        confirmLabel: "OK",
        closeLabel: "Cancel"
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
        }
      };

      handleClose = () => {
        if (this.props.onClose) {
          this.props.onClose();
        }
      };

      render() {
        const {
          variant,
          open,
          className,
          text,
          confirmLabel,
          closeLabel,
          classes: s,
          width
        } = this.props;

        return (
          <Dialog
            open={open}
            onClose={this.handleClose}
            aria-labelledby="confirm-dialog-title"
            aria-describedby="confirm-dialog-description"
            classes={{ paper: clsx(s.root, className) }}
          >
            <DialogTitle
              id="confirm-dialog-title"
              className={clsx(s.header, variant && s[`${variant}`])}
            />
            <DialogContent className={s.contentWrapper}>
              <DialogContentText id="confirm-dialog-description">
                <Typography
                  fontSizeM={!isWidthDown("xs", width)}
                  fontSizeS={isWidthDown("xs", width)}
                  textSecondary
                  fontWeightBold
                  justifyChildrenCenter
                  textCenter
                >
                  {text}
                </Typography>
              </DialogContentText>
            </DialogContent>
            <DialogActions className={s.footer}>
              <Row fullWidth>
                <Button
                  link="errorRed"
                  background="secondaryLight"
                  onClick={this.handleClose}
                >
                  <Typography fontSizeS alignChildrenCenter>
                    {closeLabel}
                  </Typography>
                </Button>
                <Stretch />
                <Button
                  onClick={this.handleConfirm}
                  autoFocus
                  {...this.buttonStyles[variant]}
                >
                  <Typography fontSizeS alignChildrenCenter>
                    {confirmLabel}
                  </Typography>
                </Button>
              </Row>
            </DialogActions>
          </Dialog>
        );
      }
    }
  )
);

export const DeleteConfirmDialog = withTranslation(({ t, ...props }) => (
  <ConfirmDialog
    variant="error"
    closeLabel={
      <>
        <CloseIcon style={{ width: 10, height: 10 }} />
        <Typography paddingLeft>{t("cancel")}</Typography>
      </>
    }
    confirmLabel={
      <>
        <DeleteIcon style={{ width: 13, height: 12 }} />
        <Typography paddingLeft>{t("delete")}</Typography>
      </>
    }
    {...props}
  />
));

export const PrimaryConfirmDialog = withTranslation(({ t, ...props }) => (
  <ConfirmDialog
    variant="primary"
    closeLabel={
      <>
        <CloseIcon style={{ width: 10, height: 10 }} />
        <Typography paddingLeft>{t("cancel")}</Typography>
      </>
    }
    confirmLabel={
      <>
        <CheckIcon style={{ width: 15, height: 12 }} />
        <Typography paddingLeft>{t("ok")}</Typography>
      </>
    }
    {...props}
  />
));
