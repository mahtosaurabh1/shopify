import { AxiosResponse } from "axios";
import { debounce, put, takeEvery } from "redux-saga/effects";

import { baseInstance } from "../../service/instance";
import { toastError, toastSuccess } from "../../shared/toast";
import { endpoint } from "../../shared/apiEndpoint";
import { addProductTransactionFailure, addProductTransactionSuccess, deleteProductTransactionFailure, deleteProductTransactionSuccess, editProductTransactionFailure, editProductTransactionSuccess, getStockLeftFailure, getStockLeftSuccess, listProductTransactionFailure, listProductTransactionSuccess, totalBuySellPriceFailure, totalBuySellPriceSuccess } from "../features/product.transaction.slice";


function* addProductTransactionSaga(action: any) {
  let { successCallback, ...payload } = action.payload;
  try {
    const { data }: AxiosResponse = yield baseInstance.post(
      endpoint.addProductTransaction,
      payload
    );
    if (data) {
      yield put(addProductTransactionSuccess(data));
      successCallback();
      toastSuccess("added");
    }
  } catch (err: any) {
    toastError(err.message);
    yield put(addProductTransactionFailure(err));
  }
}

function* listProductTransactionSaga(action: any) {
  const { shopid, productname,transactionstatus,deal,startDate,endDate } = action.payload;
  try {
    const { data }: AxiosResponse = yield baseInstance.get(
      endpoint.getProductTransaction,
      {
        params: {
          productname: productname || "",
          transactionstatus:transactionstatus,
          deal:deal,
          startDate:startDate,
          endDate:endDate
        },
        headers: {
          Authorization: shopid,
        },
      }
    );
    if (data) {
      yield put(listProductTransactionSuccess(data));
    }
  } catch (err: any) {
    toastError(err.message);
    yield put(listProductTransactionFailure(err));
  }
}

function* deleteProductTransactionSaga(action: any) {
  let { successCallback, ...payload } = action.payload;
  try {
    const { data }: AxiosResponse = yield baseInstance.delete(
      endpoint.deleteProductTransaction,
      { params: payload }
    );
    if (data) {
      yield put(deleteProductTransactionSuccess(data));
      successCallback();
      toastSuccess("deleted");
    }
  } catch (err: any) {
    toastError(err.message);
    yield put(deleteProductTransactionFailure(err));
  }
}

function* editProductTransactionSaga(action:any) {
  let { successCallback, ...payload } = action.payload;
  try {
    const { data }: AxiosResponse = yield baseInstance.patch(
      endpoint.editProductTransaction,
      payload
    );
    if (data) {
      yield put(editProductTransactionSuccess(data));
      successCallback();
      toastSuccess("updated");
    }
  } catch (err: any) {
    toastError(err.message);
    yield put(editProductTransactionFailure(err));
  }
}

function* totalBuySellPriceSaga(action: any) {
  const { shopid ,startDate,endDate} = action.payload;
  try {
    const { data }: AxiosResponse = yield baseInstance.get(
      endpoint.totalbuysellprice,
      {
        params: {
          startDate:startDate,
          endDate:endDate
        },
        headers: {
          Authorization: shopid,
        },
      }
    );
    if (data) {
      yield put(totalBuySellPriceSuccess(data));
    }
  } catch (err: any) {
    toastError(err.message);
    yield put(totalBuySellPriceFailure(err));
  }
}

function* getStockLeftSaga(action: any) {
  const { shopid } = action.payload;
  try {
    const { data }: AxiosResponse = yield baseInstance.get(
      endpoint.stockleft,
      {
        headers: {
          Authorization: shopid,
        },
      }
    );
    if (data) {
      yield put(getStockLeftSuccess(data));
    }
  } catch (err: any) {
    toastError(err.message);
    yield put(getStockLeftFailure(err));
  }
}

function* productTransactionSaga() {
  yield takeEvery("productTransactionSlice/addProductTransaction", addProductTransactionSaga);
  yield debounce(500,"productTransactionSlice/listProductTransaction", listProductTransactionSaga);
  yield takeEvery("productTransactionSlice/deleteProductTransaction", deleteProductTransactionSaga);
  yield takeEvery("productTransactionSlice/editProductTransaction", editProductTransactionSaga);
  yield takeEvery("productTransactionSlice/totalBuySellPrice", totalBuySellPriceSaga);
  yield takeEvery("productTransactionSlice/getStockLeft", getStockLeftSaga);

}

export default productTransactionSaga;
