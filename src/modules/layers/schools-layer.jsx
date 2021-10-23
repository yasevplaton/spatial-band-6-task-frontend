import { useSchoolData } from "./hooks";
import React, { useCallback } from "react";
import { withLoading } from "../withLoading";
import { useSelector } from "react-redux";
import { getSelectedCategory } from "../../root-slice/root-selectors";
import { GeoJSON } from "../../components/geojson";
import * as L from "leaflet";
import { DEFAULT_MARKER_STYLE } from "../../config/styles";

const AsyncSchools = withLoading(GeoJSON);

export const SchoolsLayer = () => {
  const selectedCategory = useSelector(getSelectedCategory);
  const { data, status, radiusScale, colorScale } = useSchoolData(
    !!selectedCategory
  );

  const pointToLayer = useCallback(
    (feature, latlng) => {
      return L.circleMarker(latlng, {
        ...DEFAULT_MARKER_STYLE,
        fillColor: colorScale(feature.properties["nagruzka"]),
        radius: radiusScale(feature.properties["pupils_cnt"]),
      });
    },
    [colorScale, radiusScale]
  );

  const onEachFeature = useCallback((feature, layer) => {
    const popupContent = `
        <div>
            <p>${feature.properties.nagruzka}</p>
            <p>${feature.properties.pupils_cnt}</p>
        </div>
            `;
    layer.bindPopup(popupContent);
  }, []);

  return (
    <AsyncSchools
      data={data}
      status={status}
      pointToLayer={pointToLayer}
      onEachFeature={onEachFeature}
      key="schools"
    />
  );
};
