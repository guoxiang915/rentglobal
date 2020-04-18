import { combineReducers } from 'redux';
import authReducer from './authReducer';
import appReducer from './appReducer';
import officeReducer from './officeReducer';

export default combineReducers({
  authState: authReducer,
  appState: appReducer,
  officeState: officeReducer,
});
