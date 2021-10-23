import axios from "axios";
const API_URL = "https://social.ru.com/api";

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
