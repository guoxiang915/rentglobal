import { API } from "../utils/constants";
import api from "../api/api";
import Auth from "../utils/auth";

const authObj = new Auth();

export const login = (payload, history) => {
  return {
    type: "REQUEST_LOGIN",
    history,
    payload
  };
};

export const authenticate = (token, history) => {
  return {
    type: "REQUEST_AUTHENTICATION",
    token,
    history
  };
};

export const logout = () => {
  return {
    type: "REQUEST_LOGOUT"
  };
};

export const updateUser = (payload, history) => {
  return {
    type: "REQUEST_UPDATE_USER",
    history,
    payload
  };
};

export const registerUser = (payload, history) => {
  return {
    type: "REQUEST_USER_REGISTER",
    history,
    payload
  };
};

export const verifyEmailResponse = response => {
  return {
    type: "RESPONSE_VERIFY_EMAIL",
    payload: response
  };
};

export const verifyEmail = (payload, history, dispatch) => {
  api
    .get(`${API}/auth/activate/${payload.token}`)
    .then(response => {
      authObj.setToken(response.token);
      history.push("/");
      dispatch(verifyEmailResponse(response));
    })
    .catch(error => {
      dispatch(verifyEmailResponse(error.response));
    });
  return {
    type: "REQUEST_VERIFY_EMAIL",
    history,
    payload
  };
};

export const forgotPassword = (payload, history) => {
  api
    .post(`${API}/auth/forgot-password`, payload)
    .then(() => {
      history.push("/auth/reset-password/confirm");
    })
    .catch(error => {});
};

export const resetPassword = (payload, history) => {
  api
    .post(`${API}/auth/reset-password/${payload.token}`, payload)
    .then(() => {
      history.push("/auth/login");
    })
    .catch(error => {});
};
