import { takeEvery, call, put, select } from 'redux-saga/effects';

import {
  CURRENCY_CHANGE_BASE,
  CURRENCY_GET_INITIAL_CONVERSION,
  CURRENCY_SWAP_CURRENCY,
  CURRENCY_CONVERSION_RESULT,
  CURRENCY_CONVERSION_ERROR,
} from '../actions/actionTypes';

export const getLatestRate = currency => fetch(`http://api.fixer.io/latest?base=${currency}`);

function* fetchLatestConversionRates(action) {
  try {
    let currency = action.currency;
    if (currency === undefined) {
      currency = yield select(state => state.currencies.baseCurrency);
    }
    const response = yield call(getLatestRate, currency);
    const result = yield response.json();
    if (result.error) {
      yield put({ type: CURRENCY_CONVERSION_ERROR, error: result.error });
    } else {
      yield put({ type: CURRENCY_CONVERSION_RESULT, result });
    }
  } catch (error) {
    yield put({ type: CURRENCY_CONVERSION_ERROR, error: error.message });
  }
}

function* rootSaga() {
  yield takeEvery(CURRENCY_GET_INITIAL_CONVERSION, fetchLatestConversionRates);
  yield takeEvery(CURRENCY_CHANGE_BASE, fetchLatestConversionRates);
  yield takeEvery(CURRENCY_SWAP_CURRENCY, fetchLatestConversionRates);
}

export default rootSaga;
