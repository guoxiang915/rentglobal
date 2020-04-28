import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  FormControlLabel,
  Checkbox as MUICheckbox,
  Radio as MUIRadio,
  withStyles,
} from '@material-ui/core';
import {
  CheckCircle,
  RadioButtonChecked,
  RadioButtonUnchecked,
} from '@material-ui/icons';

const styleSheet = (theme) => ({
  root: {
    position: 'relative',
    color: theme.colors.primary.darkGrey,
    padding: 2,
    margin: 0,
    border: 'none',
    borderRadius: 99999,
    '&:hover': {
      color: theme.colors.primary.mainColor,
    },
  },

  outlined: {
    background: 'none',
    border: `1px solid ${theme.colors.primary.borderGrey}`,
    '&:hover': {
      border: `1px solid ${theme.colors.primary.mainColor}`,
    },
  },

  contained: {
    color: theme.colors.primary.white,
    background: `${theme.colors.primary.mainColor}`,
    border: 'none',
    '&:hover': {
      background: `${theme.colors.primary.darkColor}`,
      color: theme.colors.primary.white,
    },
  },

  checkedOutlined: {
    border: `1px solid ${theme.colors.primary.mainColor} !important`,
  },

  checkedContained: {
    background: `${theme.colors.primary.darkColor}`,
  },

  rounded: {
    borderRadius: 99999,
  },

  label: {
    padding: '5px 28px',
    fontSize: '13px',
    lineHeight: '18px',
    width: '200%',
  },

  icon: {
    color: theme.colors.primary.darkGrey,
    width: 28,
    height: 28,
  },

  checkedIcon: {
    color: theme.colors.primary.mainColor,
    width: 28,
    height: 28,
  },

  primaryIcon: {
    color: theme.colors.primary.mainColor,
  },

  controlStyle: {
    padding: 0,
    margin: 0,
    position: 'absolute',
  },

  secondaryIcon: {
    color: theme.colors.primary.darkGrey,
  },

  whiteIcon: {
    color: theme.colors.primary.white,
  },
});

const Selection = withStyles(styleSheet, { name: 'Selection' })(
  class Selection extends PureComponent {
    static propTypes = {
      isChecked: PropTypes.bool,
      onChange: PropTypes.func,
      label: PropTypes.any,
      control: PropTypes.any,
      classes: PropTypes.object.isRequired,
      icon: PropTypes.any,
      checkedIcon: PropTypes.any,
      variant: PropTypes.string,
    };

    render() {
      const {
        classes: s,
        control: Control,
        icon: Icon,
        checkedIcon: CheckedIcon,
        variant,
        label,
        isChecked,
        onChange,
        ...props
      } = this.props;

      return (
        <FormControlLabel
          control={
            <Control
              icon={
                <Icon
                  classes={{
                    root: clsx(s.icon, {
                      [s.whiteIcon]:
                        variant === 'outlined' || variant === 'contained',
                    }),
                  }}
                />
              }
              checkedIcon={
                <CheckedIcon
                  classes={{
                    root: clsx(
                      s.checkedIcon,
                      variant === 'outlined' && s.primaryIcon,
                      variant === 'contained' && s.whiteIcon
                    ),
                  }}
                />
              }
              checked={isChecked}
              onChange={onChange}
              className={s.controlStyle}
            />
          }
          label={label}
          classes={{
            root: clsx(s.root, {
              [s.outlined]: variant === 'outlined',
              [s.checkedOutlined]: variant === 'outlined' && isChecked,
              [s.contained]: variant === 'contained',
              [s.checkedContained]: variant === 'contained' && isChecked,
            }),
            label: s.label,
          }}
          {...props}
        />
      );
    }
  }
);

export const Radio = (props) => (
  <Selection
    control={MUIRadio}
    icon={RadioButtonUnchecked}
    checkedIcon={RadioButtonChecked}
    {...props}
  />
);

export const Checkbox = (props) => (
  <Selection
    control={MUICheckbox}
    icon={RadioButtonUnchecked}
    checkedIcon={CheckCircle}
    style={{ textAlign: 'center' }}
    {...props}
  />
);

export const ExpandableSectionRadio = ({ onCheck, ...props }) => (
  <Radio
    onChange={(isChecked) => {
      if (isChecked) {
        onCheck();
      }
    }}
    {...props}
  />
);
