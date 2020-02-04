import { connect } from "react-redux";
import AppWrapper from "../../components/AppWrapper";
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
    mappedlogout: () => dispatch(authActions.logout()),
    mappedshowAppBar: visible => dispatch(appActions.showAppBar(visible)),
    mappedshowSearchBar: visible => dispatch(appActions.showSearchBar(visible)),
    mappedupdateUser: (user, history) =>
      dispatch(authActions.updateUser(user, history))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(AppWrapper));
