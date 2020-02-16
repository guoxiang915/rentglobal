const INITIAL_STATE = {
  isLoggedIn: false,
  user: null,
  isLoading: false,
  error: null,
  loaded: false,
  successMsg: null,
  isActivated: false,
  // loginMode: null
};

const authReducer = (currentState = INITIAL_STATE, action) => {
  switch (action.type) {
    case "REQUEST_LOGIN":
      return {
        ...currentState,
        isLoading: true,
        successMsg: null
      };

    case "LOGIN_FAILED":
      return {
        ...currentState,
        isLoading: false,
        error: action.resp.msg,
        isLoggedIn: false
      };

    case "USER_NOT_ACTIVATED":
      return {
        ...currentState,
        isLoading: false,
        error: action.resp.msg,
        isLoggedIn: true,
        isActivated: false
      };

    case "LOGIN_SUCCESS":
      return {
        ...currentState,
        isLoading: false,
        isLoggedIn: true,
        error: null,
        isActivated: true,
        // user: action.resp.user,
        // successMsg: action.resp.msg
      };

    case "REQUEST_AUTHENTICATION":
      return {
        ...currentState,
        isLoading: true,
        isLoggedIn: false,
        error: null,
        user: null,
        loaded: false,
        successMsg: null
      };

    case "AUTH_SUCCESS":
      return {
        ...currentState,
        isLoading: false,
        isLoggedIn: true,
        error: null,
        user: action.resp.user,
        loaded: true,
        successMsg: action.resp.msg
      };

    case "AUTH_FAILED":
      return {
        ...currentState,
        isLoading: false,
        isLoggedIn: false,
        error: action.resp.msg,
        user: null,
        loaded: true,
        successMsg: null
      };

    case "FLUSH_MESSAGES":
      return {
        ...currentState,
        error: null,
        successMsg: null
      };

    case "REQUEST_LOGOUT":
      return {
        ...currentState,
        isLoading: false,
        isLoggedIn: false,
        error: null,
        user: null,
        loaded: true,
        successMsg: null
      };

    case "REQUEST_USER_REGISTER":
      return {
        ...currentState,
        isLoading: true,
        isLoggedIn: false,
        user: null,
        error: null,
        loaded: false,
        successMsg: null
      };

    case "REGISTER_USER_FAILED":
      return {
        ...currentState,
        isLoading: false,
        isLoggedIn: false,
        user: null,
        error: action.resp.msg,
        loaded: true
      };

    // unusable
    case "REGISTER_USER_SUCCESS":
      return {
        ...currentState,
        isLoading: false,
        isLoggedIn: true,
        error: null,
        loaded: true
      };

    default:
      return currentState;
  }
};

export default authReducer;
