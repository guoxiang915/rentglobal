import React, { Component } from "react";
import PropTypes from "prop-types";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import TextField from "./TextField";

class GooglePlaceField extends Component {
  state = {
    address: ""
  };

  static propTypes = {
    value: PropTypes.any,
    onChange: PropTypes.func,
    label: PropTypes.string,
    startAdornment: PropTypes.any,
    endAdornment: PropTypes.any,
    fullWidth: PropTypes.bool,
    className: PropTypes.string,
    errorHelper: PropTypes.bool,
    type: PropTypes.string,
    variant: PropTypes.string
  };

  static defaultProps = {
    variant: "outlined"
  };

  render() {
    return (
      <>
        <GooglePlacesAutocomplete
          onSelect={({ description }) => {
            this.setState({ address: description });
          }}
          renderInput={(props) => (
            <TextField
              {...this.props}
              {...props}
            />
          )}
          loader={
            <></>
          }
          renderSuggestions={(active, suggestions, onSelectSuggestion) => {
            console.log('Render Suggestion: ', active, suggestions, onSelectSuggestion);
            return (
              <>
                <ul>
                  <li>Hello</li>
                  <li>Hello There</li>
                </ul>
              </>
            );
          }}
        />
      </>
    )
  }
}

export default GooglePlaceField;
