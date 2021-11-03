import React, { useCallback } from "react";
import { Pane } from "react-leaflet";
import { useGetGrid } from "../../api/grid";
import { useSelector } from "react-redux";
import {
  get800mFlag,
  getGridStyleField,
  getMinOptimaValue,
  getSelectedCategory,
} from "../../root-slice/root-selectors";
import { GeoJSON } from "../../components/geojson";
import { withLoading } from "../withLoading";

const GridPane = ({ data, gridStyle }) => (
  <Pane name="grid" style={{ zIndex: 350 }}>
    <GeoJSON data={data} style={gridStyle} />
  </Pane>
);

const AsyncGrid = withLoading(GridPane);

export const GridLayer = () => {
  const selectedCategory = useSelector(getSelectedCategory);
  const curGridStyleField = useSelector(getGridStyleField);
  const flag800m = useSelector(get800mFlag);
  const minOptimaValue = useSelector(getMinOptimaValue);

  const { data, status } = useGetGrid(!!selectedCategory);

  const gridStyle = useCallback(
    (feature) => {
      const { properties } = feature;
      const fillColor = properties.colors[curGridStyleField];
      const isNearSchool = feature.properties.school;
      const fillOpacity = () => {
        const showOnlyFarFromSchool = flag800m && isNearSchool;
        return showOnlyFarFromSchool ||
          feature.properties.optima < minOptimaValue
          ? 0
          : 0.8;
      };
      return {
        fillColor,
        weight: 1,
        opacity: 0,
        fillOpacity: fillOpacity(),
        interactive: false,
      };
    },
    [curGridStyleField, flag800m, minOptimaValue]
  );

  return (
    <AsyncGrid data={data} status={status} gridStyle={gridStyle} key="grid" />
  );
};
