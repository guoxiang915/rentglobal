import { connect } from "react-redux";
import AppHeader from "../../components/AppHeader";
import * as authActions from "../../actions/authActions";
import { withRouter } from "react-router-dom";

const mapStateToProps = state => {
  return {
    auth: state.authState
  };
};

const mapDispatchToProps = dispatch => {
  return {
    mappedlogout: () => dispatch(authActions.logout()),
    mappedSetUserRole: (role, history) => dispatch(authActions.setUserRole(role, history))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(AppHeader));
