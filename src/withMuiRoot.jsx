import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";

function withMuiRoot(Component) {
  function WithMuiRoot(props) {
    // MuiThemeProvider makes the theme available down the React tree
    // thanks to React context.
    return (
      <>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Component {...props} />
      </>
    );
  }

  return WithMuiRoot;
}

export default withMuiRoot;
