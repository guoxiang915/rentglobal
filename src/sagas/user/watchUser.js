import { takeLatest, put, call } from "redux-saga/effects";
import api from "../../api/api";
import flushMessage from "../flushMessages";

const sendRequest = async ({ field, data }) => {
  let resp = null;
  try {
    if (field === "profile") {
      resp = await api.put(`/users/me/edit/${field}?role=${data.role}`, {
        ...data.profile
      });
    } else if (field === "password") {
      resp = await api.put(`/users/me/edit/${field}`, data);
    } else if (field === "avatar") {
      resp = await api.put(`/users/me/edit/${field}`, data);
    } else if (field === "documents") {
      resp = await api.put(`/users/me/edit/${field}?role=${data.role}`, {
        documentInfo: data.documentInfo
      });
    } else {
      resp = {};
    }
  } catch (error) {
    console.log(error);
    resp = error.response;
  } finally {
    return resp;
  }
};

function* updateUser(action) {
  try {
    let response = yield call(sendRequest, {
      field: action.field,
      data: action.payload
    });
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

export function* watchUpdateUser() {
  yield takeLatest("REQUEST_UPDATE_USER", updateUser);
}

export function* watchSetUserRole() {
  yield takeLatest("SET_USER_ROLE", async function* setUserRole(action) {
    action.history.push(`/${action.role}`);
    let resp = null;
    try {
      resp = await api.put(`/users/me/edit/role`, { role: action.role });
    } catch (error) {
      console.log(error);
      resp = error.response;
    }
    if (resp.status === 200) {
      yield put({
        type: "UPDATE_USER_SUCCESS",
        resp: resp.data
      });
    } else {
      yield put({
        type: "UPDATE_USER_FAILED",
        resp: resp.data
      });
    }
    yield call(flushMessage);
  });
}
