import React, { PureComponent } from 'react';

export const withHover = (C) => class WithHover extends PureComponent {
    state = {
      isHover: false,
    };

    handleHoverChange = (isHover) => () => {
      this.setState({ isHover });
    };

    render() {
      return (
        <C
          hover={{
            isHover: this.state.isHover,
            onMouseEnter: this.handleHoverChange(true),
            onMouseLeave: this.handleHoverChange(false),
          }}
          {...this.props}
        />
      );
    }
};
