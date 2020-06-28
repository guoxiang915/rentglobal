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
  Box,
  Stretch,
  Column,
  BackIcon,
} from '../../../common/base-components';
import {
  CloseIcon,
} from '../../../common/base-components/Icons';
import { formatHrMin } from '../../../utils/formatters';

const styleSheet = (theme) => ({
  root: {
    maxWidth: 1056,
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

    [theme.breakpoints.down('xs')]: {
      paddingLeft: 24,
      paddingRight: 24,
    },
  },

  content: {
    padding: "20px 24px",

    [theme.breakpoints.down('xs')]: {
      paddingBottom: 0,
      padding: "6px 18px",
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
  },

  visitRequest: {
    paddingTop: 20,
    paddingBottom: 20,
    borderBottom: `1px solid ${theme.colors.primary.borderGrey}`,

    '&:last-of-type': {
      borderBottom: "none",
    },

    [theme.breakpoints.down('xs')]: {
      paddingTop: 12,
      paddingBottom: 12,
      flexDirection: "column",
    }
  },

  officeImage: {
    width: 70,
    height: 53,
    borderRadius: 8,
    overflow: "hidden",
  },

  outlineIcon: {
    color: theme.colors.primary.borderGrey,
  },

  footer: {
    width: '100%',
    padding: "12px 40px",
    borderTop: `1px solid ${theme.colors.primary.borderGrey}`,

    [theme.breakpoints.down('xs')]: {
      paddingTop: 0,
      borderTop: "none",
    },
  },

  footerPanel: {
    [theme.breakpoints.down('xs')]: {
      justifyContent: "center",
    },
  },
});

class VisitRequestDialog extends PureComponent {
  static propTypes = {
    /** Title of dialog */
    title: PropTypes.string,
    /** Office info */
    offices: PropTypes.object,
    /** Visit hours */
    visitRequests: PropTypes.array,
    /** Style of dialog */
    className: PropTypes.string,
    /** Boolean for dialog is opened/closed */
    open: PropTypes.bool,
    /** Event handler for closing dialog */
    onClose: PropTypes.func,
    /** Event handler for closing dialog */
    onSave: PropTypes.func,
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

  handleSendVisitRequests = () => {
    this.props.onSave();
  };

  /** Render function */
  render() {
    const {
      title, offices = [], visitRequests = [], className, width, classes: s, t,
    } = this.props;

    const visitRequestsGrouped = visitRequests.reduce((requests, currentValue) => {
      (requests[currentValue["officeIndex"]] = requests[currentValue["officeIndex"]] || []).push(currentValue);

      return requests;
    }, {});

    const visitRequestsArray = Object.values(visitRequestsGrouped);

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
              {title || t('visitingRequest')}
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
          <Column fullWidth>
            {visitRequestsArray.map((officeVisitRequests, index) => (
              <React.Fragment key={index}>
                {officeVisitRequests.map((visitRequest, requestIndex) => (
                  <Row key={requestIndex} fullWidth classes={{ box: s.visitRequest }}>
                    <Box fullWidth row>
                      <Box>
                        <img className={s.officeImage} src={offices[visitRequest.officeIndex]?.coverPhotos[0]?.mobile?.bucketPath} />
                      </Box>
                      <Box paddingLeftHalf>
                        <Column alignChildrenStart>
                          <Row>
                            <Typography fontSizeXS bold>{offices[visitRequest.officeIndex]?.title}</Typography>
                          </Row>
                          <Row>
                            <Typography fontSizeXS>{t(offices[visitRequest.officeIndex]?.officeType)}</Typography>
                          </Row>
                          <Row>
                            <Typography fontSizeXS textPrimary>{t('dollarPerMonth', { dollar: offices[visitRequest.officeIndex]?.priceMonthly || 0 })}</Typography>
                          </Row>
                        </Column>
                      </Box>
                      {!isWidthDown("xs", width) &&
                        <React.Fragment>
                          <Stretch />
                          <Box>
                            <Column alignChildrenStart>
                              <Row><Typography fontSizeXS>{t(visitRequest["day"])}</Typography></Row>
                              <Row>
                                <Typography textMediumGrey>{formatHrMin(new Date(0, 0, 0, visitRequest.visitHour.start, (visitRequest.visitHour.start % 1) * 60))} - {formatHrMin(new Date(0, 0, 0, visitRequest.visitHour.end, (visitRequest.visitHour.end % 1) * 60))}</Typography>
                              </Row>
                            </Column>
                          </Box>
                        </React.Fragment>
                      }
                    </Box>
                    {isWidthDown("xs", width) && (
                      <Box fullWidth row paddingTop>
                        <Box><Typography fontSizeXXS>{t(visitRequest["day"])}</Typography></Box>
                        <Stretch />
                        <Box><Typography fontSizeXXS textMediumGrey>{formatHrMin(new Date(0, 0, 0, visitRequest.visitHour.start, (visitRequest.visitHour.start % 1) * 60))} - {formatHrMin(new Date(0, 0, 0, visitRequest.visitHour.end, (visitRequest.visitHour.end % 1) * 60))}</Typography></Box>
                      </Box>
                    )}
                  </Row>
                ))}
              </React.Fragment>
            ))}
          </Column>
        </DialogContent>

        {/** dialog footer */}
        <DialogActions className={s.footer}>
          <Grid
            container
            direction='row'
            justify='space-between'
            alignItems='center'
            className={s.footerPanel}
          >
            {!isWidthDown("xs", width) && (
              <React.Fragment>
                <Button
                  link="errorRed"
                  background="secondaryLight"
                  onClick={this.handleClose}
                >
                  <Typography fontSizeS alignChildrenCenter>
                    <BackIcon style={{ width: 10, height: 10 }} />
                    <Typography paddingLeft>{t("back")}</Typography>
                  </Typography>
                </Button>
                <Stretch />
              </React.Fragment>
            )}
            <Button
              variant='primary'
              onClick={this.handleSendVisitRequests}
              className={s.applyButton}
            >
              <Typography fontSizeS alignChildrenCenter>
                <Typography paddingLeft>{t("sendRequests")}</Typography>
              </Typography>
            </Button>
          </Grid>
        </DialogActions>
      </Dialog>
    );
  }
}

export default withStyles(styleSheet, { name: 'VisitRequestDialog' })(
  withTranslation('common')(withWidth()(VisitRequestDialog)),
);
