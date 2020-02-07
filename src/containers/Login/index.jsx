import { connect } from "react-redux";
import AuthWrapper from "../../components/Login";
import * as authActions from "../../actions/authActions";

const mapStateToProps = state => {
  return {
    auth: state.authState
  };
};

const mapDispatchToprops = dispatch => {
  return {
    getRegisteredUser: email => dispatch(authActions.isExist(dispatch, email)),
    mappedLogin: (credentials, history) =>
      dispatch(authActions.login(credentials, history))
  };
};

export default connect(mapStateToProps, mapDispatchToprops)(AuthWrapper);
