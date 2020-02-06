import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";

const styleSheet = theme => ({
  root: {
    flexGrow: 1
  },

  landingBoard: {
    width: "100%",
    background: `url(${require("../../assets/img/img_header.jpg")}) 0% 0% no-repeat padding-box`,
    backgroundSize: "contain"
  }
});

class Home extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.landingBoard}></div>
      </div>
    );
  }
}

export default withStyles(styleSheet)(Home);
