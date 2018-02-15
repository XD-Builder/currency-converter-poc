import { takeEvery, call, put, select } from 'redux-saga/effects';

// Import a list of actions so we can use them for saga effects
import {
  CURRENCY_CHANGE_BASE,
  CURRENCY_GET_INITIAL_CONVERSION,
  CURRENCY_SWAP_CURRENCY,
  CURRENCY_CONVERSION_RESULT,
  CURRENCY_CONVERSION_ERROR,
} from '../actions/actionTypes';

export const getLatestRate = currency => fetch(`https://api.fixer.io/latest?base=${currency}`);

// This generator will go to fixer io and get latest conversion rate.
// It will be dispatched by actions defined in rootSaga generator
export function* fetchLatestConversionRates(action) {
  try {
    // If the action doesn't contain currency, then get that from the state tree
    let currency = action.currency;
    if (currency === undefined) {
      // wait for the promise to return by select
      currency = yield select(state => state.currencies.baseCurrency);
    }

    // Yield getLatestRate to get a Promise<Response> back
    // To test it our yourself, https://api.fixer.io/latest?base=${currency} with USD as the ${currency}
    // See https://developer.mozilla.org/en-US/docs/Web/API/Response
    const response = yield call(getLatestRate, currency);
    const result = yield response.json();

    // If there is an error in the result then create an action object
    // with type CURRENCY_CONVERSION_ERROR, and action.error = result.error
    if (result.error) {
      yield put({ type: CURRENCY_CONVERSION_ERROR, error: result.error });
    } else {
      // if no error, the create an result action with result and zero err
      yield put({ type: CURRENCY_CONVERSION_RESULT, result });
    }
  } catch (error) {
    // if any error happens during the process, then yield a put
    yield put({ type: CURRENCY_CONVERSION_ERROR, error: error.message });
  }
}

// These action types will invoke fetchLatestConversionRates generator defined above.
function* rootSaga() {
  yield takeEvery(CURRENCY_GET_INITIAL_CONVERSION, fetchLatestConversionRates);
  yield takeEvery(CURRENCY_CHANGE_BASE, fetchLatestConversionRates);
  yield takeEvery(CURRENCY_SWAP_CURRENCY, fetchLatestConversionRates);
}

export default rootSaga;
