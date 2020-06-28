import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  withStyles,
  DialogActions,
  Grid,
} from '@material-ui/core';
import clsx from 'clsx';
import { withTranslation } from 'react-i18next';
import withWidth, { isWidthDown } from '@material-ui/core/withWidth';
import {
  Button,
  Typography,
  Row,
  Stretch,
  Column,
  BackIcon,
} from '../../../common/base-components';

const styleSheet = (theme) => ({
  root: {
    maxWidth: 571,
    maxHeight: "auto",
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
    padding: '75px 84px',

    [theme.breakpoints.down('xs')]: {
      padding: '122px 40px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
  },

  outlineIcon: {
    color: theme.colors.primary.borderGrey,
  },

  footer: {
    width: '100%',
    padding: "12px 40px",
    borderTop: `1px solid ${theme.colors.primary.borderGrey}`,
  },

  footerPanel: {
    justifyContent: "center",
  },
});

class VisitRequestSentDialog extends PureComponent {
  static propTypes = {
    /** Title of dialog */
    title: PropTypes.string,
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

  /** Render function */
  render() {
    const {
      title, className, width, classes: s, t,
    } = this.props;

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
                <BackIcon style={{ width: 10, height: 10 }} />
                <Typography paddingLeft>{t('back')}</Typography>
              </Typography>
            </Button>
          </Row>
        </DialogTitle>

        {/** dialog content */}
        <DialogContent className={s.content}>
          <Column fullWidth>
            <Row><Typography bold fontSizeM textCenter>{t("visitRequestsSent")}</Typography></Row>
            <Row paddingTop><Typography fontSizeS textCenter>{t("newVisitRequestHasBeenPlaced")}</Typography></Row>
            <Row paddingTop={!isWidthDown("xs", width)} paddingTopTwoDouble={isWidthDown("xs", width)}>
              <Button
                variant='primary'
                onClick={this.handleClose}
                className={s.applyButton}
              >{t("backToRequests")}</Button>
            </Row>
          </Column>
        </DialogContent>

        {/** dialog footer */}
        {!isWidthDown("xs", width) && (
          <DialogActions className={s.footer}>
            <Grid
              container
              direction='row'
              justify='space-between'
              alignItems='center'
              className={s.footerPanel}
            >
              <Stretch />
              <Button
                variant='primary'
                onClick={this.handleClose}
                className={s.applyButton}
              >
                <Typography fontSizeS alignChildrenCenter>
                  <BackIcon style={{ width: 10, height: 10 }} />
                  <Typography paddingLeft>{t("back")}</Typography>
                </Typography>
              </Button>
            </Grid>
          </DialogActions>
        )}
      </Dialog>
    );
  }
}

export default withStyles(styleSheet, { name: 'VisitRequestSentDialog' })(
  withTranslation('common')(withWidth()(VisitRequestSentDialog)),
);
