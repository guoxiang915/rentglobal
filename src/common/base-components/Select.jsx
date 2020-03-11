import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import {
  withStyles,
  MenuItem,
  Typography,
  Select as MUISelect
} from "@material-ui/core";
import { ArrowDownIcon } from ".";

export const styleSheet = theme => ({
  root: {
    borderRadius: 99999
  },

  focused: {
    border: "none",
    display: "none"
  },

  label: {
    color: theme.colors.primary.grey,
    textAlign: "left"
  },

  asterisk: {
    color: theme.colors.primary.mainColor
  },

  errorMessage: {
    ...theme.typography.errorMessage,
    color: `${theme.colors.primary.errorRed} !important`,
    textAlign: "right"
  },

  inputError: {
    "&:after": {
      borderBottom: `1px solid ${theme.colors.primary.errorRed} !important`
    }
  },

  input: {
    ...theme.typography.primaryBody,
    padding: `14px 16px`,
    borderRadius: 99999,
    "&:focus": {
      borderRadius: 99999,
      background: "inherit"
    }
  },

  readOnly: {
    opacity: 0.6
  },

  underline: {
    "&:before": {
      borderBottom: `1px solid ${theme.colors.primary.lightGrey} !important`
    },
    "&:after": {
      borderBottom: `2px solid ${theme.colors.primary.mainColor} !important`
    },
    "&:hover:before": {
      borderBottom: `2px solid ${theme.colors.primary.lightGrey} !important`
    }
  },

  fullWidth: {
    width: "100%"
  },

  white: {
    color: "white",
    borderColor: "white"
  },

  select: {
    ...theme.typography.primaryBody,
    padding: `14px 16px`
  },

  icon: {
    padding: "0px 12px"
  }
});

export const Select = withStyles(styleSheet, { name: "Select" })(
  class Select extends PureComponent {
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
      classes: PropTypes.object.isRequired
    };

    static defaultProps = {
      variant: "outlined",
      // shrink: true,
      // focused: false,
      displayEmpty: true,
      getKey: option => option || "",
      renderOption: option => option
    };

    handleChange = event => {
      const { options, getKey, onChange } = this.props;
      const key = event.target.value;
      const value = options.find(option => getKey(option) === key);
      onChange && onChange(value, event);
    };

    render() {
      const {
        options,
        value,
        getKey,
        renderOption,
        displayEmpty,
        native,
        classes: s,
        className,
        variant,
        ...props
      } = this.props;

      return (
        <MUISelect
          variant={variant}
          value={native ? getKey(value) : value}
          onChange={this.handleChange}
          displayEmpty={displayEmpty}
          native={native}
          className={clsx(className, s.root)}
          classes={{
            root: s.input,
            icon: s.icon
          }}
          IconComponent={props => (
            <div {...props}>
              <ArrowDownIcon
                style={{ width: 12, height: 8 }}
                color="secondary"
              />
            </div>
          )}
          renderValue={value => renderOption(value)}
          {...props}
        >
          {native && displayEmpty && (
            <option key={0} value={""}>
              &nbsp;
            </option>
          )}
          {options &&
            options.map((option, i) =>
              native ? (
                <option key={i + 1} value={getKey(option)}>
                  {renderOption(option)}
                </option>
              ) : (
                <MenuItem key={i} value={getKey(option)}>
                  <Typography>{renderOption(option)}</Typography>
                </MenuItem>
              )
            )}
        </MUISelect>
      );
    }
  }
);
