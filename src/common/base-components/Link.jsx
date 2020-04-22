import React from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import { withStyles } from '@material-ui/core';
import clsx from 'clsx';

const styleSheet = (theme) => ({
  root: {
    textDecoration: 'none',
    cursor: 'pointer',
    color: theme.colors.primary.darkGrey,
    '&:hover': {
      color: theme.colors.primary.mainColor,
    },
    transition: 'all .2s',
  },
  ...theme.links,
});

const Link = ({
  classes,
  children,
  underline,
  variant,
  inverse,
  styles,
  ...props
}) => (
  <RouterLink
    className={clsx(
      classes.root,
      variant && classes[variant],
      inverse && classes.inverse,
      styles,
    )}
    underline={underline || 'none'}
    {...props}
  >
    {children}
  </RouterLink>
);

Link.propTypes = {
  classes: PropTypes.object.isRequired,
  styles: PropTypes.any,
};

export default withStyles(styleSheet, { name: 'Link' })(Link);
