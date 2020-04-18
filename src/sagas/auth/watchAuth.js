import { takeLatest, put, call } from "redux-saga/effects";
import api from "../../api/api";
import flushMessage from "../flushMessages";

const sendRequest = async (token) => {
  let resp = null;
  try {
    resp = await api.post("/auth/validate-token", { token });
  } catch (error) {
    console.log(error);
    resp = error.response;
  }
  return resp;
};

function* authenticate(action) {
  try {
    let response = null;
    if (action.token) {
      response = yield call(sendRequest, action.token);
    }
    if (response && response.status === 200) {
      yield put({
        type: "AUTH_SUCCESS",
        resp: response.data,
      });
    } else {
      yield put({
        type: "AUTH_FAILED",
        resp: response ? response.data : "",
      });
    }
  } catch (error) {
    yield put({
      type: "AUTH_FAILED",
      resp: "",
    });
  }
  yield call(flushMessage);
}

export default function* watchAuth() {
  yield takeLatest("REQUEST_AUTHENTICATION", authenticate);
}
