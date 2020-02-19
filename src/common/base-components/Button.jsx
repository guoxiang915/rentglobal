import React, { Component } from "react";
import PropTypes from "prop-types";
import { Button as MUIButton, withStyles } from "@material-ui/core";
import clsx from "clsx";

const styleSheet = theme => ({
  root: {
    background: `${theme.colors.primary.mainColor}`,
    padding: "7px 27px",
    textTransform: "none",
    color: "white",
    "&:hover": {
      color: "white",
      background: `${theme.colors.primary.darkColor}`
    },
    ...theme.fonts.size.fontSizeS,
    ...theme.fonts.weight.fontWeightBold
  },

  rounded: {
    borderRadius: 99999
  },

  secondary: {
    border: `1px solid ${theme.colors.primary.mainColor}`,
    background: "white",
    color: theme.colors.primary.darkGrey,
    "&:hover": {
      background: `${theme.colors.primary.mainColor}`,
      color: `white !important`,
      "& *": {
        color: `white !important`
      }
    }
  },

  icon: {
    padding: 7,
    background: "none",
    minWidth: 0,
    color: theme.colors.primary.grey,
    border: `1px solid ${theme.colors.primary.borderGrey}`,
    "&:hover": {
      color: theme.colors.primary.mainColor,
      border: `1px solid ${theme.colors.primary.mainColor}`,
      background: "none"
    },
    ...theme.fonts.weight.fontWeightMedium
  },

  transparent: {
    border: "none",
    background: "none",
    color: `${theme.colors.primary.grey}`,
    "&:hover": {
      border: "none",
      background: "none",
      color: `${theme.colors.primary.darkGrey}`
    }
  }
});

class Button extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    rounded: PropTypes.bool,
    variant: PropTypes.string,
    transparent: PropTypes.bool,
    styles: PropTypes.object
  };

  render() {
    const {
      classes,
      children,
      rounded,
      variant,
      transparent,
      styles,
      ...props
    } = this.props;

    return (
      <MUIButton
        classes={{
          root: clsx(
            classes.root,
            rounded !== false && classes.rounded,
            variant && classes[variant],
            transparent && classes.transparent,
            styles
          )
        }}
        {...props}
      >
        {children}
      </MUIButton>
    );
  }
}

export default withStyles(styleSheet, { name: "Button" })(Button);
