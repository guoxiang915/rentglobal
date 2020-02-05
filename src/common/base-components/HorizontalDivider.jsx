import React from "react";
import { Grid, Typography, withStyles } from "@material-ui/core";
import clsx from "clsx";

const styleSheet = theme => {
  let unit = 1;
  return {
    container: {
      position: "relative",
      width: "100%",
      textAlign: "center",
      overflow: "hidden"
    },

    text: {
      fontSize: "14px",
      fontWeight: "normal",
      color: "#A3A3A3",
      "&::before, &::after": {
        content: "''",
        display: "block",
        width: "50%",
        height: "1.1px",
        background: "#A3A3A3",
        position: "absolute",
        top: "50%",
        left: "0",
        //   boxSizing: "border-box",
        marginRight: "-14px",
        marginLeft: "-14px"
      },
      "&::before": {},
      "&::after": {
        left: "auto",
        right: "0"
      }
    },

    half: {
      "&::before, &::after": {
        height: 0.5 * unit
      }
    },

    single: {
      "&::before, &::after": {
        height: unit
      }
    },

    double: {
      "&::before, &::after": {
        height: 2 * unit
      }
    },

    light: {
      "&::before, &::after": {
        backgroundColor: theme.colors.primary.borderGrey
      }
    },

    dark: {
      "&::before, &::after": {
        backgroundColor: theme.colors.primary.darkGrey
      }
    }
  };
};

export default withStyles(styleSheet, { name: "HorizontalDivider" })(
  ({ className, classes, ...props }) => (
    <Grid container spacing={0} className={className}>
      <div className={classes.container}>
        <Typography
          type="display1"
          component="span"
          className={clsx({
            [classes.text]: true,
            [classes.half]: props.half,
            [classes.single]: props.single,
            [classes.double]: props.double,
            [classes.light]: props.light,
            [classes.dark]: props.dark
          })}
        >
          {props.text}
        </Typography>
      </div>
    </Grid>
  )
);
