import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  withStyles,
} from '@material-ui/core';
import clsx from 'clsx';
import { withTranslation } from 'react-i18next';
import withWidth, { isWidthDown } from '@material-ui/core/withWidth';
import copyToClipboard from 'clipboard-copy';
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
} from '../../../common/base-components';
import {
  CloseIcon,
  PhoneIcon,
  CopyIcon,
  SkypeIcon,
} from '../../../common/base-components/Icons';

const styleSheet = (theme) => ({
  root: {
    maxWidth: 1056,
    maxHeight: 512,
    minWidth: 571,
    padding: 0,
    borderRadius: 8,

    [theme.breakpoints.down('sm')]: {
      minWidth: 320,
      minHeight: 'auto',
    },
  },

  header: {
    width: '100%',
    padding: '12px 40px',
    borderBottom: `1px solid ${theme.colors.primary.borderGrey}`,
  },

  content: {
    padding: '56px 48px 45px',
    [theme.breakpoints.down('xs')]: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
  },

  outlineIcon: {
    color: theme.colors.primary.borderGrey,
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

  callButton: {
    padding: 14
  },

  footer: {
    width: '100%',
    padding: '32px 40px 37px',
    borderTop: `1px solid ${theme.colors.primary.borderGrey}`,
  },
});

class CallConsultantDialog extends PureComponent {
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
    isCopied: false
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

  /** Copy phone number */
  handleCopy = (text) => {
    copyToClipboard(text);

    this.setState({ isCopied: true });

    setTimeout(() => {
      this.setState({ isCopied: false });
    }, 2000);
  }

  /** Render function */
  render() {
    const {
      title, office, className, width, classes: s, t,
    } = this.props;
    const { isCopied } = this.state;

    return (
      <Dialog
        open
        onClose={this.handleClose}
        aria-labelledby="help-dialog-title"
        classes={{ paper: clsx(s.root, className) }}
      >
        {/** dialog title */}
        <DialogTitle id="help-dialog-title" className={s.header}>
          <Row fullWidth>
            {/** header title */}
            <Typography fontSizeM textSecondary fontWeightBold>
              {title || t('call')} #{(office.refId + 1).toString().padStart(9, '0').replace(/(\d{3})/g, '$1 ').replace(/(^\s+|\s+$)/,'')}
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
                <Typography paddingLeft>{t('close')}</Typography>
              </Typography>
            </Button>
          </Row>
        </DialogTitle>

        {/** dialog content */}
        <DialogContent className={s.content}>
          <Box textLeft paddingLeftHalf>
            {/** show office title */}
            <Row>
              <Typography fontSizeM textBlackGrey fontWeightBold>
                {office.title}
              </Typography>
            </Row>
          </Box>

          <Box textLeft paddingTopHalf paddingLeftHalf>
            <Row>
              <Typography fontSizeS textPrimary>
                {office.location.fullAddress}
              </Typography>
            </Row>
          </Box>

          <Box textLeft fullWidth paddingTopDouble>
            <Row fullWidth>
              <TextField
                variant="outlined"
                value={'123 456 7890'}
                className={s.profileInput}
                fullWidth
                startAdornment={<PhoneIcon className={s.outlineIcon} />}
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
                      onClick={() => this.handleCopy('123 456 7890')}
                      className={s.copyButton}
                    >
                      <CopyIcon style={{ width: 24, height: 24 }} />
                    </Button>
                  </Tooltip>
                }
                readOnly
              />
            </Row>
          </Box>

          <Box fullWidth paddingTop>
            <Button
              variant="primary"
              onClick={this.handleFollowUp}
              shadow
              fullWidth
              className={s.callButton}
            >
              <SkypeIcon style={{ width: 24, height: 24 }} />
              <Typography paddingLeftHalf fontSizeM fontWeightBold>
                {t('callViaSkype')}
              </Typography>
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    );
  }
}

export default withStyles(styleSheet, { name: 'CallConsultantDialog' })(
  withTranslation('common')(withWidth()(CallConsultantDialog)),
);
