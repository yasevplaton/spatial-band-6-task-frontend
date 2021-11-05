import { useQuery } from "react-query";
import { QUERY_KEYS } from "config/constants";
import { useCallback } from "react";
import { getSchools } from "./api";
import { getPupilsCountRange, getShoolLoadRange } from "./selectors";
import { useSelector } from "react-redux";
import { getYear } from "../../root-slice/root-selectors";

export const useGetSchools = (enabled = true, select) => {
  const queryFn = useCallback(() => getSchools(), []);
  return useQuery(QUERY_KEYS.SCHOOLS, queryFn, {
    enabled,
    select,
  });
};

export const useGetPupilsCountRange = (enabled = true) => {
  return useGetSchools(enabled, getPupilsCountRange);
};

export const useGetSchoolLoadRange = (enabled = true) => {
  const year = useSelector(getYear);
  return useGetSchools(enabled, (data) =>
    getShoolLoadRange(data, year === 2025 ? "nagruzka_2025year" : "nagruzka")
  );
};
