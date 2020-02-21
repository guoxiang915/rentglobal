import axios from "axios";
import Auth from "../utils/auth";

const axiosApi = axios.create({
  baseURL: `http://${process.env.REACT_APP_API_URL}`
});

axiosApi.interceptors.request.use(
  config => {
    config.headers["Access-Control-Allow-Origin"] = "*";

    const token = new Auth().getToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

export default axiosApi;
