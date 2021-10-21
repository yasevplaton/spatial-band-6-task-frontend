/**
 * @file Component to render geojson as vector tile with `geojson-vt`.
 * @name GeoJSONVtLayer.js
 */
import L from "leaflet";
import {
  createTileLayerComponent,
  updateGridLayer,
  withPane,
} from "@react-leaflet/core";
import geojsonvt from "geojson-vt";
window.geojsonvt = geojsonvt;
// eslint-disable-next-line import/first
import {} from "leaflet-geojson-vt";

export const GeoJSONVtLayer = createTileLayerComponent(function createGridLayer(
  { geoJSON, ...options },
  context
) {
  return {
    instance: L.gridLayer.geoJson(geoJSON, withPane(options, context)),
    context,
  };
},
updateGridLayer);
