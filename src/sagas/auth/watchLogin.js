import { takeLatest, put, call } from "redux-saga/effects";
import api from "../../api/api";
import Auth from "../../utils/auth";
import flushMessage from "../flushMessages";

const authObj = new Auth();

const sendRequest = async credentials => {
  let resp = null;
  try {
    resp = await api.post(`/auth/login`, credentials);
  } catch (error) {
    console.log(error);
    resp = error.response;
  } finally {
    return resp;
  }
};

const sendRequestForUser = async () => {
  let resp = null;
  try {
    resp = await api.get(`/users/me`);
  } catch (error) {
    console.log(error);
    resp = error.response;
  } finally {
    return resp;
  }
};

function* login(action) {
  try {
    let response = yield call(sendRequest, action.payload);
    if (response.status === 200) {
      authObj.setToken(response.data.token);
      authObj.setRefreshToken(response.data.refreshToken);

      response = yield call(sendRequestForUser);
      if (response.status === 200) {
        yield put({
          type: "LOGIN_SUCCESS",
          resp: response.data
        });
        let route = "";
        if (response.data.role === "landlord") {
          route = "/landlord";
        } else {
          route = "/company";
        }
        if (!response.data.profile) {
          route += "/profile";
        }
        action.history.push(route);
      } else {
        yield put({
          type: "LOGIN_FAILED",
          resp: response.data
        });
      }
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
