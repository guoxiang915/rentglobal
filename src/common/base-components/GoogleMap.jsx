import React from 'react';
import GoogleMapReact from 'google-map-react';
import { makeStyles } from '@material-ui/styles';
import { fitBounds } from 'google-map-react/utils';
import { GoogleMapMarker } from '.';

const useStyles = makeStyles({
  map: {
    width: '100%',
    height: '100%',
    borderRadius: (props) => props.borderRadius,
    overflow: 'hidden',
  },
});

const SimpleMap = ({
  coordinates = [{ lat: 45.5017, lng: -73.5673 }],
  shadowWidth = 5,
  borderRadius = 5,
  onClick,
  markers = null,
  center: c = null,
  onClickMarker,
}) => {
  const classes = useStyles({ shadowWidth, borderRadius });
  const size = { width: 640, height: 640 };

  /** get center of coordinates */
  let center = { lat: 0, lng: 0 };
  let zoom = 11;
  if (c) {
    center = c;
  } else if (coordinates) {
    if (coordinates.length === 1) {
      center = coordinates[0];
    } else {
      const bounds = {
        ne: { lat: -1000, lng: 1000 },
        sw: { lat: 1000, lng: -1000 },
      };
      coordinates.forEach((coord) => {
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
  const handleClickMarker = (coord) => () => {
    if (onClickMarker) onClickMarker(coord);
  };

  return (
    <div className={classes.map}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyCFjI4tzrBQzlNgWorViS48057MOvcn_VY' }}
        defaultCenter={{ lat: 45.5017, lng: -73.5673 }}
        defaultZoom={11}
        center={center}
        zoom={zoom}
        onClick={onClick}
      >
        {markers ||
          coordinates.map((coord, index) => (
            <GoogleMapMarker
              key={index}
              lat={coord.lat}
              lng={coord.lng}
              onClick={handleClickMarker(coord)}
              icon={coord.icon}
              iconComponent={coord.iconComponent}
            />
          ))}
      </GoogleMapReact>
    </div>
  );
};

export default SimpleMap;
