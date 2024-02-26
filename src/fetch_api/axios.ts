import axios, { AxiosInstance } from "axios";

// global url
// const BASE_URL = "http://172.16.14.23:9090";

// local url
const BASE_URL = "https://loyal-merely-muskrat.ngrok-free.app"

const axiosInstance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "ngrok-skip-browser-warning" : "any"
  },
});

axiosInstance.interceptors.request.use(
  (response) => {
    return response;
  },
  (error) => {
    if(error.response.status === 401){
      logoutUser()
    }
    return Promise.reject(error);
  }
);

const logoutUser = () => {
  localStorage.removeItem("token");
  window.location.href = "/";
};

export default axiosInstance;
