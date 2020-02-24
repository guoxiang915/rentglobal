import { connect } from "react-redux";
import AppSidebar from "../../components/Layout/AppSidebar";
import * as authActions from "../../actions/authActions";

const mapStateToProps = state => {
  return {
    auth: state.authState,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    mappedSetUserRole: role => dispatch(authActions.setUserRole({ role }))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppSidebar);
