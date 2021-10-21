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

export const Map = () => {
  return (
    <MapContainer
      center={MAP_CENTER_DEFAULT}
      zoom={MAP_ZOOM_DEFAULT}
      minZoom={MIN_ZOOM_DEFAULT}
    >
      <TileLayer attribution={TILE_SERVER_ATTRIBUTION} url={TILE_SERVER_URL} />
      <GridLayer />
      <SchoolsLayer />
    </MapContainer>
  );
};
