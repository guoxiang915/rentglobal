import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  withStyles,
  MenuItem,
  Typography,
  Select as MUISelect,
  FormControl as MUIFormControl,
  FormHelperText as MUIFormHelperText,
} from '@material-ui/core';
import { ArrowDownIcon } from '.';

const styleSheet = (theme) => ({
  root: {
    borderRadius: 99999,
  },

  focused: {
    border: 'none',
    display: 'none',
  },

  label: {
    color: theme.colors.primary.grey,
    textAlign: 'left',
  },

  asterisk: {
    color: theme.colors.primary.mainColor,
  },

  errorMessage: {
    ...theme.typography.errorMessage,
    color: `${theme.colors.primary.errorRed} !important`,
    textAlign: 'right',
    margin: '8px 14px 0px',
  },

  inputError: {
    '&:after': {
      borderBottom: `1px solid ${theme.colors.primary.errorRed} !important`,
    },
  },

  input: {
    ...theme.typography.primaryBody,
    padding: '14px 16px',
    borderRadius: 99999,
    '&:focus': {
      borderRadius: 99999,
      background: 'inherit',
    },
  },

  readOnly: {
    opacity: 0.6,
  },

  underline: {
    '&:before': {
      borderBottom: `1px solid ${theme.colors.primary.lightGrey} !important`,
    },
    '&:after': {
      borderBottom: `2px solid ${theme.colors.primary.mainColor} !important`,
    },
    '&:hover:before': {
      borderBottom: `2px solid ${theme.colors.primary.lightGrey} !important`,
    },
  },

  fullWidth: {
    width: '100%',
  },

  white: {
    color: 'white',
    borderColor: 'white',
  },

  select: {
    ...theme.typography.primaryBody,
    padding: '14px 16px',
  },

  icon: {
    padding: '0px 12px',
  },
});

export const Select = withStyles(styleSheet, { name: 'Select' })(
  class Select extends PureComponent {
    state = {
      error: false,
      helperText: undefined,
    };

    static propTypes = {
      options: PropTypes.array,
      value: PropTypes.any,
      variant: PropTypes.string,
      getKey: PropTypes.func,
      renderOption: PropTypes.func,
      onChange: PropTypes.func,
      label: PropTypes.string,
      shrink: PropTypes.bool,
      focused: PropTypes.bool,
      displayEmpty: PropTypes.bool,
      fullWidth: PropTypes.bool,
      required: PropTypes.bool,
      readOnly: PropTypes.bool,
      disabled: PropTypes.bool,
      native: PropTypes.bool,
      white: PropTypes.bool,
      tooltip: PropTypes.any,
      classes: PropTypes.object.isRequired,
    };

    static defaultProps = {
      variant: 'outlined',
      displayEmpty: true,
      getKey: (option) => option || '',
      renderOption: (option) => option,
    };

    handleChange = (event) => {
      const { onChange } = this.props;
      this.setState({ error: false, helperText: undefined });
      onChange && onChange(event);
    };

    componentDidUpdate(prevProps) {
      let fieldState = {};
      if (prevProps.error !== this.props.error) {
        fieldState = {
          ...fieldState,
          error: this.props.error,
        };
      }
      if (prevProps.helperText !== this.props.helperText) {
        fieldState = {
          ...fieldState,
          helperText: this.props.helperText,
        };
      }
      if (Object.keys(fieldState).length > 0) {
        this.setState(fieldState);
      }
    }

    render() {
      const {
        options,
        value,
        getKey,
        renderOption,
        displayEmpty,
        native,
        variant,
        classes: s,
        className,
        helperText,
        ...props
      } = this.props;
      const { error, helperText: errorText } = this.state;

      return (
        <MUIFormControl className={className}>
          <MUISelect
            variant={variant}
            value={native ? getKey(value) : value}
            onChange={this.handleChange}
            displayEmpty={displayEmpty}
            native={native}
            className={clsx(className, s.root)}
            classes={{
              root: s.input,
              icon: s.icon,
            }}
            IconComponent={(props) => (
              <div {...props}>
                <ArrowDownIcon
                  style={{ width: 12, height: 8 }}
                  color="secondary"
                />
              </div>
            )}
            renderValue={(value) => renderOption(value)}
            error={error}
            {...props}
          >
            {native && displayEmpty && (
              <option key={0} value="">
                &nbsp;
              </option>
            )}
            {options
              && options.map((option, i) => (native ? (
                <option key={i + 1} value={getKey(option)}>
                  {renderOption(option)}
                </option>
              ) : (
                <MenuItem key={i} value={getKey(option)}>
                  <Typography>{renderOption(option)}</Typography>
                </MenuItem>
              )))}
          </MUISelect>
          {errorText && (
            <MUIFormHelperText className={s.errorMessage}>
              {errorText}
            </MUIFormHelperText>
          )}
        </MUIFormControl>
      );
    }
  },
);
