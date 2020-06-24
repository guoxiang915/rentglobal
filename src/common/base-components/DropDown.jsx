import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import {
  withStyles,
  MenuItem,
  Typography,
  Select as MUISelect,
  FormControl as MUIFormControl,
  FormHelperText as MUIFormHelperText,
} from "@material-ui/core";
import { ArrowDownIcon } from ".";

const styleSheet = (theme) => ({
  root: {
    borderRadius: 23,
    "&>.MuiOutlinedInput-notchedOutline": {
      border: `1px solid ${theme.colors.primary.borderGrey} !important`,
    },
  },

  focused: {
    border: "none",
    display: "none",
  },

  label: {
    color: theme.colors.primary.grey,
    textAlign: "left",
  },

  asterisk: {
    color: theme.colors.primary.mainColor,
  },

  errorMessage: {
    ...theme.typography.errorMessage,
    color: `${theme.colors.primary.errorRed} !important`,
    textAlign: "right",
    margin: "8px 14px 0px",
  },

  inputError: {
    "&:after": {
      borderBottom: `1px solid ${theme.colors.primary.errorRed} !important`,
    },
  },

  input: {
    ...theme.typography.primaryBody,
    padding: "14px 16px",
    borderRadius: 23,
    "&:focus": {
      borderRadius: 23,
      background: "inherit",
    },
  },

  openedInput: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    "&>.MuiOutlinedInput-notchedOutline": {
      borderBottom: "none !important",
    },
  },

  readOnly: {
    opacity: 0.6,
  },

  underline: {
    "&:before": {
      borderBottom: `1px solid ${theme.colors.primary.lightGrey} !important`,
    },
    "&:after": {
      borderBottom: `2px solid ${theme.colors.primary.mainColor} !important`,
    },
    "&:hover:before": {
      borderBottom: `2px solid ${theme.colors.primary.lightGrey} !important`,
    },
  },

  fullWidth: {
    width: "100%",
  },

  white: {
    color: "white",
    borderColor: "white",
  },

  selectWrapper: {
    ...theme.typography.primaryBody,
    // padding: "14px 16px",
    borderBottomLeftRadius: 23,
    borderBottomRightRadius: 23,
    border: `1px solid ${theme.colors.primary.borderGrey}`,
    borderTop: "none",
    boxShadow: "none",
  },

  select: {
    padding: "14px 0px",
  },

  selectOption: {
    padding: "6px 20px",
  },

  icon: {
    padding: "0px 12px",
  },
});

export const DropDown = withStyles(styleSheet, { name: "DropDown" })(
  class DropDown extends PureComponent {
    state = {
      error: false,
      helperText: undefined,
      opened: false,
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
      variant: "outlined",
      displayEmpty: true,
      getKey: (option) => option || "",
      renderOption: (option) => option,
    };

    handleChange = (option) => (event) => {
      this.handleToggleOptions();
      const { onChange } = this.props;
      this.setState({ error: false, helperText: undefined });
      onChange && onChange({ target: { value: option } });
    };

    handleToggleOptions = (e) => {
      this.setState({ opened: !this.state.opened });
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
        fullWidth,
        ...props
      } = this.props;
      const { error, helperText: errorText, opened } = this.state;

      return (
        <MUIFormControl className={clsx(className, fullWidth && s.fullWidth)}>
          <MUISelect
            variant={variant}
            value={native ? getKey(value) : value}
            onOpen={this.handleToggleOptions}
            open={opened}
            MenuProps={{
              anchorOrigin: { horizontal: "center", vertical: "bottom" },
              transformOrigin: { horizontal: "center", vertical: "top" },
              onClose: this.handleToggleOptions,
              getContentAnchorEl: null,
              classes: { paper: s.selectWrapper, list: s.select },
            }}
            displayEmpty={displayEmpty}
            native={native}
            className={clsx(className, s.root, opened && s.openedInput)}
            classes={{
              root: clsx(s.input, opened && s.openedInput),
              icon: s.icon,
              outlined: s.outlinedBox,
            }}
            IconComponent={(props) => (
              <div {...props}>
                <ArrowDownIcon
                  style={{ width: 12, height: 8 }}
                  color='secondary'
                />
              </div>
            )}
            renderValue={(value) => renderOption(value)}
            error={error}
            {...props}
          >
            {native && displayEmpty && (
              <option key={0} value=''>
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
                  <MenuItem
                    key={i}
                    value={getKey(option)}
                    classes={{ root: s.selectOption }}
                    onClick={this.handleChange(option)}
                  >
                    <Typography>{renderOption(option)}</Typography>
                  </MenuItem>
                )
              )}
          </MUISelect>
          {errorText && (
            <MUIFormHelperText className={s.errorMessage}>
              {errorText}
            </MUIFormHelperText>
          )}
        </MUIFormControl>
      );
    }
  }
);
