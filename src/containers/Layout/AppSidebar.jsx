import { connect } from "react-redux";
import AppSidebar from "../../components/Layout/AppSidebar";

const mapStateToProps = (state) => {
  return {
    auth: state.authState,
  };
};

export default connect(mapStateToProps)(AppSidebar);
