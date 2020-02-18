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
    type: "REQUEST_VERIFY_EMAIL"
  };
};

export const forgotPasswordResponse = response => {
  return {
    type: "RESPONSE_FORGOT_PASSWORD",
    payload: response
  };
};

export const forgotPassword = (payload, history, dispatch) => {
  api
    .post(`${API}/auth/forgot-password`, payload)
    .then(response => {
      history.push("/auth/reset-password/confirm", payload);
      dispatch(forgotPasswordResponse(response));
    })
    .catch(error => {
      dispatch(forgotPasswordResponse(error.response));
    });
  return {
    type: "REQUEST_FORGOT_PASSWORD"
  };
};

export const resetPasswordResponse = response => {
  return {
    type: "RESPONSE_RESET_PASSWORD",
    payload: response
  };
};

export const resetPassword = (payload, history, dispatch) => {
  api
    .post(`${API}/auth/reset-password/${payload.token}`, payload)
    .then(response => {
      history.push("/auth/login");
      dispatch(resetPasswordResponse(response));
    })
    .catch(error => {
      dispatch(resetPasswordResponse(error.response));
    });
  return {
    type: "REQUEST_RESET_PASSWORD"
  };
};
