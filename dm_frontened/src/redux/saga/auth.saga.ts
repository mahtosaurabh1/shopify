import { AxiosResponse } from "axios";
import { put, takeEvery } from "redux-saga/effects";
import {
  createAccountFailure,
  createAccountSuccess,
  loginAccountFailure,
  loginAccountSuccess,
} from "../features/auth.slice";
import { baseInstance } from "../../service/instance";
import { toastError, toastSuccess } from "../../shared/toast";
import { endpoint } from "../../shared/apiEndpoint";

function* createAccountSaga(action: any) {
  let { userInfo, successCallback } = action.payload;
  try {
    const {data}: AxiosResponse = yield baseInstance.post(endpoint.register, userInfo);
    if (data) {      
      localStorage.setItem("userinfo", JSON.stringify(data));
      yield put(createAccountSuccess(data));
      successCallback();
      toastSuccess("user-registered");
    }
  } catch (err: any) {
    toastError(err.message);
    yield put(createAccountFailure(err));
  }
}

function* loginAccountSaga(action: any) {
  let { userInfo, successCallback } = action.payload;
  try {
    const {data}: AxiosResponse = yield baseInstance.post(endpoint.login, userInfo);
    if (data) {
      localStorage.setItem("userinfo", JSON.stringify(data));
      yield put(loginAccountSuccess(data));
      successCallback();
      toastSuccess("user-loggedin");
    }
  } catch (err: any) {
    toastError(err.message);
    yield put(loginAccountFailure(err));
  }
}

function* authSaga() {
  yield takeEvery("authSlice/createAccount", createAccountSaga);
  yield takeEvery("authSlice/loginAccount", loginAccountSaga);
}

export default authSaga;
