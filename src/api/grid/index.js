import axios from "../../config/axios";
import { useQuery } from "react-query";
import GeoJSON from "geojson";

const URL = "https://geoapi.social.ru.com/api";

const getGrid = async () => {
  const data = await axios.get(`${URL}/poly_new/`);
  const parsedData = data.map((item) => {
    const { polygon } = item;
    let coords = polygon.replace("SRID=4326;POLYGON ((", "");
    coords = coords.replace("))", "").split(",");
    coords = coords.map((latLon) => {
      const latLonArr = latLon.trim().split(" ");
      return latLonArr.map((ll) => {
        return Number(ll);
      });
    });

    return {
      ...item,
      coords: [coords],
    };
  });

  const geojson = GeoJSON.parse(parsedData, {
    Polygon: "coords",
  });

  return geojson;
};

export const useGetGrid = (mapExtent, enabled) => {
  return useQuery(["grid"], () => getGrid(), {
    enabled,
    keepPreviousData: true,
  });
};
