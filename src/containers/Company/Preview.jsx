import { connect } from 'react-redux';
import Preview from '../../components/Company/Preview';

const mapStateToProps = (state) => {
  return {
    auth: state.authState,
    appState: state.appState,
  };
};

export default connect(mapStateToProps)(Preview);
