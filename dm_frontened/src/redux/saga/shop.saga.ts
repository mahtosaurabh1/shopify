import { AxiosResponse } from "axios";
import { put, takeEvery } from "redux-saga/effects";

import { baseInstance } from "../../service/instance";
import { toastError, toastSuccess } from "../../shared/toast";
import { endpoint } from "../../shared/apiEndpoint";
import { addShopFailure, addShopSuccess, deleteShopFailure, deleteShopSuccess, editShopFailure, editShopSuccess, listShopFailure, listShopSuccess } from "../features/shop.slice";

function* addShopSaga(action: any) {
  let { successCallback,...payload } = action.payload;
  try {
    const {data}: AxiosResponse = yield baseInstance.post(endpoint.addShop, payload);
    if (data) {      
      yield put(addShopSuccess(data));
      successCallback();
      toastSuccess("added");
    }
  } catch (err: any) {    
    toastError(err.response.data.result);
    yield put(addShopFailure(err));
  }
}

function* listShopSaga(action: any) {  
  try {
    const {data}: AxiosResponse = yield baseInstance.get(endpoint.getShop, { params: action.payload } );
    if (data) {
      yield put(listShopSuccess(data));
    }
  } catch (err: any) {
    toastError(err.message);
    yield put(listShopFailure(err));
  }
}

function* deleteShopSaga(action: any) {
  let { successCallback,...payload } = action.payload;
  try {
    const {data}: AxiosResponse = yield baseInstance.delete(endpoint.deleteShop, { params: payload } );
    if (data) {      
      yield put(deleteShopSuccess(data));
      successCallback();
      toastSuccess("deleted");
    }
  } catch (err: any) {
    toastError(err.message);
    yield put(deleteShopFailure(err));
  }
}

function* editShopSaga(action: any) {
  let { successCallback,...payload } = action.payload;
  try {
    const {data}: AxiosResponse = yield baseInstance.patch(endpoint.editShop, payload);
    if (data) {      
      yield put(editShopSuccess(data));
      successCallback();
      toastSuccess("updated");
    }
  } catch (err: any) {
    toastError(err.message);
    yield put(editShopFailure(err));
  }
}

function* shopSaga() {
  yield takeEvery("shopSlice/addShop", addShopSaga);
  yield takeEvery("shopSlice/listShop", listShopSaga);
  yield takeEvery("shopSlice/deleteShop", deleteShopSaga);
  yield takeEvery("shopSlice/editShop", editShopSaga);
}

export default shopSaga;
