import React from "react";
import { withStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const styleSheet = theme => ({
  progress: {
    margin: theme.spacing(2)
  },
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }
});

const Spinner = props => {
  const { classes, ...prop } = props;
  return (
    <div className={classes.container}>
      <CircularProgress
        className={classes.progress}
        color="primary"
        {...prop}
      />
    </div>
  );
};

export default withStyles(styleSheet)(Spinner);
