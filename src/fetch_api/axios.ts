import axios, { AxiosInstance } from "axios";

// global url
// const BASE_URL = "http://localhost:9090";

// local url
const BASE_URL = "https://loyal-merely-muskrat.ngrok-free.app"

const axiosInstance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "ngrok-skip-browser-warning" : "any"
  }
});

export default axiosInstance;
