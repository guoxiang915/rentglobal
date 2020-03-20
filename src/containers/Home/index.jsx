import { connect } from "react-redux";
import Home from "../../components/Home";

const mapStateToProps = state => {
  return {
    auth: state.authState
  };
};

const mapDispatchToprops = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToprops)(Home);
