import { takeLatest, put, call } from "redux-saga/effects";
import api from "../../api/api";
import flushMessage from "../flushMessages";

const sendRequest = async updateData => {
  let resp = null;
  try {
    resp = await api.put(`/users/me/edit/profile`, updateData);
  } catch (error) {
    console.log(error);
    resp = error.response;
  } finally {
    return resp;
  }
};

function* updateUser(action) {
  try {
    let response = yield call(sendRequest, action.payload);
    if (response.status === 200) {
      yield put({
        type: "UPDATE_USER_SUCCESS",
        resp: response.data
      });
    } else {
      yield put({
        type: "UPDATE_USER_FAILED",
        resp: response.data
      });
    }
  } catch (error) {
    yield put({
      type: "UPDATE_USER_FAILED",
      resp: { msg: error }
    });
  }
  yield call(flushMessage);
}

export default function* watchAuth() {
  yield takeLatest("REQUEST_UPDATE_USER", updateUser);
}
