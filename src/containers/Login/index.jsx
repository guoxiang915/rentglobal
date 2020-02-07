import { connect } from "react-redux";
import Login from "../../components/Login";
import * as authActions from "../../actions/authActions";

const mapStateToProps = state => {
  return {
    auth: state.authState
  };
};

const mapDispatchToprops = dispatch => {
  return {
    getRegisteredUser: email => dispatch(authActions.isExist(dispatch, email)),
    switchLoginMode: loginMode => dispatch(authActions.switchLoginMode(loginMode)),
    mappedLogin: (credentials, history) =>
      dispatch(authActions.login(credentials, history))
  };
};

export default connect(mapStateToProps, mapDispatchToprops)(Login);
