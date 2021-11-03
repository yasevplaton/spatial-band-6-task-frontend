import axios from "../../config/axios";
import { useQuery } from "react-query";
import GeoJSON from "geojson";
import { getDataRange } from "../../utils";

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

export const useGetOptimaRange = (enabled = true) => {
  return useGetGrid(enabled, (data) => {
    const values = data.features.map((f) => f.properties.optima);
    return getDataRange(values);
  });
};
