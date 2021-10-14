import axios from "config/axios";

export const getSchools = async () => {
  const data = await axios.get("/schools/");
  return data;
};
