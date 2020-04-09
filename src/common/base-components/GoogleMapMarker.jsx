import React from "react";
import { withTheme } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/styles";
import { Badge } from "@material-ui/core";
import { PinGeneralIcon } from ".";

const useStyles = makeStyles({
  root: {
    position: "relative",
  },

  tooltipWrapper: {
    position: "absolute",
    bottom: (props) => props.size + 10,
    left: 0,
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "center",
  },

  tooltip: {
    position: "absolute",
    zIndex: 1,
    border: (props) => `1px solid ${props.theme.colors.primary.mainColor}`,
    borderRadius: 8,
    background: (props) => props.theme.colors.primary.white,
    padding: 12,
    boxShadow: `0px 2px 6px #00000014`,
    "&:after": {
      content: '""',
      display: "block",
      position: "absolute",
      bottom: -9,
      left: "calc(50% - 7px)",
      width: 16,
      height: 16,
      background: (props) => props.theme.colors.primary.white,
      border: (props) => `1px solid ${props.theme.colors.primary.mainColor}`,
      borderTop: "none !important",
      borderLeft: "none !important",
      transform: "rotate(45deg)",
    },
  },

  badge: {
    marginTop: (props) => -props.size / 4,
    marginRight: (props) => props.size / 4,
  },

  marker: {
    width: (props) => props.size,
    height: (props) => props.size,
    marginLeft: (props) => -props.size / 2,
    marginTop: (props) => -props.size / 2,
    backgroundColor: (props) => props.theme.colors.primary[props.color],
    padding: (props) => props.size / 4,
    borderRadius: (props) => props.size / 2,
    boxShadow: (props) =>
      `0 0 0 ${props.shadowWidth}px ${
        props.theme.colors.primary[props.color]
      }50`,
    cursor: "pointer",
  },
});

const Marker = ({
  theme,
  shadowWidth = 5,
  color = "darkGrey",
  size = 40,
  tooltip = null,
  badge = "",
  onClick = () => {},
}) => {
  const classes = useStyles({ theme, color, size, shadowWidth });

  return (
    <div className={classes.root}>
      {tooltip && (
        <div className={classes.tooltipWrapper}>
          <div className={classes.tooltip}>{tooltip}</div>
        </div>
      )}
      <Badge
        color="error"
        badgeContent={badge}
        invisible={!badge}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        classes={{ badge: classes.badge }}
      >
        <PinGeneralIcon className={classes.marker} onClick={onClick} />
      </Badge>
    </div>
  );
};

export default withTheme(Marker);
