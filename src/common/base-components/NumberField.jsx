import React, { Component } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { Icon, withStyles } from "@material-ui/core";
import { TextField, Button } from ".";

const styleSheet = () => ({
  root: {
    position: "relative",
  },

  input: {
    textAlign: "center",
    margin: "0 20px",
  },

  button: {
    position: "absolute",
    width: 37,
    height: 37,
  },
});

class NumberField extends Component {
  static propTypes = {
    value: PropTypes.any,
    onChange: PropTypes.func,
    classes: PropTypes.any.isRequired,
  };

  static defaultProps = {
    variant: "outlined",
  };

  handleMinus = () => {
    if (this.props.onChange) {
      this.props.onChange({
        target: {
          value: (this.props.value ? Number(this.props.value) : 0) - 1,
        },
      });
    }
  };

  handlePlus = () => {
    if (this.props.onChange) {
      this.props.onChange({
        target: {
          value: (this.props.value ? Number(this.props.value) : 0) + 1,
        },
      });
    }
  };

  render() {
    let { value, onChange, classes, className, ...props } = this.props;

    return (
      <TextField
        type="number"
        value={value}
        onChange={onChange}
        className={clsx(className, classes.root)}
        styles={{ input: classes.input }}
        startAdornment={
          <Button
            variant="icon"
            link="secondary"
            background="borderLight"
            inverse
            onClick={this.handleMinus}
            className={classes.button}
            style={{ left: 6 }}
          >
            <Icon>remove</Icon>
          </Button>
        }
        endAdornment={
          <Button
            variant="icon"
            link="secondary"
            background="borderLight"
            inverse
            onClick={this.handlePlus}
            className={classes.button}
            style={{ right: 6 }}
          >
            <Icon>add</Icon>
          </Button>
        }
        {...props}
      />
    );
  }
}

export default withStyles(styleSheet, { name: "NumberField" })(NumberField);
