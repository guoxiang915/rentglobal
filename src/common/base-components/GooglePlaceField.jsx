import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GooglePlacesAutocomplete, {
  geocodeByPlaceId,
  getLatLng,
} from 'react-google-places-autocomplete';
import {
  Popper,
  withStyles,
  MenuList,
  MenuItem,
  Paper,
} from '@material-ui/core';
import TextField from './TextField';
import clsx from 'clsx';

const styleSheet = () => ({
  root: {},

  list: {},

  listItem: {},
});

class GooglePlaceField extends Component {
  static propTypes = {
    value: PropTypes.any,
    onChange: PropTypes.func,
    onSelect: PropTypes.func,
    label: PropTypes.string,
    startAdornment: PropTypes.any,
    endAdornment: PropTypes.any,
    className: PropTypes.string,
    classes: PropTypes.any.isRequired,
    type: PropTypes.string,
    variant: PropTypes.string,
    inputProps: PropTypes.object,
  };

  static defaultProps = {
    variant: 'outlined',
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
              (component) => component.types[0] === 'street_address'
            )?.long_name ||
            `${
              addressComponents.find(
                (component) => component.types[0] === 'route'
              )?.long_name
            } ${
              addressComponents.find(
                (component) => component.types[0] === 'street_number'
              )?.long_name || ''
            }`,
          city: addressComponents.find(
            (component) => component.types[0] === 'locality'
          )?.long_name,
          state: addressComponents.find(
            (component) => component.types[0] === 'administrative_area_level_1'
          )?.long_name,
          zipCode: addressComponents.find(
            (component) => component.types[0] === 'postal_code'
          )?.long_name,
          country: addressComponents.find(
            (component) => component.types[0] === 'country'
          )?.long_name,
        };
        return getLatLng(familiarResult);
      })
      .then(({ lat, lng }) => {
        detailedAddress = {
          ...detailedAddress,
          coordinates: { lat, lng },
        };
        this.props.onSelect(detailedAddress);
      });
  };

  componentDidUpdate(prevProps) {
    if (prevProps.value !== this.props.value) {
      this.setState({ address: this.props.value });
    }
  }

  render() {
    const { classes: s, className, inputProps: InputProps } = this.props;
    const { address } = this.state;
    return (
      <React.Fragment>
        <GooglePlacesAutocomplete
          className={s.googlePlaces}
          initialValue={address}
          onSelect={({ description }) => {
            this.setState({ address: description });
          }}
          renderInput={(inputProps) => (
            <TextField {...inputProps} {...InputProps} innerRef={this.mapRef} />
          )}
          renderSuggestions={(active, suggestions, onSelectSuggestion) => {
            return (
              <Popper
                open={true}
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

export default withStyles(styleSheet, { name: 'GooglePlaceField' })(
  GooglePlaceField
);
