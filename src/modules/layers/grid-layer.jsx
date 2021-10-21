import React, { useState } from "react";
import { useMapEvent } from "react-leaflet";
import { useGetGrid } from "../../api/grid";
import { useSelector } from "react-redux";
import {
  getGridStyleField,
  getSelectedCategory,
} from "../../root-slice/root-selectors";
import { getMapExtent } from "./utils";
import { GeoJSON } from "../../components/geojson";

export const GridLayer = () => {
  const map = useMapEvent("moveend", () => setMapExtent(getMapExtent(map)));
  const [mapExtent, setMapExtent] = useState(getMapExtent(map));

  const selectedCategory = useSelector(getSelectedCategory);
  const curGridStyleField = useSelector(getGridStyleField);

  const { data } = useGetGrid(mapExtent, !!selectedCategory);

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

  if (!data) return null;

  return <GeoJSON data={data} style={gridStyle} zIndex={-1000} />;
};
