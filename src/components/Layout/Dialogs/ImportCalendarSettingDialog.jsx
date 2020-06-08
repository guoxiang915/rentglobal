import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  withStyles,
} from '@material-ui/core';
import clsx from 'clsx';
import { withTranslation } from 'react-i18next';
import withWidth from '@material-ui/core/withWidth';
import {
  Button,
  Typography,
  Row,
  Box,
  Stretch,
  Column,
  VideoPlayer,
} from '../../../common/base-components';
import { CloseIcon } from '../../../common/base-components/Icons';

const styleSheet = (theme) => ({
  root: {
    maxWidth: 1056,
    maxHeight: 512,
    padding: 0,
    width: '80%',
    height: '80%',
    borderRadius: 8,
    borderTop: `8px solid ${theme.colors.primary.mainColor}`,

    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },

  header: {
    width: '100%',
    padding: '12px 40px',
  },
});

class ImportCalendarSettingDialog extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    open: PropTypes.bool,
    onClose: PropTypes.func,
  };

  handleClose = () => {
    if (this.props.onClose) {
      this.props.onClose();
    }
  };

  render() {
    const { className, classes: s, t } = this.props;

    return (
      <Dialog
        open
        onClose={this.handleClose}
        aria-labelledby="help-dialog-title"
        classes={{ paper: clsx(s.root, className) }}
      ></Dialog>
    );
  }
}

export default withStyles(styleSheet, { name: 'ImportCalendarSettingDialog' })(
  withTranslation('common')(withWidth()(ImportCalendarSettingDialog)),
);
