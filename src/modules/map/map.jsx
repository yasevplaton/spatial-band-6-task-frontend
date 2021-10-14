import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import {
  MAP_CENTER_DEFAULT,
  MAP_ZOOM_DEFAULT,
  TILE_SERVER_ATTRIBUTION,
  TILE_SERVER_URL,
  MIN_ZOOM_DEFAULT,
} from "config/constants";
import { MarkerCollection } from "../../components/marker-collection";
import { withLoading } from "../withLoading";
import { useSchoolData } from "./hooks";

const AsyncMarkers = withLoading(MarkerCollection);

export const Map = () => {
  const { data, status, radiusScale, colorScale } = useSchoolData();
  return (
    <MapContainer
      center={MAP_CENTER_DEFAULT}
      zoom={MAP_ZOOM_DEFAULT}
      minZoom={MIN_ZOOM_DEFAULT}
    >
      <TileLayer attribution={TILE_SERVER_ATTRIBUTION} url={TILE_SERVER_URL} />
      <AsyncMarkers
        data={data}
        status={status}
        radiusScale={radiusScale}
        colorScale={colorScale}
      />
    </MapContainer>
  );
};
