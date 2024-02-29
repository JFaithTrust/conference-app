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

const logoutUser = () => {
  window.localStorage.removeItem("access_token");
  window.location.href = "/";
};

axiosInstance.interceptors.request.use(
  (reponse) => {
    console.log(reponse.data);
    return reponse;
  },
  (error) => {
    console.log('error result');
    if(error){
      logoutUser()
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
