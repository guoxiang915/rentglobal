import { put, call } from 'redux-saga/effects';

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export default function* flushMessage() {
  yield call(delay, 4000);
  yield put({
    type: 'FLUSH_MESSAGES',
  });
}
