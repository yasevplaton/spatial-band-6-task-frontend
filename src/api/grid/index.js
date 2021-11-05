import axios from "../../config/axios";
import { useQuery } from "react-query";
import GeoJSON from "geojson";

const getGrid = async () => {
  const data = await axios.get(`/poly_new/`);
  const parsedData = data.map((item) => {
    const { geometry } = item;
    let coords = geometry.replace("SRID=4326;POLYGON ((", "");
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

const getGridColors = async () => {
  const data = await axios.get(`/poly_new/colors_png`);
  return data;
};

const getGridStat = async () => {
  const data = await axios.get(`/poly_new/filters`);
  return data;
};

export const useGetGrid = (enabled, select) => {
  return useQuery(["grid"], () => getGrid(), {
    enabled,
    keepPreviousData: true,
    select,
  });
};

export const useGetGridColors = (enabled = true) => {
  return useQuery(["grid-colors"], () => getGridColors(), {
    enabled,
    keepPreviousData: true,
  });
};

export const useGetGridStat = (enabled = true) => {
  return useQuery(["grid-stat"], () => getGridStat(), { enabled });
};
