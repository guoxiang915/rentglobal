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
      dispatch(authActions.updateUser(user, history))
  };
};

export default connect(mapStateToProps, mapDispatchToprops)(Landlord);
