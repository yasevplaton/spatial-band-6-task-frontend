import { useSchoolData } from "./hooks";
import React from "react";
import { withLoading } from "../withLoading";
import { MarkerCollection } from "../../components";
import { useSelector } from "react-redux";
import { getSelectedCategory } from "../../root-slice/root-selectors";

const AsyncMarkers = withLoading(MarkerCollection);

export const SchoolsLayer = () => {
  const selectedCategory = useSelector(getSelectedCategory);
  const { data, status, radiusScale, colorScale } = useSchoolData(
    !!selectedCategory
  );
  return (
    <AsyncMarkers
      data={data}
      status={status}
      radiusScale={radiusScale}
      colorScale={colorScale}
    />
  );
};
