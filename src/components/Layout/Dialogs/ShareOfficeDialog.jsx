import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  withStyles,
} from "@material-ui/core";
import clsx from "clsx";
import { withTranslation } from "react-i18next";
import withWidth, { isWidthDown } from "@material-ui/core/withWidth";
import {
  Button,
  Typography,
  Row,
  Box,
  Stretch,
} from "../../../common/base-components";
import { OfficeItem } from "../../../common/base-layouts";
import {
  CloseIcon,
  InstagramBorderIcon,
  TwitterBorderIcon,
  FacebookBorderIcon,
  LinkedinBorderIcon,
  NetworkIcon,
} from "../../../common/base-components/Icons";

const styleSheet = (theme) => ({
  root: {
    maxWidth: 1056,
    maxHeight: 512,
    padding: 0,
    minWidth: 565,
    minHeight: 395,
    borderRadius: 8,

    [theme.breakpoints.down("sm")]: {
      minWidth: 320,
      minHeight: "auto",
    },
  },

  header: {
    width: "100%",
    padding: "12px 40px",
    borderBottom: `1px solid ${theme.colors.primary.borderGrey}`,
  },

  content: {
    padding: "24px 40px 30px",
    [theme.breakpoints.down("xs")]: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
  },

  socialIcon: {
    width: 39,
    height: 39,
  },

  footer: {
    width: "100%",
    padding: "32px 40px 37px",
    borderTop: `1px solid ${theme.colors.primary.borderGrey}`,
  },
});

class ShareOfficeDialog extends Component {
  static propTypes = {
    /** Title of dialog */
    title: PropTypes.string,
    /** Office info */
    office: PropTypes.object,
    /** Style of dialog */
    className: PropTypes.string,
    /** Boolean for dialog is opened/closed */
    open: PropTypes.bool,
    /** Event handler for closing dialog */
    onClose: PropTypes.func,
  };

  /**
   * Event handler for closing dialog
   * @description Call props.onClose() to close dialog
   */
  handleClose = () => {
    if (this.props.onClose) {
      this.props.onClose();
    }
  };

  /** Share office via social */
  handleShareSocial = () => () => {};

  /** Render function */
  render() {
    const { title, office, className, width, classes: s, t } = this.props;

    return (
      <Dialog
        open={true}
        onClose={this.handleClose}
        aria-labelledby="help-dialog-title"
        classes={{ paper: clsx(s.root, className) }}
      >
        {/** dialog title */}
        <DialogTitle id="help-dialog-title" className={s.header}>
          <Row fullWidth>
            {/** header title */}
            <Typography fontSizeM textSecondary fontWeightBold>
              {title ? title : t("share")}
            </Typography>
            <Stretch />
            {/** close button */}
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
          </Row>
        </DialogTitle>

        {/** dialog content */}
        <DialogContent className={s.content}>
          <OfficeItem office={office} horizontal={!isWidthDown("xs", width)} />
        </DialogContent>

        {/** dialog footer */}
        <DialogActions className={s.footer}>
          <Row fullWidth justifyChildrenCenter>
            <Button
              variant="icon"
              onClick={this.handleShareSocial("twitter")}
              className={s.socialIcon}
            >
              <TwitterBorderIcon style={{ width: 17, height: 14 }} />
            </Button>
            <Box paddingLeftHalf />
            <Button
              variant="icon"
              onClick={this.handleShareSocial("facebook")}
              className={s.socialIcon}
            >
              <FacebookBorderIcon style={{ width: 10, height: 17 }} />
            </Button>
            <Box paddingLeftHalf />
            <Button
              variant="icon"
              onClick={this.handleShareSocial("instagram")}
              className={s.socialIcon}
            >
              <InstagramBorderIcon style={{ width: 17, height: 17 }} />
            </Button>
            <Box paddingLeftHalf />
            <Button
              variant="icon"
              onClick={this.handleShareSocial("linkedin")}
              className={s.socialIcon}
            >
              <LinkedinBorderIcon style={{ width: 15, height: 17 }} />
            </Button>
            <Box paddingLeftHalf />
            <Button
              variant="icon"
              onClick={this.handleShareSocial("network")}
              className={s.socialIcon}
            >
              <NetworkIcon style={{ width: 19, height: 16 }} />
            </Button>
          </Row>
        </DialogActions>
      </Dialog>
    );
  }
}

export default withStyles(styleSheet, { name: "ShareOfficeDialog" })(
  withTranslation("common")(withWidth()(ShareOfficeDialog))
);
