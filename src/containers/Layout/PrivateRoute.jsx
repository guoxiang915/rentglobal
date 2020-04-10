import { connect } from "react-redux";
import PropTypes from "prop-types";
import PrivateRoute from "../../components/Layout/PrivateRoute";
import * as authActions from "../../actions/authActions";

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.authState
});

const mapDispatchToProps = dispatch => ({
  mappedAuthenticate: (token, history) =>
    dispatch(authActions.authenticate(token, history)),
  mappedlogout: () => dispatch(authActions.logout()),
  mappedToggleRole: (userRole, history) =>
    dispatch(authActions.setUserRole(userRole, history))
});

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute);
