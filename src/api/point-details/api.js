import axios from "config/axios";

export const getPointDetails = async (pointId) => {
  const data = await axios.get(`/point/details/${pointId}`);
  return data;
};
