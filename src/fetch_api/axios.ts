import axios, { AxiosInstance } from "axios";

// global url
// const BASE_URL = "http://172.16.14.23:9090";

// local url
const BASE_URL = "http://172.20.11.187:9090";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "ngrok-skip-browser-warning": "any",
  },
});

export default axiosInstance;
