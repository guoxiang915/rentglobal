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

export const updateAvatarResponse = response => {
  return {
    type: "RESPONSE_UPDATE_USER_AVATAR",
    payload: response
  };
};

export const updateAvatar = (payload, dispatch) => {
  api
    .post("/file/upload", payload)
    .then(response => {
      dispatch(updateAvatarResponse(response));
    })
    .catch(error => {
      dispatch(updateAvatarResponse(error.response));
    });

  return {
    type: "REQUEST_UPDATE_USER_AVATAR"
  };
};

export const setUserRole = (role, history) => {
  return {
    type: "SET_USER_ROLE",
    role: role,
    history
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
    .get(`/auth/activate/${payload.token}`)
    .then(response => {
      authObj.setToken(response.token);
      history.push("/auth/verify-email-success", {
        success: true
      });
      dispatch(verifyEmailResponse(response));
    })
    .catch(error => {
      history.push("/auth/verify-email-failed", { failed: true });
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
    .post(`/auth/forgot-password`, payload)
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
    .post(`/auth/reset-password/${payload.token}`, payload)
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
