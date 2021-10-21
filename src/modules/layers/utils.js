export const getMapExtent = (map) => {
  const bounds = map.getBounds();
  return {
    lat_min: bounds.getSouth(),
    lat_max: bounds.getNorth(),
    lon_min: bounds.getWest(),
    lon_max: bounds.getEast(),
  };
};
