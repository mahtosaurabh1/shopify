import { AxiosResponse } from "axios";
import { debounce, put, takeEvery } from "redux-saga/effects";

import { baseInstance } from "../../service/instance";
import { toastError, toastSuccess } from "../../shared/toast";
import { endpoint } from "../../shared/apiEndpoint";
import {
  addProductFailure,
  addProductSuccess,
  deleteProductFailure,
  deleteProductSuccess,
  editProductFailure,
  editProductSuccess,
  listProductFailure,
  listProductSuccess,
} from "../features/product.slice";

function* addProductSaga(action: any) {
  let { successCallback, ...payload } = action.payload;
  try {
    const { data }: AxiosResponse = yield baseInstance.post(
      endpoint.addProduct,
      payload
    );
    if (data) {
      yield put(addProductSuccess(data));
      successCallback();
      toastSuccess("added");
    }
  } catch (err: any) {
    toastError(err.response.data.result);
    yield put(addProductFailure(err));
  }
}

function* listProductSaga(action: any) {
  const { shopid, productname } = action.payload;
  try {
    const { data }: AxiosResponse = yield baseInstance.get(
      endpoint.getProduct,
      {
        params: {
          productname: productname || "",
        },
        headers: {
          Authorization: shopid,
        },
      }
    );
    if (data) {
      yield put(listProductSuccess(data));
    }
  } catch (err: any) {
    toastError(err.message);
    yield put(listProductFailure(err));
  }
}

function* deleteProductSaga(action: any) {
  let { successCallback, ...payload } = action.payload;
  try {
    const { data }: AxiosResponse = yield baseInstance.delete(
      endpoint.deleteProduct,
      { params: payload }
    );
    if (data) {
      yield put(deleteProductSuccess(data));
      successCallback();
      toastSuccess("deleted");
    }
  } catch (err: any) {
    toastError(err.message);
    yield put(deleteProductFailure(err));
  }
}

function* editProductSaga(action: any) {
  let { successCallback, ...payload } = action.payload;
  try {
    const { data }: AxiosResponse = yield baseInstance.patch(
      endpoint.editProduct,
      payload
    );
    if (data) {
      yield put(editProductSuccess(data));
      successCallback();
      toastSuccess("updated");
    }
  } catch (err: any) {
    toastError(err.message);
    yield put(editProductFailure(err));
  }
}

function* productSaga() {
  yield takeEvery("productSlice/addProduct", addProductSaga);
  yield debounce(500,"productSlice/listProduct", listProductSaga);
  yield takeEvery("productSlice/deleteProduct", deleteProductSaga);
  yield takeEvery("productSlice/editProduct", editProductSaga);
}

export default productSaga;
