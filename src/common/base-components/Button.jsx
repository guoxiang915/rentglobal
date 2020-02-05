import React, { Component } from "react";
import PropTypes from "prop-types";
import { Button as MUIButton, withStyles } from "@material-ui/core";
import clsx from "clsx";

const styleSheet = theme => ({
  root: {
    background: `${theme.colors.primary.mainColor}`,
    padding: "5px 30px",
    textTransform: "none",
    fontWeight: 500,
    color: `${theme.colors.primary.white}`,
    "&:hover": {
      background: `${theme.colors.primary.darkColor}`,
      color: `${theme.colors.primary.white}`,
    }
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
      color: "white"
    }
  },

  transparent: {
    border: "none",
    background: "none",
    color: `${theme.colors.primary.grey}`,
    "&:hover": {
      border: "none",
      background: "none",
      color: `${theme.colors.primary.darkGrey}`,
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
            variant === "secondary" && classes.secondary,
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
