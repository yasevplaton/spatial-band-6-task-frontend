import { useQuery } from "react-query";
import { QUERY_KEYS } from "config/constants";
import { useCallback } from "react";
import { getPointValues } from "./api";
import { parseDaysData, parseWeekData } from "./selectors";

export const useGetPointValues = (pointId, select) => {
  const queryFn = useCallback(() => getPointValues(pointId), [pointId]);
  return useQuery([QUERY_KEYS.POINT_VALUES, pointId], queryFn, { select });
};

export const useGetWeekData = (pointId) => {
  return useGetPointValues(pointId, parseWeekData);
};
export const useGetDaysData = (pointId) => {
  return useGetPointValues(pointId, parseDaysData);
};
