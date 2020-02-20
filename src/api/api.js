import axios from "axios";
import { API } from "../utils/constants";
import Auth from "../utils/auth";

const axiosApi = axios.create({
  baseURL: API
});

axiosApi.interceptors.request.use(
  config => {
    config.headers['Access-Control-Allow-Origin'] = '*';
    
    const token = new Auth().getToken();
    console.log(token);
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

export default axiosApi;
