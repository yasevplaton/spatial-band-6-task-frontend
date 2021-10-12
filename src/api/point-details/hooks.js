import { useQuery } from "react-query";
import { QUERY_KEYS } from "config/constants";
import { useCallback } from "react";
import { getPointDetails } from "./api";
import { parsePointDetails } from "./selectors";

export const useGetPointDetails = (pointId) => {
  const queryFn = useCallback(() => getPointDetails(pointId), [pointId]);
  return useQuery([QUERY_KEYS.POINT_DETAILS, pointId], queryFn, {
    select: parsePointDetails,
  });
};
