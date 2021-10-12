import GeoJSON from "geojson";

export const convertToGeoJSON = (data) => {
  return GeoJSON.parse(data, { Point: ["Y", "X"] });
};
