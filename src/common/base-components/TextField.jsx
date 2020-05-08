import React, { PureComponent, forwardRef } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import {
  TextField as MUITextField,
  withStyles,
  InputAdornment,
} from "@material-ui/core";

const styleSheet = (theme) => ({
  root: {
    borderRadius: 27,
  },

  label: {
    ...theme.typography.secondaryBody,
    textAlign: "left",
  },

  asterisk: {
    color: theme.colors.primary.grey,
  },

  errorMessage: {
    ...theme.typography.errorMessage,
    color: `${theme.colors.primary.errorRed} !important`,
    textAlign: "right",
  },

  inputError: {
    borderColor: theme.colors.primary.errorRed,
  },

  input: {
    ...theme.typography.primaryBody,
    padding: "14px 16px",
  },

  multiline: {
    padding: 0,
  },

  readOnly: {
    opacity: 0.4,
  },

  fullWidth: {
    width: "100%",
  },
});

class TextField extends PureComponent {
  state = {
    error: this.props.error,
    helperText: this.props.helperText,
  };

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
    variant: PropTypes.string,
  };

  static defaultProps = {
    variant: "outlined",
  };

  handleChange = (e) => {
    this.setState({ error: false, helperText: undefined });
    this.props.onChange(e);
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
      value,
      label,
      readOnly,
      startAdornment,
      endAdornment,
      fullWidth,
      errorHelper,
      type,
      variant,
      classes: s,
      className,
      styles,
      inputProps,
      ...props
    } = this.props;
    const { error, helperText } = this.state;

    return (
      <MUITextField
        // defaultValue={type === "number" ? 0 : ""}
        // fix bug of default value
        value={value ?? ""}
        onChange={this.handleChange}
        type={type}
        label={label}
        InputProps={{
          startAdornment,
          endAdornment: (
            <InputAdornment>{endAdornment || <></>}</InputAdornment>
          ),
          classes: {
            root: clsx(s.root, styles && styles.root),
            input: clsx(s.input, styles && styles.input),
            error: clsx(s.inputError, styles && styles.inputError),
            multiline: clsx(s.multiline, styles && styles.multiline),
          },
        }}
        inputProps={{ readOnly: !!readOnly, ...inputProps }}
        InputLabelProps={{
          FormLabelClasses: { asterisk: s.asterisk, root: s.label },
          error: false,
          focused: false,
        }}
        FormHelperTextProps={{
          classes: { error: s.errorMessage },
          error: errorHelper,
        }}
        className={clsx(className, {
          [s.fullWidth]: fullWidth,
        })}
        variant={variant}
        {...props}
        error={error}
        helperText={helperText}
      />
    );
  }
}

export default withStyles(styleSheet, { name: "TextField" })(
  forwardRef((props, ref) => <TextField innerRef={ref} {...props} />)
);
