import api from '../api/api';

export const login = (payload, history) => ({
  type: 'REQUEST_LOGIN',
  history,
  payload,
});

export const authenticate = (token, history) => ({
  type: 'REQUEST_AUTHENTICATION',
  token,
  history,
});

export const logout = () => ({
  type: 'REQUEST_LOGOUT',
});

export const updateUser = (field, payload, history) => ({
  type: 'REQUEST_UPDATE_USER',
  history,
  payload,
  field,
});

export const setUserRole = (userRole, history, redirectPath) => ({
  type: 'SET_USER_ROLE',
  userRole,
  history,
  redirectPath
});

export const registerUser = (payload, history) => ({
  type: 'REQUEST_USER_REGISTER',
  history,
  payload,
});

export const verifyEmailResponse = (response) => ({
  type: 'RESPONSE_VERIFY_EMAIL',
  payload: response,
});

export const verifyEmail = (payload, history, dispatch) => {
  api
    .get(`/auth/activate/${payload.token}`)
    .then((response) => {
      let path = '/auth/verify-email-success';

      if (payload.redirect) {
        path = `/auth/verify-email-success?redirect=${payload.redirect}`;
      }

      history.push(path, {
        success: true,
        redirect: payload.redirect
      });
      dispatch(verifyEmailResponse(response));
    })
    .catch((error) => {
      history.push('/auth/verify-email-failed', { failed: true });
      dispatch(verifyEmailResponse(error.response));
    });
  return {
    type: 'REQUEST_VERIFY_EMAIL',
  };
};

export const forgotPasswordResponse = (response) => ({
  type: 'RESPONSE_FORGOT_PASSWORD',
  payload: response,
});

export const forgotPassword = (payload, history, dispatch) => {
  api
    .post('/auth/forgot-password', payload)
    .then((response) => {
      history.push('/auth/reset-password/confirm', payload);
      dispatch(forgotPasswordResponse(response));
    })
    .catch((error) => {
      dispatch(forgotPasswordResponse(error.response));
    });
  return {
    type: 'REQUEST_FORGOT_PASSWORD',
  };
};

export const resetPasswordResponse = (response) => ({
  type: 'RESPONSE_RESET_PASSWORD',
  payload: response,
});

export const resetPassword = (payload, history, dispatch) => {
  api
    .post(`/auth/reset-password/${payload.token}`, payload)
    .then((response) => {
      history.push('/auth/login');
      dispatch(resetPasswordResponse(response));
    })
    .catch((error) => {
      dispatch(resetPasswordResponse(error.response));
    });
  return {
    type: 'REQUEST_RESET_PASSWORD',
  };
};

export const deleteDocument = (userRole, docType, docFile) => ({
  type: 'REQUEST_DELETE_DOCUMENT',
  payload: { userRole, docType, docFile },
});

export const verifyPhoneNumber = (phoneNumber) => ({
  type: 'REQUEST_VERIFY_PHONE',
  payload: { phoneNumber },
});

export const verifyPhoneCode = (phoneCode) => ({
  type: 'REQUEST_VERIFY_CODE',
  payload: phoneCode,
});

export const deleteAvatar = () => ({
  type: 'REQUEST_DELETE_AVATAR',
});

export const deleteAccount = (userRole) => ({
  type: 'REQUEST_DELETE_ACCOUNT',
  payload: { userRole },
});
