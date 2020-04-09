import { connect } from "react-redux";
import Profile from "../../components/Layout/Profile";
import * as authActions from "../../actions/authActions";

const mapDispatchToProps = dispatch => ({
  deleteDocument: (role, docType, docFile) =>
    dispatch(authActions.deleteDocument(role, docType, docFile)),
});

export default connect(null, mapDispatchToProps)(Profile);
