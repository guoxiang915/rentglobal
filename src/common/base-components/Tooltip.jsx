import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Tooltip as MUITooltip,
  Typography,
  withStyles,
  Zoom,
} from '@material-ui/core';

const tooltipStylesheet = (theme) => ({
  popper: {},

  tooltip: {
    borderRadius: 8,
    backgroundColor: theme.colors.primary.white,
    padding: 18,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    border: `1px solid ${theme.colors.primary.borderGrey}`,
    boxShadow: '0px 2px 6px #00000014',
    position: 'relative',
  },

  tooltipRight: {
    '&:before': {
      content: '""',
      display: 'block',
      position: 'absolute',
      top: 'calc(50% - 7px)',
      left: -8,
      width: 16,
      height: 16,
      background: theme.colors.primary.white,
      border: `1px solid ${theme.colors.primary.borderGrey}`,
      borderTop: 'none',
      borderRight: 'none',
      transform: 'rotate(45deg)',
    },
  },

  tooltipLeft: {
    '&:after': {
      content: '""',
      display: 'block',
      position: 'absolute',
      top: 'calc(50% - 7px)',
      right: -8,
      width: 16,
      height: 16,
      background: theme.colors.primary.white,
      border: `1px solid ${theme.colors.primary.borderGrey}`,
      borderBottom: 'none',
      borderLeft: 'none',
      transform: 'rotate(45deg)',
    },
  },

  tooltipTop: {
    '&:after': {
      content: '""',
      display: 'block',
      position: 'absolute',
      bottom: -9,
      left: 'calc(50% - 7px)',
      width: 16,
      height: 16,
      background: theme.colors.primary.white,
      border: `1px solid ${theme.colors.primary.borderGrey}`,
      borderTop: 'none',
      borderLeft: 'none',
      transform: 'rotate(45deg)',
    },
  },

  tooltipBottom: {
    '&:before': {
      content: '""',
      display: 'block',
      position: 'absolute',
      top: -9,
      left: 'calc(50% - 7px)',
      width: 16,
      height: 16,
      background: theme.colors.primary.white,
      border: `1px solid ${theme.colors.primary.borderGrey}`,
      borderBottom: 'none',
      borderRight: 'none',
      transform: 'rotate(45deg)',
    },
  },

  tooltipprimary: {
    borderColor: theme.colors.primary.mainColor,
    '&:before': {
      borderColor: theme.colors.primary.mainColor,
    },
    '&:after': {
      borderColor: theme.colors.primary.mainColor,
    },
  },

  tooltiperrorRed: {
    borderColor: theme.colors.primary.errorRed,
    '&:before': {
      borderColor: theme.colors.primary.errorRed,
    },
    '&:after': {
      borderColor: theme.colors.primary.errorRed,
    },
  },
});

const tooltipContentStylesheet = (theme) => ({
  tooltipTitle: {
    ...theme.tooltip.title,
  },

  tooltipText: {
    ...theme.tooltip.text,
  },
});

const tooltipTargetStylesheet = (theme) => ({
  tooltipTarget: {
    ...theme.tooltip.target,
  },
});

export const Tooltip = withStyles(tooltipStylesheet, { name: 'Tooltip' })(
  class Tooltip extends PureComponent {
    static propTypes = {
      content: PropTypes.any,
      borderType: PropTypes.string,
      placement: PropTypes.string,
    };

    render() {
      const {
        content,
        placement,
        borderType,
        children,
        classes,
        ...props
      } = this.props;

      return (
        <MUITooltip
          title={content}
          placement={placement || 'right'}
          PopperProps={{
            modifiers: {
              preventOverflow: { enabled: false },
              hide: { enabled: false },
            },
          }}
          classes={{
            popper: classes.popper,
            tooltip: clsx(
              classes.tooltip,
              borderType && classes[`tooltip${borderType}`],
            ),
            tooltipPlacementLeft: classes.tooltipLeft,
            tooltipPlacementRight: classes.tooltipRight,
            tooltipPlacementTop: classes.tooltipTop,
            tooltipPlacementBottom: classes.tooltipBottom,
          }}
          TransitionComponent={Zoom}
          enterTouchDelay={0}
          {...props}
        >
          {children}
        </MUITooltip>
      );
    }
  },
);

export const TooltipContent = withStyles(tooltipContentStylesheet, {
  name: 'TooltipContent',
})(({ title, text, classes }) => (
  <Fragment>
    <Typography variant="h6" classes={{ root: classes.tooltipTitle }}>
      {' '}
      {title}
      {' '}
    </Typography>
    <Typography classes={{ root: classes.tooltipText }}>
      {' '}
      {text}
      {' '}
    </Typography>
  </Fragment>
));

export const TooltipTarget = withStyles(tooltipTargetStylesheet, {
  name: 'TooltipTarget',
})(({
  children, classes, className, ...props
}) => (
  <span className={clsx(classes.tooltipTarget, className)} {...props}>
    {' '}
    {children}
    {' '}
  </span>
));
