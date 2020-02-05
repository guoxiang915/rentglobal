import { takeLatest, put, call } from "redux-saga/effects";
import { API } from "../../utils/constants";
import flushMessage from "../flushMessages";

const sendRequest = async token => {
  try {
    // for mock data
    return await new Promise(resolve =>
      setTimeout(
        resolve(
          JSON.stringify({ success: true, token: "auth-token", message: "" })
        ),
        3000
      )
    );

    let resp = await fetch(`${API}/users/validateToken`, {
      method: "get",
      headers: {
        Authorization: token,
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    });
    let json = await resp.json();
    return json;
  } catch (error) {
    alert(error.message);
    console.log(error);
  }
};

function* authenticate(action) {
  try {
    let response = yield call(sendRequest, action.token);
    response = JSON.parse(response);
    if (response.success) {
      yield put({
        type: "AUTH_SUCCESS",
        resp: response
      });
    } else if (!response.success && response.message) {
      yield put({
        type: "AUTH_FAILED",
        resp: response
      });
      // action.history.push("/login");
    }
  } catch (error) {
    alert(error.message);
    console.log(error);
  }
  yield call(flushMessage);
}

export default function* watchAuth() {
  yield takeLatest("REQUEST_AUTHENTICATION", authenticate);
}
