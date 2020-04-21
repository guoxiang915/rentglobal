import React from 'react';
import PropTypes from 'prop-types';
import { Chip as MUIChip, withStyles } from '@material-ui/core';
import clsx from 'clsx';
import { CheckCircle, Close } from '@material-ui/icons';

const styleSheet = (theme) => ({
  root: {
    height: 34,
    position: 'relative',
  },

  icon: {
    position: 'absolute',
    left: -1,
    color: theme.colors.primary.mainColor,
    width: 28,
    height: 28,
  },

  deleteIcon: {
    position: 'absolute',
    right: 8,
    color: theme.colors.primary.grey,
    width: 20,
    height: 20,
  },

  label: {
    ...theme.typography.primaryBody,
  },
});

const Chip = ({
  variant,
  color,
  checked,
  label,
  onClick,
  onDelete,
  className,
  classes: s,
  ...props
}) => (
  <MUIChip
    variant={variant}
    color={color}
    label={label}
    icon={checked && <CheckCircle />}
    deleteIcon={<Close />}
    classes={{
      root: clsx(s.root, className),
      icon: s.icon,
      deleteIcon: s.deleteIcon,
      label: s.label,
    }}
    onClick={onClick}
    onDelete={onDelete}
    {...props}
  />
);

Chip.propTypes = {
  variant: PropTypes.string,
  color: PropTypes.string,
  checked: PropTypes.bool,
  label: PropTypes.string,
  onClick: PropTypes.func,
  onDelete: PropTypes.func,
  classes: PropTypes.object.isRequired,
  styles: PropTypes.any,
};

Chip.defaultProps = {
  variant: 'outlined',
  color: 'primary',
  checked: true,
};

export default withStyles(styleSheet, { name: 'Chip' })(Chip);
