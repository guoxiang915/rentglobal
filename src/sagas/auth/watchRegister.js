import { takeLatest, put, call } from 'redux-saga/effects';
import api from '../../api/api';
import flushMessage from '../flushMessages';

const sendRequest = async (credentials) => {
  let resp = null;
  try {
    resp = await api.post('/auth/register', credentials);
  } catch (error) {
    resp = error.response;
  }
  return resp;
};

function* register(action) {
  try {
    const response = yield call(sendRequest, action.payload);
    if (response.status === 200) {
      yield put({
        type: 'USER_NOT_ACTIVATED',
        resp: response.data,
      });
    } else {
      yield put({
        type: 'REGISTER_USER_FAILED',
        resp: response.data,
      });
    }
  } catch (error) {
    yield put({
      type: 'REGISTER_USER_FAILED',
      resp: {},
    });
  }
  yield call(flushMessage);
}

export default function* watchRegister() {
  yield takeLatest('REQUEST_USER_REGISTER', register);
}
