import { connect } from 'react-redux';
import Company from '../../components/Company';
import * as authActions from '../../actions/authActions';

const mapStateToProps = (state) => {
  return {
    auth: state.authState,
    appState: state.appState,
  };
};

const mapDispatchToprops = (dispatch) => {
  return {
    mappedupdateUser: (field, user, history) => dispatch(authActions.updateUser(field, user, history)),
  };
};

export default connect(mapStateToProps, mapDispatchToprops)(Company);
