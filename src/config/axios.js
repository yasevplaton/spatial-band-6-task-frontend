import axios from "axios";
const API_URL = "https://lud8uz.deta.dev";

const axiosInstance = axios.create({
  baseURL: API_URL,
  mode: "cors",
});

axiosInstance.interceptors.response.use((response) => {
  if ("data" in response) {
    return response.data;
  }
  return response;
});

export default axiosInstance;
