class Auth {
  setToken = async (token) => {
    if (typeof localStorage !== 'undefined') localStorage.setItem('userToken', token);
  };

  getToken = () => {
    if (typeof localStorage !== 'undefined') {
      const token = localStorage.getItem('userToken');
      return token;
    } else {
      return null;
    }
  };

  removeToken = async () => {
    if (typeof localStorage !== 'undefined') localStorage.removeItem('userToken');
  };

  setRefreshToken = async (token) => {
    if (typeof localStorage !== 'undefined') localStorage.setItem('refreshToken', token);
  };

  getRefreshToken = () => {
    if (typeof localStorage !== 'undefined') {
      const token = localStorage.getItem('refreshToken');
      return token;
    } else {
      return null;
    }
  };

  removeRefreshToken = async () => {
    if (typeof localStorage !== 'undefined') localStorage.removeItem('refreshToken');
  };

  setRememberUser = async (rememberUser) => {
    if (typeof localStorage !== 'undefined') localStorage.setItem('rememberUser', rememberUser);
  };

  getRememberUser = () => {
    if (typeof localStorage !== 'undefined') {
      const rememberUser = localStorage.getItem('rememberUser');
      return rememberUser;
    } else {
      return null;
    }
  };
}

export default Auth;
