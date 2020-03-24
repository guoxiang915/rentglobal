import { connect } from "react-redux";
import OfficeDetailForm from "../../components/Layout/OfficeDetailForm";
import * as authActions from "../../actions/authActions";
import { withRouter } from "react-router-dom";

const mapStateToProps = state => {
  return {
    auth: state.authState
  };
};

const mapDispatchToProps = dispatch => {
  return {
    mappedLogin: (credentials, history) =>
      dispatch(authActions.login(credentials, history))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(OfficeDetailForm));
