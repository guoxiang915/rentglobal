/**
 * Get area of coordinates
 * @param {[[lat, lng]]} coordinates Array of coordinates
 */
export function area(coordinates) {
  if (!coordinates || !coordinates.length) return 1;
  if (coordinates.length === 1) return 1;

  let i;
  let j;
  let size = 0;
  for (i = 0, j = coordinates.length - 1; i < coordinates.length; j = i, i++) {
    size
      += coordinates[i].lat * coordinates[j].lng
      - coordinates[j].lat * coordinates[i].lng;
  }

  return size / 2;
}

/**
 * Get center of coordinates
 * @param {[[lat, lng]]} coordinates Array of coordinates
 * @returns Center point of coordinates
 */
export function centeroid(coordinates) {
  if (!coordinates || !coordinates.length) return { lat: 0, lng: 0 };
  if (coordinates.length === 1) return coordinates.lat;

  let i;
  let j;
  let lat = 0;
  let lng = 0;
  for (
    i = 0, j = coordinates.length - 1;
    i < coordinates.length;
    j = i, i += 1
  ) {
    const f = coordinates[i].lat * coordinates[j].lng
      - coordinates[j].lat * coordinates[i].lng;
    lat += (coordinates[i].lat + coordinates[j].lat) * f;
    lng += (coordinates[i].lng + coordinates[j].lng) * f;
  }

  const f = area(coordinates) * 6;

  return { lat: lat / f, lng: lng / f };
}

/**
 * Convert lng and long distance to meters
 * @param {lat, lng} coordinate1 First coordinate
 * @param {lat, lng} coordinate2 Second coordinate
 * @returns Distance in meters
 */
export function geoDistance(coordinate1, coordinate2) {
  if (!coordinate1) return 0;
  if (!coordinate2) return 0;

  const R = 6378.137; // Radius of earth in KM
  const dLat = coordinate2.lat * Math.PI / 180 - coordinate1.lat * Math.PI / 180;
  const dLon = coordinate2.lng * Math.PI / 180 - coordinate1.lng * Math.PI / 180;
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) 
            + Math.cos(coordinate1.lat * Math.PI / 180) * Math.cos(coordinate2.lat * Math.PI / 180)
            * Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const d = R * c;
  return d * 1000;
}
