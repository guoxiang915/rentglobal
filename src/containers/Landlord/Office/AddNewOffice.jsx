import { connect } from "react-redux";
import AddNewOffice from "../../../components/Landlord/Office/AddNewOffice";
import * as officeActions from "../../../actions/officeActions";

const mapStateToProps = state => {
  return {
    office: state.officeState
  };
};

const mapDispatchToprops = dispatch => {
  return {
    mappedCreateOffice: office => dispatch(officeActions.createOffice(office))
  };
};

export default connect(mapStateToProps, mapDispatchToprops)(AddNewOffice);
