import { takeLatest, put, call } from 'redux-saga/effects';
import api from '../../api/api';
import flushMessage from '../flushMessages';

const sendRequest = async (office) => {
  let resp = null;
  try {
    resp = await api.post('offices/', office);
  } catch (error) {
    resp = error.response;
  }
  return resp;
};

function* createOffice(action) {
  try {
    const response = yield call(sendRequest, action.office);
    // let response = await api.post('/offices/', action.office);
    if (response.status === 200) {
      yield put({
        type: 'CREATE_OFFICE_SUCCESS',
        resp: response.data,
      });
    } else {
      yield put({
        type: 'CREATE_OFFICE_FAILED',
        resp: response.data,
      });
    }
  } catch (error) {
    yield put({
      type: 'CREATE_OFFICE_FAILED',
      resp: { msg: error },
    });
  }
  yield call(flushMessage);
}

export function* watchCreateOffice() {
  yield takeLatest('REQUEST_CREATE_OFFICE', createOffice);
}
