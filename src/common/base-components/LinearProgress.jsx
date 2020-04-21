import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { LinearProgress as MUILinearProgress } from '@material-ui/core';

const styleSheet = (theme) => ({
  root: {
    width: '100%',
    background: theme.colors.primary.borderGrey,
  },

  bar2Buffer: {
    color: theme.colors.primary.errorRed,
    background: theme.colors.primary.errorRed,
  },

  dashed: {
    background: 'none',
  },
});

const LinearProgress = (props) => {
  let {
    classes, styles, value, valueBuffer, ...prop
  } = props;
  if (styles) {
    Object.keys(classes).forEach(
      (key) => (classes[key] = clsx(classes[key], styles[key])),
    );
    classes = { ...styles, ...classes };
  }

  return (
    <MUILinearProgress
      color="primary"
      variant="buffer"
      classes={classes}
      value={valueBuffer ? value : 0}
      valueBuffer={valueBuffer || value}
      {...prop}
    />
  );
};

export default withStyles(styleSheet)(LinearProgress);
