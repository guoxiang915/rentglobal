import { connect } from 'react-redux';
import Company from '../../components/Company';
import * as authActions from '../../actions/authActions';
import * as appActions from '../../actions/appActions';

const mapStateToProps = (state) => {
  return {
    auth: state.authState,
    appState: state.appState,
  };
};

const mapDispatchToprops = (dispatch) => {
  return {
    mappedupdateUser: (field, user, history) => dispatch(authActions.updateUser(field, user, history)),
    mappedverifyPhoneNumber: (phoneNumber) =>
      dispatch(authActions.verifyPhoneNumber(phoneNumber)),
    mappedverifyPhoneCode: (phoneCode) =>
      dispatch(authActions.verifyPhoneCode(phoneCode)),
    mappedShowBottomShortList: (visible) => dispatch(appActions.showBottomShortList(visible)),
    mappedSetOfficeShortList: (list) => dispatch(appActions.setOfficeShortList(list)),
  };
};

export default connect(mapStateToProps, mapDispatchToprops)(Company);
