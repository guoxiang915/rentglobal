import React from "react";
import GoogleMapReact from 'google-map-react';
import { PinGeneralIcon } from "./";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  marker: {
    width: 40,
    height: 40,
    marginLeft: -20,
    marginTop: -20,
    backgroundColor: "#525252",
    padding: 10,
    borderRadius: 20,
    boxShadow: props => `0 0 0 ${props.shadowWidth}px rgba(0, 0, 0, 0.2)`
  }
});

const Marker = (({ classes }) => (
  <PinGeneralIcon
    className={ classes.marker }
  />
));

const SimpleMap = ({ coordinates = { lat: 45.5017, lng: -73.5673 }, shadowWidth = 5 }) => {
    const zoom = 11;
    const classes = useStyles({ shadowWidth });

    return (
        <div style={{ height: '100%', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyCFjI4tzrBQzlNgWorViS48057MOvcn_VY' }}
          defaultCenter={{ lat: 45.5017, lng: -73.5673 }}
          defaultZoom={zoom}
          center={coordinates}
        >
          <Marker
            lat={coordinates.lat}
            lng={coordinates.lng}
            classes={classes}
          />
        </GoogleMapReact>
      </div>
    );
}

export default SimpleMap;