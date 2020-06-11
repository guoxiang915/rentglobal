import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  withStyles,
} from '@material-ui/core';
import clsx from 'clsx';
import { withTranslation } from 'react-i18next';
import withWidth from '@material-ui/core/withWidth';
import {
  Button,
  Typography,
  Row,
  Stretch,
  Column,
} from '../../../common/base-components';
import {
  CloseIcon,
} from '../../../common/base-components/Icons';



const styleSheet = (theme) => ({
  root: {
    maxWidth: 570,
    maxHeight: 512,
    padding: 0,
    minWidth: 565,
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
    padding: '24px 42px 45px',
    [theme.breakpoints.down('sm')]: {
      padding: '20px 24px 35px',
    },
  },

  backButton: {
    marginTop: 24,
  },

  footer: {
    width: '100%',
    padding: '12px 40px',
    borderTop: `1px solid ${theme.colors.primary.borderGrey}`,
  },
});

class VisitRequestAcceptedDialog extends PureComponent {
  static propTypes = {
    /** Title of dialog */
    title: PropTypes.string,
    /** Style of dialog */
    className: PropTypes.string,
    /** Boolean for dialog is opened/closed */
    open: PropTypes.bool,
    /** Event handler for closing dialog */
    onClose: PropTypes.func,
    /** Event handler for back */
    onBack: PropTypes.func,
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

  handleBack = () => {
    if (this.props.onBack) {
      this.props.onBack();
    }
  }

  /** Render function */
  render() {
    const {
      title, className, classes: s, t,
    } = this.props;

    return (
      <Dialog
        open
        onClose={this.handleClose}
        aria-labelledby="visit-request-accepted-dialog-title"
        classes={{ paper: clsx(s.root, className) }}
      >
        {/** dialog title */}
        <DialogTitle id="visit-request-accepted-dialog" className={s.header}>
          <Row fullWidth>
            {/** header title */}
            <Typography fontSizeM textSecondary fontWeightBold>
              {title || t('request')}
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
          <Column>
            <Typography fontSizeM fontWeightBold textSecondary>
              {t('visitRequestAcceptedTitle')}
            </Typography>
            <Typography fontSizeS textMediumGrey textCenter paddingTop>
              {t('visitRequestAcceptedSubtitle')}
            </Typography>
            <Button onClick={this.handleBack} classes={{ root: s.backButton }}>
              <Typography fontSizeS alignChildrenCenter>{t('backToRequests')}</Typography>
            </Button>
          </Column>
        </DialogContent>

        {/** dialog footer */}
        <DialogActions className={s.footer}>
          <Row fullWidth>
            {/** close button */}
            <Stretch />
            <Button
              link="errorRed"
              background="secondaryLight"
              onClick={this.handleClose}
            >
              <Typography fontSizeS alignChildrenCenter>
                <CloseIcon style={{ width: 10, height: 10 }} />
                <Typography paddingLeft>{t('cancel')}</Typography>
              </Typography>
            </Button>
          </Row>
        </DialogActions>
      </Dialog>
    );
  }
}

export default withStyles(styleSheet, { name: 'VisitRequestAcceptedDialog' })(
  withTranslation('common')(withWidth()(VisitRequestAcceptedDialog)),
);
