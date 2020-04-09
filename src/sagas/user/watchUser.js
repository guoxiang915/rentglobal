import { takeLatest, put, call } from 'redux-saga/effects';
import api from '../../api/api';
import flushMessage from '../flushMessages';

const sendRequest = async ({ field, data }) => {
  let resp = null;
  try {
    if (field === 'profile') {
      resp = await api.put(`/users/me/edit/${field}?role=${data.role}`, {
        ...data.profile,
      });
    } else if (field === 'password') {
      resp = await api.put(`/users/me/edit/${field}`, data);
    } else if (field === 'avatar') {
      resp = await api.put(`/users/me/edit/${field}`, data);
    } else if (field === 'documents') {
      resp = await api.put(`/users/me/edit/${field}?role=${data.role}`, {
        ...data.documentInfo,
      });
    } else {
      resp = {};
    }
  } catch (error) {
    resp = error.response;
  }
  return resp;
};

function* updateUser(action) {
  try {
    const response = yield call(sendRequest, {
      field: action.field,
      data: action.payload,
    });
    if (response.status === 200) {
      yield put({
        type: 'UPDATE_USER_SUCCESS',
        resp: response.data,
      });
    } else {
      yield put({
        type: 'UPDATE_USER_FAILED',
        resp: response.data,
      });
    }
  } catch (error) {
    yield put({
      type: 'UPDATE_USER_FAILED',
      resp: { msg: error },
    });
  }
  yield call(flushMessage);
}

export function* watchUpdateUser() {
  yield takeLatest('REQUEST_UPDATE_USER', updateUser);
}

export function* watchSetUserRole() {
  yield takeLatest('SET_USER_ROLE', function* setUserRole(action) {
    let pathname = action.history && action.history.location.pathname;
    if (pathname.startsWith('/company')) {
      pathname = `/${action.role}${pathname.substring('/company'.length)}`;
    } else if (pathname.startsWith('/landlord')) {
      pathname = `/${action.role}${pathname.substring('/landlord'.length)}`;
    } else {
      pathname = `/${action.role}`;
    }
    action.history.push(pathname);
    yield call(flushMessage);
  });
}
