import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link as RouterLink } from "react-router-dom";
import { Link as MUILink, withStyles } from "@material-ui/core";
import clsx from "clsx";

const styleSheet = theme => ({
  root: {
    textDecoration: "none",
    cursor: "pointer",
    color: theme.colors.primary.darkGrey,
    "&:hover": {
      color: theme.colors.primary.mainColor
    },
    transition: "all .2s"
  }
});

class Link extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    styles: PropTypes.object
  };

  render() {
    const { classes, children, underline, styles, ...props } = this.props;

    return (
      <RouterLink
        className={clsx(classes.root, styles)}
        underline={underline ? underline : "none"}
        {...props}
      >
        {children}
      </RouterLink>
    );
  }
}

export default withStyles(styleSheet, { name: "Link" })(Link);
