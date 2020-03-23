import React, { Component } from "react";
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
import withWidth from "@material-ui/core/withWidth";
import {
  Button,
  Typography,
  Row,
  Box,
  Stretch,
  Column
} from "../../../common/base-components";
import {
  CloseIcon,
  EmailIcon,
  PhoneIcon
} from "../../../common/base-components/Icons";

const styleSheet = theme => ({
  root: {
    maxWidth: 1056,
    maxHeight: 512,
    padding: 0,
    minWidth: 565,
    minHeight: 395,
    borderRadius: 8
  },

  header: {
    width: "100%",
    padding: "12px 40px",
    borderBottom: `1px solid ${theme.colors.primary.borderGrey}`
  },

  content: {
    padding: "82px 120px"
  },

  icon: {
    color: theme.colors.primary.borderGrey
  },

  footer: {
    width: "100%",
    padding: "12px 40px",
    borderTop: `1px solid ${theme.colors.primary.borderGrey}`
  }
});

class ContactInfoDialog extends Component {
  static propTypes = {
    contact: PropTypes.object,
    className: PropTypes.string,
    open: PropTypes.bool,
    onClose: PropTypes.func
  };

  handleClose = () => {
    if (this.props.onClose) {
      this.props.onClose();
    }
  };

  render() {
    const { contact, className, classes: s, t } = this.props;

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
              {t("contactInfo")}
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
          <Column alignChildrenStart>
            <Typography
              fontSizeM
              fontWeightBold
              textSecondary
              style={{ paddingLeft: 42 }}
            >
              {contact.username}
            </Typography>
            <Typography
              fontSizeS
              textPrimary
              paddingTopHalf
              style={{ paddingLeft: 42 }}
            >
              {t(contact.type)}
            </Typography>
            <Box paddingTopHalf alignChildrenCenter>
              <PhoneIcon className={s.icon} style={{ width: 18, height: 18 }} />
              <Typography fontSizeS textSecondary style={{ paddingLeft: 24 }}>
                {contact.phoneNumber}
              </Typography>
            </Box>
            <Box paddingTopHalf alignChildrenCenter>
              <EmailIcon className={s.icon} style={{ width: 16, height: 14 }} />
              <Typography fontSizeS textSecondary style={{ paddingLeft: 24 }}>
                {contact.email}
              </Typography>
            </Box>
          </Column>
        </DialogContent>

        {/** dialog footer */}
        <DialogActions className={s.footer}>
          {/** close button */}
          <Row fullWidth>
            <Stretch />
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
        </DialogActions>
      </Dialog>
    );
  }
}

export default withStyles(styleSheet, { name: "ContactInfoDialog" })(
  withTranslation("common")(withWidth()(ContactInfoDialog))
);
