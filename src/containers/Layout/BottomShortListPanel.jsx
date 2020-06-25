import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import BottomShortListPanel from '../../components/Layout/BottomShortListPanel';
import * as authActions from '../../actions/authActions';

const mapStateToProps = (state) => {
  return {
    auth: state.authState,
    app: state.appState,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    mappedlogout: () => dispatch(authActions.logout()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(BottomShortListPanel));
