import { useGetSchoolLoadRange, useGetSchools } from "../../api";
import { useMemo } from "react";
import { createScale } from "../../utils";
import { schoolLoadColorRange } from "../../config/constants";

export const useSchoolData = (layerVisible) => {
  const { data, status } = useGetSchools(layerVisible);
  const { data: schoolLoadRange } = useGetSchoolLoadRange(!!data);

  const colorScale = useMemo(() => {
    if (!schoolLoadRange) return;

    return createScale(schoolLoadRange, schoolLoadColorRange);
  }, [schoolLoadRange]);

  return { data, status, colorScale };
};
