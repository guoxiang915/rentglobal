import React, { PureComponent } from "react";
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
  TwitterShareButton,
  FacebookShareButton,
  LinkedinShareButton,
} from "react-share";
import copyToClipboard from "clipboard-copy";
import {
  Button,
  Typography,
  Row,
  Box,
  Stretch,
  Column,
  TextField,
  Tooltip,
  TooltipContent,
} from "../../../common/base-components";
import { OfficeItem } from "../../../common/base-layouts";
import {
  CloseIcon,
  TwitterBorderIcon,
  FacebookBorderIcon,
  LinkedinBorderIcon,
  ShareIcon,
  GoogleIcon,
  YahooIcon,
  LinkIcon,
  CopyIcon,
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

  socialButton: {
    display: 'flex',
    width: 39,
    height: 39,
    borderRadius: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid #e8e8e8',
    padding: 7,
    color: '#b9b9b9',

    "&:hover": {
      color: '#d7df23',
      border: '1px solid #d7df23',
    }
  },

  linkInput: {
    fontSize: 15,
    color: theme.colors.primary.grey,
  },

  copyButton: {
    borderRadius: 20,
    border: `1px solid ${theme.colors.primary.mainColor}`,
    color: theme.colors.primary.white,
    background: theme.colors.primary.mainColor,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    height: 40,
    marginRight: -8,
    cursor: 'pointer',
  },

  footer: {
    width: "100%",
    padding: "32px 40px 37px",
    borderTop: `1px solid ${theme.colors.primary.borderGrey}`,
  },
});

class ShareOfficeDialog extends PureComponent {
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

  state = {
    isCopied: false,
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

  /** Copy link */
  handleCopy = (text) => {
    copyToClipboard(text);

    this.setState({ isCopied: true });

    setTimeout(() => {
      this.setState({ isCopied: false });
    }, 2000);
  }

  /** Render function */
  render() {
    const { title, office, className, width, classes: s, t } = this.props;
    const { isCopied } = this.state;

    return (
      <Dialog
        open
        onClose={this.handleClose}
        aria-labelledby='help-dialog-title'
        classes={{ paper: clsx(s.root, className) }}
      >
        {/** dialog title */}
        <DialogTitle id='help-dialog-title' className={s.header}>
          <Row fullWidth>
            {/** header title */}
            <Typography fontSizeM textSecondary fontWeightBold>
              {title || t("share")}
            </Typography>
            <Stretch />
            {/** close button */}
            <Button
              link='errorRed'
              background='secondaryLight'
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
          <OfficeItem
            office={office}
            horizontal={!isWidthDown("xs", width)}
            fullWidth
          />
        </DialogContent>

        {/** dialog footer */}
        <DialogActions className={s.footer}>
          <Column fullWidth>
            <Row fullWidth>
              <TextField
                variant="outlined"
                value={`${window.location.protocol}//${window.location.host}/offices/${office.refId}/${office.location.country}/${t(office.officeType)}/${office.numberOfEmployees} ${t("employees")}/${office.refId}-${office.title}`.replace(/\s+/g, "-")}
                classes={{ input: s.linkInput }}
                fullWidth
                startAdornment={<LinkIcon className={s.outlineIcon} />}
                endAdornment={
                  <Tooltip
                    placement={
                      isWidthDown('xs', width) ? 'left' : 'bottom'
                    }
                    borderType="primary"
                    title={
                      <TooltipContent
                        title={
                          <Column>
                            <Typography textSecondary>
                              {isCopied ? t('copied') : t('copy')}
                            </Typography>
                          </Column>
                        }
                      />
                    }
                    interactive
                  >
                    <Button
                      variant="primary"
                      onClick={() => this.handleCopy(`${window.location.protocol}//${window.location.host}/offices/${office.refId}/${office.location.country}/${t(office.officeType)}/${office.numberOfEmployees} ${t("employees")}/${office.refId}-${office.title}`.replace(/\s+/g, "-"))}
                      className={s.copyButton}
                    >
                      <CopyIcon style={{ width: 24, height: 24 }} />
                    </Button>
                  </Tooltip>
                }
                readOnly
              />
            </Row>
            <Row fullWidth justifyChildrenCenter paddingTop>
              <TwitterShareButton
                url={`${window.location.protocol}//${window.location.host}/offices/${office.refId}/${office.location.country}/${t(office.officeType)}/${office.numberOfEmployees} ${t("employees")}/${office.refId}-${office.title}`.replace(/\s+/g, "-")}
              >
                <span className={s.socialButton}>
                  <TwitterBorderIcon style={{ width: 17, height: 14 }} />
                </span>
              </TwitterShareButton>
              <Box paddingLeftHalf />
              <FacebookShareButton
                url={`${window.location.protocol}//${window.location.host}/offices/${office.refId}/${office.location.country}/${t(office.officeType)}/${office.numberOfEmployees} ${t("employees")}/${office.refId}-${office.title}`.replace(/\s+/g, "-")}
              >
                <span className={s.socialButton}>
                  <FacebookBorderIcon style={{ width: 10, height: 17 }} />
                </span>
              </FacebookShareButton>
              <Box paddingLeftHalf />
              <LinkedinShareButton
                url={`${window.location.protocol}//${window.location.host}/offices/${office.refId}/${office.location.country}/${t(office.officeType)}/${office.numberOfEmployees} ${t("employees")}/${office.refId}-${office.title}`.replace(/\s+/g, "-")}
              >
                <span className={s.socialButton}>
                  <LinkedinBorderIcon style={{ width: 15, height: 17 }} />
                </span>
              </LinkedinShareButton>
              <Box paddingLeftHalf />
              <a
                variant='icon'
                className={s.socialButton}
                href={`https://mail.google.com/mail/?view=cm&su=RentGlobal Office Share&body=${`${window.location.protocol}//${window.location.host}/offices/${office.refId}/${office.location.country}/${t(office.officeType)}/${office.numberOfEmployees} ${t("employees")}/${office.refId}-${office.title}`.replace(/\s+/g, "-")}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <GoogleIcon style={{ width: 15, height: 15 }} />
              </a>
              <Box paddingLeftHalf />
              <a
                variant='icon'
                className={s.socialButton}
                href={`http://compose.mail.yahoo.com/?subj=RentGlobal Office Share&body=${`${window.location.protocol}//${window.location.host}/offices/${office.refId}/${office.location.country}/${t(office.officeType)}/${office.numberOfEmployees} ${t("employees")}/${office.refId}-${office.title}`.replace(/\s+/g, "-")}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <YahooIcon style={{ width: 17, height: 17 }} />
              </a>
              <Box paddingLeftHalf />
              <a
                variant='icon'
                href={`mailto:?subject=RentGlobal Office Share&body=${`${window.location.protocol}//${window.location.host}/offices/${office.refId}/${office.location.country}/${t(office.officeType)}/${office.numberOfEmployees} ${t("employees")}/${office.refId}-${office.title}`.replace(/\s+/g, "-")}`}
                className={s.socialButton}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ShareIcon style={{ width: 19, height: 16 }} />
              </a>
            </Row>
          </Column>
        </DialogActions>
      </Dialog>
    );
  }
}

export default withStyles(styleSheet, { name: "ShareOfficeDialog" })(
  withTranslation("common")(withWidth()(ShareOfficeDialog))
);
