import React, { forwardRef } from "react";
import PropTypes from "prop-types";
import {
  IconButton as MUIIconButton,
  CircularProgress,
  withStyles
} from "@material-ui/core";
import clsx from "clsx";
import { Box } from ".";

const styleSheet = theme => {
  const styles = {
    root: {
      // padding: 7,
      minWidth: 0,
      textTransform: "none",
      alignItems: "center",
      justifyContent: "center",
      whiteSpace: "nowrap",
      background: "none",
      color: theme.colors.primary.grey,
      border: `1px solid ${theme.colors.primary.borderGrey}`,
      "&:hover": {
        color: theme.colors.primary.mainColor,
        border: `1px solid ${theme.colors.primary.mainColor}`,
        background: "none"
      },
      ...theme.fonts.size.fontSizeS,
      ...theme.fonts.weight.fontWeightMedium
    },

    red: {
      border: `1px solid ${theme.colors.primary.errorRed}`,
      background: theme.colors.primary.errorRed,
      color: theme.colors.primary.white,
      boxShadow: `0px 6px 12px ${theme.colors.primary.errorRed}`,
      "&:hover": {
        border: `1px solid ${theme.colors.primary.errorRed}`,
        // color: theme.colors.primary.errorRed,
        background: theme.colors.primary.errorRed,
        color: theme.colors.primary.white,
      },
      ...theme.fonts.size.fontSizeS,
      ...theme.fonts.weight.fontWeightMedium,
    },

    green: {
      border: `1px solid ${theme.colors.primary.mainColor}`,
      background: theme.colors.primary.mainColor,
      color: theme.colors.primary.white,
      boxShadow: `0px 6px 12px ${theme.colors.primary.mainColor}`,
      "&:hover": {
        border: `1px solid ${theme.colors.primary.mainColor}`,
        // color: theme.colors.primary.mainColor,
        background: theme.colors.primary.mainColor,
        color: theme.colors.primary.white,
      },
      ...theme.fonts.size.fontSizeS,
      ...theme.fonts.weight.fontWeightMedium,
    },

    grey: {
      border: `1px solid ${theme.colors.primary.grey}`,
      background: theme.colors.primary.grey,
      color: theme.colors.primary.white,
      boxShadow: `0px 6px 12px ${theme.colors.primary.grey}`,
      "&:hover": {
        border: `1px solid ${theme.colors.primary.grey}`,
        // color: theme.colors.primary.grey,
        background: theme.colors.primary.grey,
        color: theme.colors.primary.white,
      },
      ...theme.fonts.size.fontSizeS,
      ...theme.fonts.weight.fontWeightMedium,
    },

    secondary: {
      border: `1px solid ${theme.colors.primary.mainColor}`,
      background: "white",
      color: theme.colors.primary.darkGrey,
      "&:hover": {
        background: `${theme.colors.primary.mainColor}`,
        color: "white !important",
        "& *": {
          color: "white !important"
        }
      }
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
    },

    shadowButton: {
      boxShadow: "0px 6px 12px #D7DF234D"
    }
  };

  Object.entries(theme.links).forEach(
    ([key, val]) => (styles[`link${key}`] = val)
  );
  Object.entries(theme.linksBackground).forEach(
    ([key, val]) => (styles[`bk${key}`] = val)
  );
  Object.entries(theme.linksOutline).forEach(
    ([key, val]) => (styles[`bd${key}`] = val)
  );

  return styles;
};

const Button = forwardRef(
  (
    {
      classes,
      children,
      variant,
      link,
      background,
      outline,
      inverse,
      transparent,
      shadow,
      loading,
      styles,
      ...props
    },
    ref
  ) => (
    <MUIIconButton
      classes={{
        root: clsx(
          classes.root,
          variant && classes[variant],
          link && classes[`link${link}`],
          link && inverse && classes.linkinverse,
          background && classes[`bk${background}`],
          outline && classes[`bd${outline}`],
          transparent && classes.transparent,
          shadow && classes.shadowButton,
          styles
        )
      }}
      ref={ref}
      {...props}
    >
      {loading && (
        <Box paddingRight>
          <CircularProgress size={16} style={{ color: "white" }} />
        </Box>
      )}
      {children}
    </MUIIconButton>
  )
);

Button.propTypes = {
  classes: PropTypes.object.isRequired,
  rounded: PropTypes.bool,
  variant: PropTypes.string,
  link: PropTypes.string,
  background: PropTypes.string,
  outline: PropTypes.string,
  transparent: PropTypes.bool,
  styles: PropTypes.object
};

export default withStyles(styleSheet, { name: "Button" })(Button);
