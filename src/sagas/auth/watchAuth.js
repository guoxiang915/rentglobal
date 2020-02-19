import { takeLatest, put, call } from "redux-saga/effects";
import { API } from "../../utils/constants";
import api from "../../api/api";
import flushMessage from "../flushMessages";

const sendRequest = async token => {
  let resp = null;
  try {
    resp = await api.post(`${API}/auth/validate-token`, { token });
  } catch (error) {
    console.log(error);
    resp = error.response;
  } finally {
    return resp;
  }
  // try {
  //   // mock data
  //   let resp = { success: false, msg: "" };

  //   let resp = await fetch(`${API}/auth/activate/${token}`, {
  //     method: "get",
  //     headers: {
  //       Authorization: token,
  //       Accept: "application/json",
  //       "Content-Type": "application/json"
  //     }
  //   });

  //   let json = await resp.json();
  //   return json;
  // } catch (error) {
  //   console.log(error);
  // }
};

function* authenticate(action) {
  try {
    let response = yield call(sendRequest, action.token);
    if (response.status === 200) {
      yield put({
        type: "AUTH_SUCCESS",
        resp: response.data
      });
    } else {
      yield put({
        type: "AUTH_FAILED",
        resp: response.data
      });
      // action.history.push("/login");
    }
  } catch (error) {
    console.log(error);
  }
  yield call(flushMessage);
}

export default function* watchAuth() {
  yield takeLatest("REQUEST_AUTHENTICATION", authenticate);
}
