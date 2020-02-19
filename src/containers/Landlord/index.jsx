import { connect } from "react-redux";
import Landlord from "../../components/Landlord";
import * as authActions from "../../actions/authActions";
import * as appActions from "../../actions/appActions";

const mapStateToProps = state => {
  return {
    auth: state.authState,
    appState: state.appState
  };
};

const mapDispatchToprops = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToprops)(Landlord);
