import React, { useCallback, useState } from "react";
import { Pane, useMapEvent } from "react-leaflet";
import { useGetGrid } from "../../api/grid";
import { useSelector } from "react-redux";
import {
  get800mFlag,
  getGridStyleField,
  getSelectedCategory,
} from "../../root-slice/root-selectors";
import { getMapExtent } from "./utils";
import { GeoJSON } from "../../components/geojson";
import { withLoading } from "../withLoading";

const GridPane = ({ data, gridStyle }) => (
  <Pane name="grid" style={{ zIndex: 350 }}>
    <GeoJSON data={data} style={gridStyle} />
  </Pane>
);

const AsyncGrid = withLoading(GridPane);

export const GridLayer = () => {
  const map = useMapEvent("moveend", () => setMapExtent(getMapExtent(map)));
  const [mapExtent, setMapExtent] = useState(getMapExtent(map));

  const selectedCategory = useSelector(getSelectedCategory);
  const curGridStyleField = useSelector(getGridStyleField);
  const flag800m = useSelector(get800mFlag);

  const { data, status } = useGetGrid(mapExtent, !!selectedCategory);

  const gridStyle = useCallback(
    (feature) => {
      const { properties } = feature;
      const fillColor = properties.colors[curGridStyleField];
      return {
        fillColor,
        weight: 1,
        opacity: 0,
        fillOpacity: flag800m && !feature.properties.school ? 0 : 0.8,
      };
    },
    [curGridStyleField, flag800m]
  );

  return (
    <AsyncGrid data={data} status={status} gridStyle={gridStyle} key="grid" />
  );
};
