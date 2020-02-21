import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link as RouterLink } from "react-router-dom";
import { withStyles } from "@material-ui/core";
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
  },
  ...theme.links
});

class Link extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    styles: PropTypes.any
  };

  render() {
    const {
      classes,
      children,
      underline,
      variant,
      styles,
      ...props
    } = this.props;

    return (
      <RouterLink
        className={clsx(
          classes.root,
          variant && classes[variant],
          styles
        )}
        underline={underline ? underline : "none"}
        {...props}
      >
        {children}
      </RouterLink>
    );
  }
}

export default withStyles(styleSheet, { name: "Link" })(Link);
