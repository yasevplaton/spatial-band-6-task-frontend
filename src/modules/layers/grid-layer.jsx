// import React from "react";
// import { Pane } from "react-leaflet";
// import { useSelector } from "react-redux";
// import {
//   get800mFlag,
//   getGridStyleField,
//   getMinOptimaValue,
// } from "../../root-slice/root-selectors";

export const GridLayer = () => {
  // const curGridStyleField = useSelector(getGridStyleField);
  // const flag800m = useSelector(get800mFlag);
  // const minOptimaValue = useSelector(getMinOptimaValue);

  // const options = {
  //   type: "protobuf",
  //   url: "http://geo.cherrydev.tech/public.service_poly/{z}/{x}/{y}.pbf",
  //   interactive: true,
  //   vectorTileLayerStyles: {
  //     "public.service_poly": {
  //       fill: true,
  //     },
  //   },
  // };

  // const gridStyle = useCallback(
  //   (feature) => {
  //     const { properties } = feature;
  //     const fillColor = properties.colors[curGridStyleField];
  //     const isNearSchool = feature.properties.school;
  //     const fillOpacity = () => {
  //       const showOnlyFarFromSchool = flag800m && isNearSchool;
  //       return showOnlyFarFromSchool ||
  //         feature.properties.optima < minOptimaValue
  //         ? 0
  //         : 0.8;
  //     };
  //     return {
  //       fillColor,
  //       weight: 1,
  //       opacity: 0,
  //       fillOpacity: fillOpacity(),
  //       interactive: false,
  //     };
  //   },
  //   [curGridStyleField, flag800m, minOptimaValue]
  // );

  return null;
};
