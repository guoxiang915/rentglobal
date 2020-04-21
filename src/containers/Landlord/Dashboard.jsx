import { connect } from 'react-redux';
import Dashboard from '../../components/Landlord/Dashboard';

const mapStateToProps = (state) => {
  return {
    auth: state.authState,
    appState: state.appState,
  };
};

export default connect(mapStateToProps)(Dashboard);
