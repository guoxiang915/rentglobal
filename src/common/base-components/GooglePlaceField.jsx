import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import GooglePlacesAutocomplete, {
  geocodeByPlaceId,
  getLatLng,
} from "react-google-places-autocomplete";
import {
  Popper,
  withStyles,
  MenuList,
  MenuItem,
  Paper,
} from "@material-ui/core";
import clsx from "clsx";
import TextField from "./TextField";

const styleSheet = () => ({
  root: {},

  list: {},

  listItem: {},
});

class GooglePlaceField extends PureComponent {
  static propTypes = {
    value: PropTypes.any,
    onSelect: PropTypes.func,
    onChange: PropTypes.func,
    label: PropTypes.string,
    className: PropTypes.string,
    classes: PropTypes.any.isRequired,
    inputProps: PropTypes.object,
  };

  mapRef = React.createRef();

  state = { address: this.props.value };

  handleClick = (e, suggestion, onSelectSuggestion) => {
    onSelectSuggestion(suggestion, e);
    let detailedAddress = {};
    geocodeByPlaceId(suggestion.place_id)
      .then((results) => {
        const familiarResult = results[0];
        const { address_components: addressComponents = [] } = familiarResult;
        detailedAddress = {
          fullAddress: this.state.address,
          streetName:
            addressComponents.find(
              (component) => component.types[0] === "street_address"
            )?.long_name ||
            (addressComponents.find(
              (component) => component.types[0] === "route"
            )?.long_name
              ? `${
                  addressComponents.find(
                    (component) => component.types[0] === "route"
                  )?.long_name
              } `
              : "" +
                `${
                  addressComponents.find(
                    (component) => component.types[0] === "street_number"
                  )?.long_name || ""
                }`),
          city: addressComponents.find(
            (component) => component.types[0] === "locality"
          )?.long_name,
          state: addressComponents.find(
            (component) => component.types[0] === "administrative_area_level_1"
          )?.long_name,
          zipCode: addressComponents.find(
            (component) => component.types[0] === "postal_code"
          )?.long_name,
          country: addressComponents.find(
            (component) => component.types[0] === "country"
          )?.long_name,
        };
        return getLatLng(familiarResult);
      })
      .then(({ lat, lng }) => {
        detailedAddress = {
          ...detailedAddress,
          coordinates: { lat, lng },
        };
        if (this.props.onSelect) {
          this.props.onSelect(detailedAddress);
        }
      });
  };

  componentDidUpdate(prevProps) {
    if (prevProps.value !== this.props.value) {
      this.setState({ address: this.props.value });
    }
  }

  render() {
    const {
      classes: s,
      className,
      inputProps: InputProps,
      onChange,
    } = this.props;
    const { address } = this.state;
    return (
      <React.Fragment>
        <GooglePlacesAutocomplete
          className={s.googlePlaces}
          // initialValue={address}
          value={address}
          onSelect={({ description }) => {
            this.setState({ address: description });
          }}
          renderInput={(inputProps) => (
            <TextField
              {...inputProps}
              {...InputProps}
              value={address}
              innerRef={this.mapRef}
              onChange={(e) => {
                if (inputProps.onChange) {
                  inputProps.onChange(e);
                }
                if (onChange) {
                  onChange(e);
                }
              }}
            />
          )}
          renderSuggestions={(active, suggestions, onSelectSuggestion) => {
            return (
              <Popper
                open
                anchorEl={this.mapRef.current}
                className={clsx(s.root)}
              >
                <Paper>
                  <MenuList className={clsx(s.list, className)}>
                    {suggestions &&
                      suggestions.map((suggestion) => (
                        <MenuItem
                          className={s.listItem}
                          key={suggestion.id}
                          onClick={(e) =>
                            this.handleClick(e, suggestion, onSelectSuggestion)
                          }
                        >
                          {suggestion.description}
                        </MenuItem>
                      ))}
                  </MenuList>
                </Paper>
              </Popper>
            );
          }}
        />
      </React.Fragment>
    );
  }
}

export default withStyles(styleSheet, { name: "GooglePlaceField" })(
  GooglePlaceField
);
