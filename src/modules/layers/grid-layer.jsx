import { useSelector } from "react-redux";
import {
  get800mFlag,
  getGridStyleField,
  getMinOptimaValue,
  getSelectedCategory,
} from "../../root-slice/root-selectors";
import { useGetGridStat } from "../../api/grid";
import React, { useMemo } from "react";
import { DEFAULT_GRID_STYLE, gridColorMap } from "../../config/styles";
import { createScale } from "../../utils";
import * as ReactDOMServer from "react-dom/server";
import { Popup } from "../point-popup";
import { gridFeatureInfo } from "../../config/popup";
import VectorGrid from "../../components/vector-grid";
import { withLoading } from "../withLoading";

const AsyncGrid = withLoading(VectorGrid);

export const GridLayer = () => {
  const category = useSelector(getSelectedCategory);
  const gridStyleField = useSelector(getGridStyleField);
  const flag800m = useSelector(get800mFlag);
  const minOptimaValue = useSelector(getMinOptimaValue);

  const { data: gridStat, status } = useGetGridStat(!!category);

  const options = useMemo(() => {
    if (!gridStat) {
      return {
        type: "protobuf",
        url: "https://social.ru.com/public.service_poly/{z}/{x}/{y}.pbf",
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
      url: "https://social.ru.com/public.service_poly/{z}/{x}/{y}.pbf",
      interactive: true,
      vectorTileLayerStyles: {
        "public.service_poly": function (properties) {
          const colorScale = createScale(
            gridStat[gridStyleField],
            gridColorMap[gridStyleField]
          );

          const isNull = properties[gridStyleField] === 0;
          const showOnlyFarFromSchool = flag800m && properties.school;
          const optimaLessThanMin = properties.optima < minOptimaValue;
          const hidePoly = isNull || showOnlyFarFromSchool || optimaLessThanMin;

          return {
            ...DEFAULT_GRID_STYLE,
            fillColor: colorScale(properties[gridStyleField]),
            fillOpacity: hidePoly ? 0 : 0.8,
            fill: !hidePoly,
            stroke: !hidePoly,
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

  return <AsyncGrid status={status} {...options} key={gridLayerKey} />;
};
