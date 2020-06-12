import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Icon, withStyles } from '@material-ui/core';
import { TextField, Button } from '.';
import useCombinedRefs from '../../utils/hooks/useCombinedRefs';

const styleSheet = () => ({
  root: {
    position: 'relative',
  },

  input: {
    textAlign: 'center',
    margin: '0 20px',
  },

  button: {
    position: 'absolute',
    width: 37,
    height: 37,
  },
});

const NumberField = React.forwardRef(
  ({ value, onChange, classes, className, readOnly, ...props }, ref) => {
    const inputRef = React.useRef();
    const innerRef = useCombinedRefs(ref, inputRef);

    const handleMinus = () => {
      if (onChange) {
        let newValue = (value ? Number(value) : 0) - 1;
        if (
          props.inputProps?.min !== undefined &&
          props.inputProps?.min !== null
        ) {
          newValue =
            newValue > props.inputProps.min ? newValue : props.inputProps.min;
        }
        onChange({ target: { value: newValue } });
      }
    };

    const handlePlus = () => {
      if (onChange) {
        let newValue = (value ? Number(value) : 0) + 1;
        if (
          props.inputProps?.max !== undefined &&
          props.inputProps?.max !== null
        ) {
          newValue =
            newValue < props.inputProps.max ? newValue : props.inputProps.max;
        }
        onChange({ target: { value: newValue } });
      }
    };

    return (
      <TextField
        type="number"
        value={value}
        onChange={onChange}
        className={clsx(className, classes.root)}
        styles={{ input: classes.input }}
        inputRef={innerRef}
        startAdornment={
          <Button
            variant="icon"
            link="secondary"
            background="borderLight"
            inverse
            onClick={handleMinus}
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
            onClick={handlePlus}
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
);

NumberField.propTypes = {
  value: PropTypes.any,
  onChange: PropTypes.func,
  classes: PropTypes.any.isRequired,
};

NumberField.defaultProps = {
  variant: 'outlined',
};

export default withStyles(styleSheet, { name: 'NumberField' })(NumberField);
