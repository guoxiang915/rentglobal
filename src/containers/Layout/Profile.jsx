import { connect } from 'react-redux';
import Profile from '../../components/Layout/Profile';
import * as authActions from '../../actions/authActions';

const mapStateToProps = (state) => {
  return {
    auth: state.authState,
  };
};

const mapDispatchToProps = (dispatch) => ({
  deleteDocument: (userRole, docType, docFile) => dispatch(authActions.deleteDocument(userRole, docType, docFile)),
  deleteAvatar: () => dispatch(authActions.deleteAvatar()),
  deleteAccount: (userRole) => dispatch(authActions.deleteAccount(userRole))
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
