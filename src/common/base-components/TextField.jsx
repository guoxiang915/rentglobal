import React, { Component } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { TextField as MUITextField, withStyles } from "@material-ui/core";

const styleSheet = theme => ({
  root: {
    borderRadius: 27
  },

  label: {
    ...theme.typography.secondaryBody,
    textAlign: "left"
  },

  asterisk: {
    color: theme.colors.primary.grey
  },

  errorMessage: {
    ...theme.typography.errorMessage,
    color: `${theme.colors.primary.errorRed} !important`,
    textAlign: "right"
  },

  inputError: {
    borderColor: theme.colors.primary.errorRed
  },

  input: {
    ...theme.typography.primaryBody,
    padding: `14px 16px`
  },

  multiline: {
    padding: 0
  },

  readOnly: {
    opacity: 0.4
  },

  fullWidth: {
    width: "100%"
  }
});

class TextField extends Component {
  static propTypes = {
    value: PropTypes.any,
    onChange: PropTypes.func,
    label: PropTypes.string,
    startAdornment: PropTypes.any,
    endAdornment: PropTypes.any,
    fullWidth: PropTypes.bool,
    className: PropTypes.string,
    classes: PropTypes.any.isRequired,
    errorHelper: PropTypes.bool,
    type: PropTypes.string,
    variant: PropTypes.string
  };

  static defaultProps = {
    variant: "outlined"
  };

  render() {
    let {
      value,
      onChange,
      label,
      readOnly,
      className,
      classes,
      startAdornment,
      endAdornment,
      fullWidth,
      errorHelper,
      type,
      variant,
      styles,
      ...props
    } = this.props;

    return (
      <MUITextField
        value={value || (type === "number" ? 0 : "")}
        onChange={onChange}
        type={type}
        label={label}
        InputProps={{
          startAdornment,
          endAdornment,
          classes: {
            root: clsx(classes.root, styles && styles.root),
            input: clsx(classes.input, styles && styles.input),
            error: clsx(classes.inputError, styles && styles.inputError),
            multiline: clsx(classes.multiline, styles && styles.multiline)
          },
          inputProps: { readOnly: !!readOnly }
        }}
        InputLabelProps={{
          FormLabelClasses: { asterisk: classes.asterisk, root: classes.label },
          error: false,
          focused: false
        }}
        FormHelperTextProps={{
          classes: { error: classes.errorMessage },
          error: errorHelper
        }}
        className={clsx(className, {
          [classes.fullWidth]: fullWidth
        })}
        variant={variant}
        {...props}
      />
    );
  }
}

export default withStyles(styleSheet, { name: "TextField" })(TextField);
