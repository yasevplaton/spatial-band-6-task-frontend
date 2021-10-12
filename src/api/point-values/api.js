import axios from "config/axios";

export const getPointValues = async (pointId) => {
  const data = await axios.get(`/point/values/${pointId}`);
  return data;
};
