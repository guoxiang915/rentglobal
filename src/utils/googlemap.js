/**
 * Get area of coordinates
 * @param {[[lat, lng]]} coordinates Array of coordinates
 */
export function area(coordinates) {
  if (!coordinates || !coordinates.length) return 1;
  if (coordinates.length === 1) return 1;

  let i,
    j,
    area = 0;
  for (i = 0, j = coordinates.length - 1; i < coordinates.length; j = i, i++) {
    area +=
      coordinates[i].lat * coordinates[j].lng -
      coordinates[j].lat * coordinates[i].lng;
  }

  return area / 2;
}

/**
 * Get center of coordinates
 * @param {[[lat, lng]]} coordinates Array of coordinates
 * @returns Center point of coordinates
 */
export function centeroid(coordinates) {
  if (!coordinates || !coordinates.length) return { lat: 0, lng: 0 };
  if (coordinates.length === 1) return coordinates.lat;

  let i,
    j,
    lat = 0,
    lng = 0;
  for (i = 0, j = coordinates.length - 1; i < coordinates.length; j = i, i++) {
    const f =
      coordinates[i].lat * coordinates[j].lng -
      coordinates[j].lat * coordinates[i].lng;
    lat += (coordinates[i].lat + coordinates[j].lat) * f;
    lng += (coordinates[i].lng + coordinates[j].lng) * f;
  }

  console.log(area(coordinates));
  const f = area(coordinates) * 6;

  return { lat: lat / f, lng: lng / f };
}
