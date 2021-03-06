import { useSchoolData } from "./hooks";
import React, { useCallback } from "react";
import { withLoading } from "../withLoading";
import { useSelector } from "react-redux";
import { getSelectedCategory, getYear } from "../../root-slice/root-selectors";
import { GeoJSON } from "react-leaflet";
import * as L from "leaflet";
import { DEFAULT_MARKER_STYLE } from "../../config/styles";
import * as ReactDOMServer from "react-dom/server";
import { Popup } from "../point-popup";
import { schoolFeatureInfo } from "../../config/popup";

const AsyncSchools = withLoading(GeoJSON);

export const SchoolsLayer = () => {
  const selectedCategory = useSelector(getSelectedCategory);
  const year = useSelector(getYear);
  const { data, status, radiusScale, colorScale } = useSchoolData(
    !!selectedCategory
  );

  const pointToLayer = useCallback(
    (feature, latlng) => {
      const hide2025 = year === 2021 && feature.properties.year === 2025;
      return L.circleMarker(latlng, {
        ...DEFAULT_MARKER_STYLE,
        fillColor: colorScale(
          feature.properties[year === 2021 ? "nagruzka" : "nagruzka_2025year"]
        ),
        fillOpacity: hide2025 ? 0 : 0.8,
        opacity: hide2025 ? 0 : 0.5,
        radius: radiusScale(feature.properties.pupils_cnt),
      });
    },
    [colorScale, year, radiusScale]
  );

  const onEachFeature = useCallback((feature, layer) => {
    const popupContent = ReactDOMServer.renderToString(
      <Popup feature={feature} config={schoolFeatureInfo} />
    );
    layer.bindPopup(popupContent);
  }, []);

  const schoolLayerKey = `schools-${year}`;

  return (
    <AsyncSchools
      data={data}
      status={status}
      pointToLayer={pointToLayer}
      onEachFeature={onEachFeature}
      key={schoolLayerKey}
    />
  );
};
