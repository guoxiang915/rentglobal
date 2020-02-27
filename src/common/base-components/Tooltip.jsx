import React, { PureComponent, Fragment } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import {
  Tooltip as MUITooltip,
  Typography,
  withStyles,
  withTheme,
  Zoom
} from "@material-ui/core";

export const tooltipStylesheet = theme => ({
  popper: {},

  tooltip: {
    borderRadius: 8,
    backgroundColor: theme.colors.primary.white,
    padding: 18,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    border: `1px solid ${theme.colors.primary.borderGrey}`,
    boxShadow: `0px 2px 6px #00000014`,
    position: "relative"
  },

  tooltipRight: {
    "&:before": {
      content: '""',
      display: "block",
      position: "absolute",
      top: "calc(50% - 7px)",
      left: -8,
      width: 16,
      height: 16,
      background: theme.colors.primary.white,
      border: `1px solid ${theme.colors.primary.borderGrey}`,
      borderTop: "none",
      borderRight: "none",
      transform: "rotate(45deg)"
    }
  },

  tooltipLeft: {
    "&:after": {
      content: '""',
      display: "block",
      position: "absolute",
      top: "calc(50% - 7px)",
      right: -8,
      width: 16,
      height: 16,
      background: theme.colors.primary.white,
      border: `1px solid ${theme.colors.primary.borderGrey}`,
      borderBottom: "none",
      borderLeft: "none",
      transform: "rotate(45deg)"
    }
  },

  tooltipTop: {
    "&:after": {
      content: '""',
      display: "block",
      width: 0,
      height: 0,
      position: "absolute",
      borderLeft: "8px solid transparent",
      borderRight: "8px solid transparent",
      borderTop: "8px solid rgb(100, 100, 100)",
      bottom: -8,
      left: "calc(50% - 7px)"
    }
  },

  tooltipBottom: {
    "&:before": {
      content: '""',
      display: "block",
      position: "absolute",
      top: -9,
      left: "calc(50% - 7px)",
      width: 16,
      height: 16,
      background: theme.colors.primary.white,
      border: `1px solid ${theme.colors.primary.borderGrey}`,
      borderBottom: "none",
      borderRight: "none",
      transform: "rotate(45deg)"
    }
  },

  tooltipprimary: {
    borderColor: theme.colors.primary.mainColor,
    "&:before": {
      borderColor: theme.colors.primary.mainColor
    },
    "&:after": {
      borderColor: theme.colors.primary.mainColor
    }
  },

  tooltiperrorRed: {
    borderColor: theme.colors.primary.errorRed,
    "&:before": {
      borderColor: theme.colors.primary.errorRed
    },
    "&:after": {
      borderColor: theme.colors.primary.errorRed
    }
  }
});

export const tooltipContentStylesheet = theme => ({
  tooltipTitle: {
    ...theme.tooltip.title
  },

  tooltipText: {
    ...theme.tooltip.text
  }
});

export const tooltipTargetStylesheet = theme => ({
  tooltipTarget: {
    ...theme.tooltip.target
  }
});

export const Tooltip = withTheme(
  withStyles(tooltipStylesheet, { name: "Tooltip" })(
    class Tooltip extends PureComponent {
      static propTypes = {
        content: PropTypes.any,
        borderType: PropTypes.string,
        theme: PropTypes.object,
        placement: PropTypes.string
      };

      render() {
        let {
          content,
          placement,
          theme,
          borderType,
          children,
          classes,
          ...props
        } = this.props;

        return (
          <MUITooltip
            title={content}
            placement={placement ? placement : "right"}
            PopperProps={{
              modifiers: {
                preventOverflow: { enabled: false },
                hide: { enabled: false }
              }
            }}
            classes={{
              popper: classes.popper,
              tooltip: clsx(
                classes.tooltip,
                borderType && classes[`tooltip${borderType}`]
              ),
              tooltipPlacementLeft: classes.tooltipLeft,
              tooltipPlacementRight: classes.tooltipRight,
              tooltipPlacementTop: classes.tooltipTop,
              tooltipPlacementBottom: classes.tooltipBottom
            }}
            TransitionComponent={Zoom}
            enterTouchDelay={0}
            {...props}
          >
            {children}
          </MUITooltip>
        );
      }
    }
  )
);

export const TooltipContent = withStyles(tooltipContentStylesheet, {
  name: "TooltipContent"
})(({ title, text, classes }) => (
  <Fragment>
    <Typography variant="h6" classes={{ root: classes.tooltipTitle }}>
      {" "}
      {title}{" "}
    </Typography>
    <Typography classes={{ root: classes.tooltipText }}> {text} </Typography>
  </Fragment>
));

export const TooltipTarget = withStyles(tooltipTargetStylesheet, {
  name: "TooltipTarget"
})(({ children, classes, className, ...props }) => (
  <span className={clsx(classes.tooltipTarget, className)} {...props}>
    {" "}
    {children}{" "}
  </span>
));
