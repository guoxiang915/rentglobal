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
  BuildingsIcon,
} from '../../../common/base-components';
import {
  CloseIcon
} from '../../../common/base-components/Icons';

import { Storage } from '../../../utils/storage';

const storage = new Storage();

const styleSheet = (theme) => ({
  root: {
    maxWidth: 570,
    maxHeight: 512,
    padding: 0,
    minWidth: 565,
    minHeight: 395,
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

  icon: {
    color: theme.colors.primary.borderGrey,
  },

  outlineIcon: {
    color: theme.colors.primary.mainColor,
  },

  footer: {
    width: '100%',
    padding: '12px 40px',
    borderTop: `1px solid ${theme.colors.primary.borderGrey}`,
  },
});

class LandlordDialog extends PureComponent {
  static propTypes = {
    /** Style of dialog */
    className: PropTypes.string,
    /** Boolean for dialog is opened/closed */
    open: PropTypes.bool,
    /** Event handler for closing dialog */
    onClose: PropTypes.func,
  };

  state = {
    hideGuidance: false,
  };

  componentDidMount() {
    const { role } = this.props;
    const hideGuidance = role && storage.getBoolean(`${role}HideGuide`);
    this.setState({ hideGuidance });
  }

  /**
   * Event handler for closing dialog
   * @description Call props.onClose() to close dialog
   */
  handleClose = () => {
    if (this.props.onClose) {
      this.props.onClose();
    }
  };
  
  handleEnter = () => {
    if (this.props.onEnter) {
      this.props.onEnter();
    }
  };

  /** Render function */
  render() {
    const {
        className, classes: s, t,
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
              {t('placeToRent')}
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
                Thank you for choosing us
            </Typography>
            <Typography fontSizeS textMediumGrey textCenter paddingTop>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut …
            </Typography>
            <Row style={{ marginTop: 27 }}>
                <BuildingsIcon fontSize="large" className={s.outlineIcon}/>
            </Row>
            <Row style={{ marginTop: 10 }}>
                <Typography fontSizeL textPrimary fontWeightBold>
                    Landlord panel
                </Typography>
            </Row>
            <Row style={{ marginTop: 10 }}>
                <Button
                    variant="primary"
                    fullWidth
                    style={{
                        width: 200
                    }}
                    onClick={this.handleEnter}
                >
                    <Typography fontSizeS>
                        Enter
                    </Typography>
                </Button>
            </Row>
          </Column>
        </DialogContent>

        {/** dialog footer */}
        <DialogActions className={s.footer}>
          <Row fullWidth>
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
        </DialogActions>
      </Dialog>
    );
  }
}

export default withStyles(styleSheet, { name: 'LandlordDialog' })(
  withTranslation('common')(withWidth()(LandlordDialog)),
);
