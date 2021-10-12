import { useQuery } from "react-query";
import { QUERY_KEYS } from "config/constants";
import { useCallback } from "react";
import { getBuildings } from "./api";
// import { convertToGeoJSON } from "./selectors";

export const useGetBuildings = (enabled) => {
  const queryFn = useCallback(() => getBuildings(), []);
  return useQuery(QUERY_KEYS.BUILDINGS, queryFn, {
    enabled: enabled !== undefined ? enabled : true,
  });
};
