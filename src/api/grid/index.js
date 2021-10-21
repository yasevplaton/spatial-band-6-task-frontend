import axios from "../../config/axios";
import { useQuery } from "react-query";

const URL = "https://geoapi.social.ru.com/api";

const getGrid = async (mapExtent) => {
  const { lat_min, lat_max, lon_min, lon_max } = mapExtent;
  const data = await axios.get(
    `${URL}/poly/?lat_min=${lon_min}&lat_max=${lon_max}&lon_min=${lat_min}&lon_max=${lat_max}`
  );
  return data;
};

export const useGetGrid = (mapExtent, enabled) => {
  return useQuery(["grid", mapExtent], () => getGrid(mapExtent), {
    enabled,
    keepPreviousData: true,
  });
};
