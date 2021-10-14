import { useQuery } from "react-query";
import { QUERY_KEYS } from "config/constants";
import { useCallback } from "react";
import { getSchools } from "./api";
import { getPupilsCountRange, getShoolLoadRange } from "./selectors";

export const useGetSchools = (enabled, select) => {
  const queryFn = useCallback(() => getSchools(), []);
  return useQuery(QUERY_KEYS.SCHOOLS, queryFn, {
    enabled: enabled !== undefined ? enabled : true,
    select,
  });
};

export const useGetPupilsCountRange = (enabled) => {
  return useGetSchools(enabled, getPupilsCountRange);
};

export const useGetSchoolLoadRange = (enabled) => {
  return useGetSchools(enabled, getShoolLoadRange);
};
