import { all } from "redux-saga/effects";
import watchAuth from "./auth/watchAuth";
import watchLogin from "./auth/watchLogin";
import watchRegister from "./auth/watchRegister";
import * as watchUser from "./user/watchUser";

export default function* rootSaga() {
  yield all([
    watchAuth(),
    watchLogin(),
    watchRegister(),
    ...Object.entries(watchUser).map(([key, val]) => val())
  ]);
}
