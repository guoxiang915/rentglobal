import { takeLatest, put, call } from "redux-saga/effects";
import { API } from "../../utils/constants";
import api from "../../api/api";
import Auth from "../../utils/auth";
import flushMessage from "../flushMessages";

const authObj = new Auth();

const sendRequest = async credentials => {
  let resp = null;
  try {
    resp = await api.post(`${API}/auth/login`, credentials);
  } catch (error) {
    console.log(error);
    resp = error.response;
  } finally {
    return resp;
  }
};

function* login(action) {
  try {
    const response = yield call(sendRequest, action.payload);
    if (response.status === 200) {
      yield put({
        type: "LOGIN_SUCCESS",
        resp: response.data
      });
      authObj.setToken(response.data.token);

      console.log(response.data);
      action.history.push("/landlord");
    } else if (response.status === 403) {
      yield put({
        type: "USER_NOT_ACTIVATED",
        resp: response.data
      });
    } else {
      yield put({
        type: "LOGIN_FAILED",
        resp: response.data
      });
    }
  } catch (error) {
    console.log(error);
  }
  yield call(flushMessage);
}

export default function* watchLogin() {
  yield takeLatest("REQUEST_LOGIN", login);
}
