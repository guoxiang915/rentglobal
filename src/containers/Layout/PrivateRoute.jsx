import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import PrivateRoute from '../../components/Layout/PrivateRoute';
import * as authActions from '../../actions/authActions';
import * as appActions from '../../actions/appActions';

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.authState,
  app: state.appState,
});

const mapDispatchToProps = (dispatch) => ({
  mappedAuthenticate: (token, history) => dispatch(authActions.authenticate(token, history)),
  mappedlogout: () => dispatch(authActions.logout()),
  mappedToggleRole: (userRole, history, redirectPath) => dispatch(authActions.setUserRole(userRole, history, redirectPath)),
  mappedChangeLanguage: (language) => dispatch(appActions.changeLanguage(language)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute);
