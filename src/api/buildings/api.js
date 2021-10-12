import axios from "config/axios";

export const getBuildings = async () => {
  const data = await axios.get("/points/");
  return data;
};
