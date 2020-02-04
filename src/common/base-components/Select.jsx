import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Select as MUISelect,
  withStyles,
  FormControl,
  InputLabel
} from "@material-ui/core";
import clsx from "clsx";

const styleSheet = theme => ({
  root: {
    background: `${theme.colors.primary.mainColor}`,
    padding: "7px 30px"
  },

  rounded: {
    borderRadius: 99999
  },

  secondary: {
    border: `1px solid ${theme.colors.primary.mainColor}`,
    background: "white"
  },

  transparent: {
    border: "none",
    background: "none"
  }
});

class Select extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    value: PropTypes.any,
    rounded: PropTypes.bool,
    variant: PropTypes.string,
    styles: PropTypes.object
  };

  render() {
    const {
      classes,
      children,
      rounded,
      variant,
      styles,
      value,
      label,
      ...props
    } = this.props;

    const variantClass = classes[variant];

    return (
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="inputLabel">
          {label}
        </InputLabel>
        <MUISelect
          value={value}
          labelId="inputLabel"
          classes={{
            root: clsx(
              classes.root,
              rounded !== false && classes.rounded,
              variantClass,
              styles
            )
          }}
          {...props}
        >
          {children}
        </MUISelect>
      </FormControl>
    );
  }
}

export default withStyles(styleSheet, { name: "Select" })(Select);
