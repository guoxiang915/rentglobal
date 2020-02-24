const INITIAL_STATE = {
  isLoggedIn: false,
  user: null,
  isLoading: false,
  error: null,
  loaded: false,
  successMsg: null,
  isActivated: false
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

    case "LOGIN_SUCCESS":
      return {
        ...currentState,
        isLoading: false,
        isLoggedIn: true,
        error: null,
        user: action.resp
        // successMsg: action.resp.msg
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
        // error: action.resp.msg,
        error: null,
        isLoggedIn: true,
        user: action.resp
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
        user: action.resp,
        loaded: true
      };

    case "AUTH_FAILED":
      return {
        ...currentState,
        isLoading: false,
        isLoggedIn: false,
        error: action.resp.msg,
        user: null,
        loaded: true
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
        // loaded: false,
        successMsg: null
      };

    case "REQUEST_VERIFY_EMAIL":
    case "REQUEST_FORGOT_PASSWORD":
    case "REQUEST_RESET_PASSWORD":
      return {
        ...currentState,
        isLoading: true
      };

    case "RESPONSE_VERIFY_EMAIL":
    case "RESPONSE_FORGOT_PASSWORD":
    case "RESPONSE_RESET_PASSWORD":
      return {
        ...currentState,
        isLoading: false
      };

    case "REGISTER_USER_FAILED":
      return {
        ...currentState,
        isLoading: false,
        isLoggedIn: false,
        user: null,
        error: action.resp.msg
        // loaded: true
      };

    // unusable
    case "REGISTER_USER_SUCCESS":
      return {
        ...currentState,
        isLoading: false,
        isLoggedIn: true,
        error: null
        // loaded: true
      };

    case "SET_USER_ROLE":
      return {
        ...currentState,
        user: { ...currentState.user, role: action.role }
      };

    case "REQUEST_UPDATE_USER":
      return {
        ...currentState,
        isLoading: true
      };

    case "UPDATE_USER_SUCCESS":
      return {
        ...currentState,
        isLoading: false,
        user: action.resp
      };

    case "UPDATE_USER_FAILED":
      return {
        ...currentState,
        isLoading: false,
        error: action.resp.msg
      };

    default:
      return currentState;
  }
};

export default authReducer;
