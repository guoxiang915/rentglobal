import { connect } from "react-redux";
import AppSidebar from "../../components/Layout/AppSidebar";
import * as authActions from "../../actions/authActions";
import { withRouter } from "react-router-dom";
import * as appActions from "../../actions/appActions";

const mapStateToProps = state => {
  return {
    auth: state.authState,
    appState: state.appState
  };
};

const mapDispatchToProps = dispatch => {
  return {
    mappedSetUserType: (userType, history) =>
      dispatch(authActions.setUserType({ userType }))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(AppSidebar));
