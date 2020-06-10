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
import withWidth from "@material-ui/core/withWidth";
import {
  Button,
  Typography,
  Row,
  Box,
  Column,
  Checkbox,
  Select,
  Stretch,
} from '../../../common/base-components';
import { CloseIcon, CheckIcon } from '../../../common/base-components/Icons';

const styleSheet = (theme) => ({
  root: {
    maxWidth: 1056,
    maxHeight: 512,
    padding: 0,
    borderRadius: 8,
  },

  primary: {
    background: theme.colors.primary.mainColor
  },

  header: {
    width: '100%',
    height: 5,
    padding: 0,
  },

  contentWrapper: {
    padding: "24px 42px 45px",
    [theme.breakpoints.down("sm")]: {
      padding: "20px 24px 35px",
    }
  },

  optionWrapper: {
    marginRight: 10,

    '&.last-of-type': {
      marginRight: 0,
    }
  },

  calendarSettingsSelectWrapper: {
    width: '100%',
    height: 34,
  },

  calendarSettingsSelect: {
    fontSize: 17,
  },

  footer: {
    padding: "0px 40px 27px 40px",
    [theme.breakpoints.down("xs")]: {
      padding: "0px 40px 45px 40px"
    }
  }
});

class ImportCalendarSettingDialog extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    open: PropTypes.bool,
    onClose: PropTypes.func,
  };
  
  state = {
    isCheckedWeekends: false,
    isCheckedAllDays: false,
    isCheckedBusinessDays: false,
    condition: null,
  }

  handleClose = () => {
    if (this.props.onClose) {
      this.props.onClose();
    }
  };

  handleToggleOption = (e) => {
    this.setState({ [e.target.name]: e.target.checked });
  };

  handleChangeCondition = (e) => {
    this.setState({ condition: e.target.value });
  }

  render() {
    const { className, classes: s, t } = this.props;
    const { isCheckedWeekends, isCheckedAllDays, isCheckedBusinessDays } = this.state;

    const options = [];

    return (
      <Dialog
        open
        onClose={this.handleClose}
        aria-labelledby="import-calendar-setting-dialog"
        classes={{ paper: clsx(s.root, className) }}
      >
        <DialogTitle
          id="import-calendar-setting-dialog-title"
          className={clsx(s.header, s.primary)}
        >
          <React.Fragment />
        </DialogTitle>
        <DialogContent className={s.contentWrapper}>
          <Column>
            <Row style={{ marginTop: 27 }} paddingBottom>
              <Typography
                fontSizeM
                textSecondary
                fontWeightBold
                justifyChildrenCenter
                textCenter
              >
                {t("importCalendarSetting")}
              </Typography>
            </Row>
            <Row fullWidth paddingBottom>
              <Box classes={{ box: s.optionWrapper }}>
                <Checkbox
                  variant="outlined"
                  name="isCheckedWeekends"
                  label={t("weekends")}
                  className={s.textField250Fixed}
                  isChecked={isCheckedWeekends}
                  onChange={this.handleToggleOption}
                />
              </Box>
              <Box classes={{ box: s.optionWrapper }}>
                <Checkbox
                  variant="outlined"
                  name="isCheckedAllDays"
                  label={t("allDays")}
                  className={s.textField250Fixed}
                  isChecked={isCheckedAllDays}
                  onChange={this.handleToggleOption}
                />
              </Box>
              <Box classes={{ box: s.optionWrapper }}>
                <Checkbox
                  variant="outlined"
                  name="isCheckedBusinessDays"
                  label={t("businessDays")}
                  className={s.textField250Fixed}
                  isChecked={isCheckedBusinessDays}
                  onChange={this.handleToggleOption}
                />
              </Box>
            </Row>
            <Row fullWidth>
              <Select
                options={options}
                renderOption={item => (
                  <Typography fontSizeS textMediumGrey>
                    {item}
                  </Typography>
                )}
                displayEmpty
                onChange={this.handleChangeCondition}
                className={s.calendarSettingsSelectWrapper}
                classes={{ root: s.calendarSettingsSelect }}
                fullWidth
              />
            </Row>
          </Column>
        </DialogContent>

        {/** dialog footer */}
        <DialogActions className={s.footer}>
          {/** close button */}
          <Row fullWidth>
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
            <Stretch />
            <Button
              variant="primary"
              onClick={() => console.log('click')}
              className={s.applyButton}
            >
              <Typography fontSizeS alignChildrenCenter>
                <CheckIcon fontSize="small" />
                <Typography paddingLeft>{t("apply")}</Typography>
              </Typography>
            </Button>
          </Row>
        </DialogActions>
      </Dialog>
    );
  }
}

export default withStyles(styleSheet, { name: 'ImportCalendarSettingDialog' })(
  withTranslation('common')(withWidth()(ImportCalendarSettingDialog)),
);
