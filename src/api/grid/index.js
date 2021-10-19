import axios from "../../config/axios";
import { useQuery } from "react-query";

const URL = "http://geoapi.social.ru.com/api";

const getGrid = async () => {
  const data = await axios.get(
    `${URL}/poly/?lat_min=37.590811&lat_max=37.652609&lon_min=55.743476%20&lon_max=55.763304`
  );
  return data;
};

export const useGetGrid = (enabled) => {
  return useQuery(["grid"], () => getGrid(), { enabled });
};
