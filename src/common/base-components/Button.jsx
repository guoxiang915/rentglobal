import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import {
  Button as MUIButton,
  CircularProgress,
  withStyles,
  withTheme,
} from '@material-ui/core';
import clsx from 'clsx';
import { Box } from '.';

const styleSheet = (theme) => {
  const styles = {
    root: {
      background: `${theme.colors.primary.mainColor}`,
      padding: '7px 27px',
      textTransform: 'none',
      color: 'white',
      '&:hover': {
        color: 'white',
        background: `${theme.colors.primary.darkColor}`,
      },
      ...theme.fonts.size.fontSizeS,
      ...theme.fonts.weight.fontWeightBold,
    },

    rounded: {
      borderRadius: 99999,
    },

    secondary: {
      border: `1px solid ${theme.colors.primary.mainColor}`,
      background: 'white',
      color: theme.colors.primary.darkGrey,
      '&:hover': {
        background: `${theme.colors.primary.mainColor}`,
        color: 'white !important',
        '& *': {
          color: 'white !important',
        },
      },
    },

    icon: {
      padding: 7,
      background: 'none',
      minWidth: 0,
      color: theme.colors.primary.grey,
      border: `1px solid ${theme.colors.primary.borderGrey}`,
      '&:hover': {
        color: theme.colors.primary.mainColor,
        border: `1px solid ${theme.colors.primary.mainColor}`,
        background: 'none',
      },
      ...theme.fonts.weight.fontWeightMedium,
    },

    transparent: {
      border: 'none',
      background: 'none',
      color: `${theme.colors.primary.grey}`,
      '&:hover': {
        border: 'none',
        background: 'none',
        color: `${theme.colors.primary.darkGrey}`,
      },
    },

    shadowButton: {
      boxShadow: '0px 6px 12px #D7DF234D',
    },
  };

  Object.entries(theme.links).forEach(
    ([key, val]) => (styles[`link${key}`] = val),
  );
  Object.entries(theme.linksBackground).forEach(
    ([key, val]) => (styles[`bk${key}`] = val),
  );
  Object.entries(theme.linksOutline).forEach(
    ([key, val]) => (styles[`bd${key}`] = val),
  );

  return styles;
};

const Button = forwardRef(
  (
    {
      classes,
      children,
      rounded,
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
    ref,
  ) => (
    <MUIButton
      classes={{
        root: clsx(
          classes.root,
          rounded !== false && classes.rounded,
          variant && classes[variant],
          link && classes[`link${link}`],
          link && inverse && classes.linkinverse,
          background && classes[`bk${background}`],
          outline && classes[`bd${outline}`],
          transparent && classes.transparent,
          shadow && classes.shadowButton,
          styles,
        ),
      }}
      ref={ref}
      {...props}
    >
      {loading && (
        <Box paddingRight>
          <CircularProgress size={16} style={{ color: 'white' }} />
        </Box>
      )}
      {children}
    </MUIButton>
  ),
);

Button.propTypes = {
  classes: PropTypes.object.isRequired,
  rounded: PropTypes.bool,
  theme: PropTypes.object,
  variant: PropTypes.string,
  link: PropTypes.string,
  background: PropTypes.string,
  outline: PropTypes.string,
  transparent: PropTypes.bool,
  styles: PropTypes.object,
};

export default withStyles(styleSheet, { name: 'Button' })(withTheme(Button));
