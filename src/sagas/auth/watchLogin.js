import { takeLatest, put, call } from "redux-saga/effects";
import { API } from "../../utils/constants";
import Auth from "../../utils/auth";
import flushMessage from "../flushMessages";

const authObj = new Auth();

const sendRequest = async credentials => {
  try {
    // for mock data
    let resp = await new Promise(resolve =>
        setTimeout(() => resolve({ success: true, token: "auth-token", message: "" }),
          3000
        )
      );
      
    return JSON.stringify(resp);

    resp = await fetch(`${API}/users/userLogin`, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(credentials)
    });
    let json = await resp.json();
    return json;
  } catch (error) {
    alert(error.message);
    console.log(error);
  }
};

function* login(action) {
  try {
    const response = yield call(sendRequest, action.payload);
    if (response.success) {
      yield put({
        type: "LOGIN_SUCCESS",
        resp: response
      });
      //localStorage.setItem('userToken', response.token);
      authObj.setToken(response.token);
      action.history.push("/");
    } else if (!response.success && response.message) {
      yield put({
        type: "LOGIN_FAILED",
        resp: response
      });
    }
  } catch (error) {
    alert(error.message);
    console.log(error);
  }
  yield call(flushMessage);
}

export default function* watchLogin() {
  yield takeLatest("REQUEST_LOGIN", login);
}
