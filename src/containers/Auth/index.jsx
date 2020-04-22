import { connect } from 'react-redux';
import AuthWrapper from '../../components/Auth';
import * as authActions from '../../actions/authActions';

const mapStateToProps = (state) => {
  return {
    auth: state.authState,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    mappedLogin: (credentials, history) => dispatch(authActions.login(credentials, history)),
    mappedRegister: (payload, history) => dispatch(authActions.registerUser(payload, history)),
    mappedVerifyEmail: (payload, history) => dispatch(authActions.verifyEmail(payload, history, dispatch)),
    mappedForgotPassword: (payload, history) => dispatch(authActions.forgotPassword(payload, history, dispatch)),
    mappedResetPassword: (payload, history) => dispatch(authActions.resetPassword(payload, history, dispatch)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthWrapper);
