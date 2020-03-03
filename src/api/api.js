import axios from "axios";
import Auth from "../utils/auth";
import { API } from "../utils/constants";

const authObj = new Auth();
const axiosApi = axios.create({
  // baseURL: `http://${process.env.REACT_APP_API_URL}`
  baseURL: API
});

axiosApi.interceptors.request.use(
  config => {
    config.headers["Access-Control-Allow-Origin"] = "*";

    const token = authObj.getToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

axiosApi.interceptors.response.use(
  response => response,
  error => {
    const originalRequest = error.config;

    // remove tokens when generating token failed
    if (
      error.response.status !== 200 &&
      originalRequest.url === `${API}/auth/token`
    ) {
      authObj.removeToken();
      authObj.removeRefreshToken();
      window.location = "/auth/login";
      return Promise.reject(error);
    }

    // generate token using refreshToken
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      return axiosApi
        .post("/auth/token", { refreshToken: authObj.getRefreshToken() })
        .then(response => {
          authObj.setToken(response.data.token);
          axiosApi.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${response.data.token}`;
          return axiosApi(originalRequest);
        });
    }
  }
);

export default axiosApi;
