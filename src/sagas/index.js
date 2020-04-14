import { all } from 'redux-saga/effects';
import watchAuth from './auth/watchAuth';
import watchLogin from './auth/watchLogin';
import watchRegister from './auth/watchRegister';
import watchUser from './user/watchUser';
import * as watchOffice from './office/watchOffice';

export default function* rootSaga() {
  yield all([
    watchAuth(),
    watchLogin(),
    watchRegister(),
    watchUser(),
    ...Object.values(watchOffice).map((val) => val()),
  ]);
}
