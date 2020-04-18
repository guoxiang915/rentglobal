import { connect } from "react-redux";
import Landlord from "../../components/Landlord";
import * as authActions from "../../actions/authActions";

const mapStateToProps = state => {
  return {
    auth: state.authState,
    appState: state.appState
  };
};

const mapDispatchToprops = dispatch => {
  return {
    mappedupdateUser: (user, history) =>
      dispatch(authActions.updateUser(user, history)),
    mappedverifyPhoneNumber: (phoneNumber) =>
      dispatch(authActions.verifyPhoneNumber(phoneNumber)),
    mappedverifyPhoneCode: (phoneCode) =>
      dispatch(authActions.verifyPhoneCode(phoneCode)),
  };
};

export default connect(mapStateToProps, mapDispatchToprops)(Landlord);
