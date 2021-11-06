import {
  useGetPupilsCountRange,
  useGetSchoolLoadRange,
  useGetSchools,
} from "../../api";
import { useMemo } from "react";
import { createScale } from "../../utils";
import {
  schoolLoadColorRange,
  schoolRadiusRange,
} from "../../config/constants";

export const useSchoolData = (layerVisible) => {
  const { data, status } = useGetSchools(layerVisible);
  const { data: schoolLoadRange } = useGetSchoolLoadRange(!!data);
  const { data: pupilsCountRange } = useGetPupilsCountRange(!!data);

  const colorScale = useMemo(() => {
    if (!schoolLoadRange) return;

    return createScale(schoolLoadRange, schoolLoadColorRange);
  }, [schoolLoadRange]);

  const radiusScale = useMemo(() => {
    if (!pupilsCountRange) return;

    return createScale(pupilsCountRange, schoolRadiusRange);
  }, [pupilsCountRange]);

  return { data, status, radiusScale, colorScale };
};
