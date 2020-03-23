import React, { useState } from "react";
import GoogleMapReact from 'google-map-react';
import { PinGeneralIcon } from "./";
import { withStyles } from "@material-ui/core";

export const markerStylesheet = theme => ({
  marker: {
    width: 50,
    height: 50
  }
});

const Marker = withStyles(markerStylesheet, {
  name: "Marker"
})(({ classes }) => (
  <PinGeneralIcon
    className={ classes.marker }
  />
));

const SimpleMap = (props) => {
    const [center, setCenter] = useState({lat: 11.0168, lng: 76.9558 });
    const [zoom, setZoom] = useState(11);
    return (
        <div style={{ height: '100%', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'replace your api' }}
          defaultCenter={center}
          defaultZoom={zoom}
        >
          <Marker
            lat={11.0168}
            lng={76.9558}
          />
        </GoogleMapReact>
      </div>
    );
}

export default SimpleMap;