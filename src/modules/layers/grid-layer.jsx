import React, { useState } from "react";
import { Pane, useMapEvent } from "react-leaflet";
import { useGetGrid } from "../../api/grid";
import { useSelector } from "react-redux";
import {
  getGridStyleField,
  getSelectedCategory,
} from "../../root-slice/root-selectors";
import { getMapExtent } from "./utils";
import { GeoJSON } from "../../components/geojson";
import { withLoading } from "../withLoading";

const GridPane = ({ data, gridStyle }) => (
  <Pane name="grid" style={{ zIndex: 300 }}>
    <GeoJSON data={data} style={gridStyle} />
  </Pane>
);

const AsyncGrid = withLoading(GridPane);

export const GridLayer = () => {
  const map = useMapEvent("moveend", () => setMapExtent(getMapExtent(map)));
  const [mapExtent, setMapExtent] = useState(getMapExtent(map));

  const selectedCategory = useSelector(getSelectedCategory);
  const curGridStyleField = useSelector(getGridStyleField);

  const { data, status } = useGetGrid(mapExtent, !!selectedCategory);

  const gridStyle = (feature) => {
    const { properties } = feature;
    const fillColor = properties.colors[curGridStyleField];
    return {
      fillColor,
      weight: 1,
      opacity: 0,
      fillOpacity: 0.8,
    };
  };

  return (
    <AsyncGrid data={data} status={status} gridStyle={gridStyle} key="grid" />
  );
};
