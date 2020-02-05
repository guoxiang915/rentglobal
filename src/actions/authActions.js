import axios from "axios";
import { API } from "../utils/constants";

export const resultExist = payload => {
  return {
    type: "RESPONSE_IS_EXIST",
    loginMode: payload && payload.message ? "login" : "register"
  };
};

export const isExist = (dispatch, payload) => {
  // mock api
  new Promise((resolve, reject) => {
    // setTimeout(() => resolve({ message: payload }), 30);
    setTimeout(() => reject({ message: "Exist" }), 3000);
  }).then(
    resp => {
      dispatch(resultExist(resp));
    },
    error => {
      dispatch(resultExist(null));
    }
  );

  /* axios.get(`${API}/users/exist`, payload).then(
    resp => {
      dispatch(resultExist(resp));
    },
    error => {
      dispatch(resultExist(null));
    }
  ); */

  return {
    type: "REQUEST_IS_EXIST"
  };
};

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
