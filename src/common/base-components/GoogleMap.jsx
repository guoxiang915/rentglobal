import React from "react";
import GoogleMapReact from "google-map-react";
import { PinGeneralIcon } from "./";
import { makeStyles } from "@material-ui/styles";
import { fitBounds } from "google-map-react/utils";

const useStyles = makeStyles({
  map: {
    width: "100%",
    height: "100%",
    borderRadius: props => props.borderRadius,
    overflow: "hidden"
  },
  marker: {
    width: 40,
    height: 40,
    marginLeft: -20,
    marginTop: -20,
    backgroundColor: "#525252",
    padding: 10,
    borderRadius: 20,
    boxShadow: props => `0 0 0 ${props.shadowWidth}px rgba(0, 0, 0, 0.2)`,
    cursor: "pointer"
  }
});

const Marker = ({ classes, onClick }) => (
  <PinGeneralIcon className={classes.marker} onClick={onClick} />
);

const SimpleMap = ({
  coordinates = [{ lat: 45.5017, lng: -73.5673 }],
  shadowWidth = 5,
  borderRadius = 5,
  onClick,
  onClickMarker
}) => {
  const classes = useStyles({ shadowWidth, borderRadius });
  const size = { width: 640, height: 640 };

  /** get center of coordinates */
  let center = { lat: 0, lng: 0 },
    zoom = 11;
  if (coordinates) {
    if (coordinates.length === 1) {
      center = coordinates[0];
    } else {
      const bounds = {
        ne: { lat: -1000, lng: 1000 },
        sw: { lat: 1000, lng: -1000 }
      };
      coordinates.forEach(coord => {
        if (coord.lat > bounds.ne.lat) bounds.ne.lat = coord.lat;
        if (coord.lat < bounds.sw.lat) bounds.sw.lat = coord.lat;
        if (coord.lng < bounds.ne.lng) bounds.ne.lng = coord.lng;
        if (coord.lng > bounds.sw.lng) bounds.sw.lng = coord.lng;
      });
      const fitBound = fitBounds(bounds, size);
      center = fitBound.center;
      zoom = fitBound.zoom;
    }
  }

  /** event listeners */
  const handleClickMarker = coord => () => {
    if (onClickMarker) onClickMarker(coord);
  };

  return (
    <div className={classes.map}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyCFjI4tzrBQzlNgWorViS48057MOvcn_VY" }}
        defaultCenter={{ lat: 45.5017, lng: -73.5673 }}
        defaultZoom={11}
        center={center}
        zoom={zoom}
        onClick={onClick}
      >
        {coordinates.map((coord, index) => (
          <Marker
            key={index}
            lat={coord.lat}
            lng={coord.lng}
            classes={classes}
            onClick={handleClickMarker(coord)}
          />
        ))}
      </GoogleMapReact>
    </div>
  );
};

export default SimpleMap;
