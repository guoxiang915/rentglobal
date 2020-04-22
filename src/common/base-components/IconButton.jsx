import React from 'react';
import clsx from 'clsx';
import { IconButton as MUIIconButton, withStyles } from '@material-ui/core';

const styleSheet = () => ({
  root: {
    // ...theme.buttons.default,
    flex: 0,

    '&:hover': {},
  },
  disabled: {
    // ...theme.buttons.disabled
  },
  medium: {
    padding: 12,
    fontSize: '1.5rem',
  },
  small: {
    padding: 3,
    fontSize: '1.125rem',
  },
  // ...theme.backgroundColors,
  // ...theme.textColors
});

const IconButton = ({
  children, classes, size, ...props
}) => (
  <MUIIconButton
    classes={{
      root: clsx(classes[size] || classes.medium, classes.root),
    }}
    {...props}
  >
    {children}
  </MUIIconButton>
);

export default withStyles(styleSheet, { name: 'IconButton' })(IconButton);
