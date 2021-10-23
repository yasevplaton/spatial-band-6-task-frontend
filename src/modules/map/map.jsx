import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import {
  MAP_CENTER_DEFAULT,
  MAP_ZOOM_DEFAULT,
  TILE_SERVER_ATTRIBUTION,
  TILE_SERVER_URL,
  MIN_ZOOM_DEFAULT,
} from "config/constants";
import { SchoolsLayer, GridLayer } from "../layers";
import { useSelector } from "react-redux";
import {
  getSelectedCategory,
  getVisible,
} from "../../root-slice/root-selectors";

export const Map = () => {
  const category = useSelector(getSelectedCategory);
  const schoolsVisible = useSelector(getVisible("schools"));
  const gridVisible = useSelector(getVisible("grid"));
  return (
    <MapContainer
      center={MAP_CENTER_DEFAULT}
      zoom={MAP_ZOOM_DEFAULT}
      minZoom={MIN_ZOOM_DEFAULT}
    >
      <TileLayer attribution={TILE_SERVER_ATTRIBUTION} url={TILE_SERVER_URL} />

      {category && gridVisible && <GridLayer />}
      {category && schoolsVisible && <SchoolsLayer />}
    </MapContainer>
  );
};
