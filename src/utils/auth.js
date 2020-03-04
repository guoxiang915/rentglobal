class Auth {
  setToken = async token => {
    localStorage.setItem("userToken", token);
  };

  getToken = () => {
    let token = localStorage.getItem("userToken");
    return token;
  };

  removeToken = async () => {
    localStorage.removeItem("userToken");
  };

  setRefreshToken = async token => {
    localStorage.setItem("refreshToken", token);
  };

  getRefreshToken = () => {
    let token = localStorage.getItem("refreshToken");
    return token;
  };

  removeRefreshToken = async () => {
    localStorage.removeItem("refreshToken");
  };

  setRememberUser = async rememberUser => {
    localStorage.setItem("rememberUser", rememberUser);
  };

  getRememberUser = () => {
    let rememberUser = localStorage.getItem('rememeberUser');
    return rememberUser;
  }
}

export default Auth;
