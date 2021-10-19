import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import {
  MAP_CENTER_DEFAULT,
  MAP_ZOOM_DEFAULT,
  TILE_SERVER_ATTRIBUTION,
  TILE_SERVER_URL,
  MIN_ZOOM_DEFAULT,
} from "config/constants";
import { SchoolsLayer } from "../layers";
import { useGetGrid } from "../../api/grid";
import { GeoJSON } from "react-leaflet";
import { withLoading } from "../withLoading";
import { useSelector } from "react-redux";
import {
  getGridStyleField,
  getSelectedCategory,
} from "../../root-slice/root-selectors";

const AsyncGeoJSON = withLoading(GeoJSON);

export const Map = () => {
  const selectedCategory = useSelector(getSelectedCategory);
  const curGridStyleField = useSelector(getGridStyleField);

  const { data, status } = useGetGrid(!!selectedCategory);

  const gridStyle = (feature) => {
    const { properties } = feature;
    const fillColor = properties.colors[curGridStyleField];
    return {
      fillColor,
      weight: 1,
      opacity: 1,
      fillOpacity: 1,
    };
  };

  return (
    <MapContainer
      center={MAP_CENTER_DEFAULT}
      zoom={MAP_ZOOM_DEFAULT}
      minZoom={MIN_ZOOM_DEFAULT}
    >
      <TileLayer attribution={TILE_SERVER_ATTRIBUTION} url={TILE_SERVER_URL} />
      <SchoolsLayer />
      <AsyncGeoJSON data={data} status={status} style={gridStyle} />
    </MapContainer>
  );
};
