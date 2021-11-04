import React, { useMemo } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import {
  MAP_CENTER_DEFAULT,
  MAP_ZOOM_DEFAULT,
  TILE_SERVER_ATTRIBUTION,
  TILE_SERVER_URL,
  MIN_ZOOM_DEFAULT,
} from "config/constants";
import { SchoolsLayer } from "../layers";
import { useSelector } from "react-redux";
import {
  get800mFlag,
  getGridStyleField,
  getMinOptimaValue,
  getSelectedCategory,
  getVisible,
} from "../../root-slice/root-selectors";
import VectorGrid from "../../components/vector-grid";
import { DEFAULT_GRID_STYLE, gridColorMap } from "../../config/styles";
import { useGetGridStat } from "../../api/grid";
import { createScale } from "../../utils";
import * as ReactDOMServer from "react-dom/server";
import { Popup } from "../point-popup";
import { gridFeatureInfo } from "../../config/popup";

export const Map = () => {
  const category = useSelector(getSelectedCategory);
  const schoolsVisible = useSelector(getVisible("schools"));
  const gridVisible = useSelector(getVisible("grid"));
  const gridStyleField = useSelector(getGridStyleField);
  const flag800m = useSelector(get800mFlag);
  const minOptimaValue = useSelector(getMinOptimaValue);

  const { data: gridStat } = useGetGridStat(!!category);

  const options = useMemo(() => {
    if (!gridStat) {
      return {
        type: "protobuf",
        url: "http://geo.cherrydev.tech/public.service_poly/{z}/{x}/{y}.pbf",
        interactive: true,
        vectorTileLayerStyles: {
          "public.service_poly": {
            ...DEFAULT_GRID_STYLE,
          },
        },
      };
    }

    return {
      type: "protobuf",
      url: "http://geo.cherrydev.tech/public.service_poly/{z}/{x}/{y}.pbf",
      interactive: true,
      vectorTileLayerStyles: {
        "public.service_poly": function (properties) {
          const colorScale = createScale(
            gridStat[gridStyleField],
            gridColorMap[gridStyleField]
          );

          const isNearSchool = properties.school;
          const fillOpacity = () => {
            const showOnlyFarFromSchool = flag800m && isNearSchool;
            return showOnlyFarFromSchool || properties.optima < minOptimaValue
              ? 0
              : 0.8;
          };

          return {
            ...DEFAULT_GRID_STYLE,
            fillColor: colorScale(properties[gridStyleField]),
            fillOpacity: fillOpacity(),
          };
        },
      },
      popup: (feature) =>
        ReactDOMServer.renderToString(
          <Popup feature={feature} config={gridFeatureInfo} />
        ),
    };
  }, [gridStat, gridStyleField, flag800m, minOptimaValue]);

  const gridLayerKey = `${gridStat}-${gridStyleField}-${flag800m}-${minOptimaValue}`;

  return (
    <MapContainer
      center={MAP_CENTER_DEFAULT}
      zoom={MAP_ZOOM_DEFAULT}
      minZoom={MIN_ZOOM_DEFAULT}
    >
      <TileLayer attribution={TILE_SERVER_ATTRIBUTION} url={TILE_SERVER_URL} />

      {category && gridVisible && (
        <VectorGrid {...options} key={gridLayerKey} />
      )}
      {category && schoolsVisible && <SchoolsLayer />}
    </MapContainer>
  );
};
