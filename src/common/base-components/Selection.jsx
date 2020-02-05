import React, { PureComponent, Fragment } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import {
  FormControlLabel,
  Checkbox as MUICheckbox,
  Radio as MUIRadio,
  withStyles
} from "@material-ui/core";
import {
  CheckCircle,
  RadioButtonChecked,
  RadioButtonUnchecked
} from "@material-ui/icons";

const styleSheet = theme => ({
  root: {
    color: theme.colors.primary.darkGrey,
    padding: 5,
    margin: 0,
    border: "none",
    borderRadius: 99999,
    "&:hover": {
      color: theme.colors.primary.mainColor
    }
  },

  outlined: {
    background: "none",
    border: `1px solid ${theme.colors.primary.borderGrey}`,
    "&:hover": {
      border: `1px solid ${theme.colors.primary.mainColor}`
    }
  },

  contained: {
    color: theme.colors.primary.white,
    background: `${theme.colors.primary.mainColor}`,
    border: "none",
    "&:hover": {
      background: `${theme.colors.primary.darkColor}`,
      color: theme.colors.primary.white
    }
  },

  checkedOutlined: {
    border: `1px solid ${theme.colors.primary.mainColor} !important`
  },

  checkedContained: {
    background: `${theme.colors.primary.darkColor}`
  },

  rounded: {
    borderRadius: 99999
  },

  label: {
    fontSize: 16,
    width: "200%"
  },

  icon: {
    color: theme.colors.primary.darkGrey
  },

  checkedIcon: {
    color: theme.colors.primary.mainColor
  },

  primaryIcon: {
    color: theme.colors.primary.mainColor
  },

  controlStyle: {
    padding: 0,
    margin: 0,
    position: "absolute"
  },

  secondaryIcon: {
    color: theme.colors.primary.darkGrey
  },

  whiteIcon: {
    color: theme.colors.primary.white
  }
});

const Selection = withStyles(styleSheet, { name: "Selection" })(
  class Selection extends PureComponent {
    static propTypes = {
      isChecked: PropTypes.bool,
      onChange: PropTypes.func,
      label: PropTypes.string,
      control: PropTypes.any,
      classes: PropTypes.object.isRequired,
      icon: PropTypes.object,
      checkedIcon: PropTypes.object,
      variant: PropTypes.string
    };

    render() {
      let {
        classes,
        control: Control,
        icon: Icon,
        checkedIcon: CheckedIcon,
        variant,
        label,
        isChecked,
        onChange,
        ...props
      } = this.props;

      return (
        <FormControlLabel
          control={
            <Control
              icon={
                <Icon
                  classes={{
                    root: clsx(
                      classes.icon,
                      variant === "outlined" && classes.whiteIcon,
                      variant === "contained" && classes.whiteIcon
                    )
                  }}
                />
              }
              checkedIcon={
                <CheckedIcon
                  classes={{
                    root: clsx(
                      classes.checkedIcon,
                      variant === "outlined" && classes.primaryIcon,
                      variant === "contained" && classes.whiteIcon
                    )
                  }}
                />
              }
              checked={isChecked}
              onChange={onChange}
              className={classes.controlStyle}
            />
          }
          label={label}
          classes={{
            root: clsx(
              classes.root,
              variant === "outlined" && classes.outlined,
              variant === "outlined" && isChecked && classes.checkedOutlined,
              variant === "contained" && classes.contained,
              variant === "contained" && isChecked && classes.checkedContained
            ),
            label: classes.label
          }}
          {...props}
        />
      );
    }
  }
);

export const Radio = props => (
  <Selection
    control={MUIRadio}
    icon={RadioButtonUnchecked}
    checkedIcon={RadioButtonChecked}
    {...props}
  />
);

export const Checkbox = props => (
  <Selection
    control={MUICheckbox}
    icon={RadioButtonUnchecked}
    checkedIcon={CheckCircle}
    {...props}
  />
);

export const ExpandableSectionRadio = ({ onCheck, ...props }) => (
  <Radio
    onChange={isChecked => {
      if (isChecked) {
        onCheck();
      }
    }}
    {...props}
  />
);
