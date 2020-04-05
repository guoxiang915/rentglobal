import { connect } from "react-redux";
import AppSidebar from "../../components/Layout/AppSidebar";
import * as authActions from "../../actions/authActions";

const mapStateToProps = (state) => {
  return {
    auth: state.authState,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(AppSidebar);
