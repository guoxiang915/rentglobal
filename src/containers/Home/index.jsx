import { connect } from "react-redux";
import Home from "../../components/Home";

const mapStateToProps = (state) => {
  return {
    auth: state.authState,
  };
};

export default connect(mapStateToProps)(Home);
