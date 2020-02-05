import React, { PureComponent } from "react";
import clsx from "clsx";
import { Divider as MUIDivider, withStyles } from "@material-ui/core";

const styleSheet = theme => {
  let unit = 1;
  return {
    divider: {
      width: "100%",
      backgroundColor: theme.colors.primary.borderGrey,
      height: unit
    },
    half: {
      height: 0.5 * unit
    },
    single: {
      height: unit
    },
    double: {
      height: 2 * unit
    },
    light: {
      backgroundColor: theme.colors.primary.borderGrey
    },
    dark: {
      backgroundColor: theme.colors.primary.darkGrey
    }
  };
};

const Divider = ({ classes, half, single, double, light, dark, ...props }) => (
  <div
    className={clsx({
      [classes.divider]: true,
      [classes.half]: half,
      [classes.single]: single,
      [classes.double]: double,
      [classes.light]: light,
      [classes.dark]: dark
    })}
  />
);

export default withStyles(styleSheet, { name: "Divider" })(Divider);
