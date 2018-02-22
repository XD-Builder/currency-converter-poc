import { call, put } from 'redux-saga/effects';
import sagaHelper from 'redux-saga-testing';
import { fetchLatestConversionRates, getLatestRate } from '../sagas';

import store from '../store';

import {
  CURRENCY_GET_INITIAL_CONVERSION,
  CURRENCY_CONVERSION_RESULT,
  CURRENCY_CONVERSION_ERROR,
} from '../../actions/actionTypes';

const respErrorJson = {
  base: 'USD',
  date: '2018-01-12',
  error: 'Something terrible happened',
};

const respSuccessJson = {
  base: 'USD',
  date: '2018-01-12',
  rates: {
    AUD: 1.2702,
    BGN: 1.6114,
    BRL: 3.2099,
    CAD: 1.2519,
    CHF: 0.97116,
    CNY: 6.461,
    CZK: 21.027,
    DKK: 6.1372,
    GBP: 0.73315,
    HKD: 7.8242,
    HRK: 6.1345,
    HUF: 254.38,
    IDR: 13331.0,
    ILS: 3.4005,
    INR: 63.601,
    JPY: 111.13,
    KRW: 1062.5,
    MXN: 19.112,
    MYR: 3.9759,
    NOK: 7.9583,
    NZD: 1.3781,
    PHP: 50.378,
    PLN: 3.4376,
    RON: 3.82,
    RUB: 56.61,
    SEK: 8.1033,
    SGD: 1.3268,
    THB: 31.97,
    TRY: 3.756,
    ZAR: 12.398,
    EUR: 0.82393,
  },
};

describe('fetchLatestConversionRates to CURRENCY_CONVERSION_RESULT', () => {
  const action = { currency: 'CNY' };
  const it = sagaHelper(fetchLatestConversionRates(action));

  it('should call getLatestRate with currency', (result) => {
    expect(result).toEqual(call(getLatestRate, 'CNY'));
    const response = {};
    response.json = () => respSuccessJson;
    return response;
  });

  it('should call yield expected json response', (result) => {
    expect(result).toEqual(respSuccessJson);
    return result;
  });

  it('should put CURRENCY_CONVERSION_RESULT', (result) => {
    const expected = put({
      type: CURRENCY_CONVERSION_RESULT,
      result: respSuccessJson,
    });
    expect(result).toEqual(expected);
  });

  it('and then nothing', (result) => {
    expect(result).toBeUndefined();
  });
});

describe('fetchLatestConversionRates to CURRENCY_CONVERSION_ERROR - server error', () => {
  const action = { currency: 'CNY' };
  const it = sagaHelper(fetchLatestConversionRates(action));

  it('should call getLatestRate with currency', (result) => {
    expect(result).toEqual(call(getLatestRate, 'CNY'));
    const response = {};
    response.json = () => respErrorJson;
    return response;
  });

  it('should call yield expected json response', (result) => {
    expect(result).toEqual(respErrorJson);
    return result;
  });

  it('should put CURRENCY_CONVERSION_ERROR', (result) => {
    const expected = put({
      type: CURRENCY_CONVERSION_ERROR,
      error: respErrorJson.error,
    });
    expect(result).toEqual(expected);
  });
  it('and then nothing', (result) => {
    expect(result).toBeUndefined();
  });
});

describe('fetchLatestConversionRates to CURRENCY_CONVERSION_ERROR - network error', () => {
  const action = { currency: 'CNY' };
  const it = sagaHelper(fetchLatestConversionRates(action));

  it('should call getLatestRate with currency', (result) => {
    expect(result).toEqual(call(getLatestRate, 'CNY'));
    return new Error('network error');
  });

  it('should put CURRENCY_CONVERSION_ERROR', (result) => {
    const expected = put({
      type: CURRENCY_CONVERSION_ERROR,
      error: 'network error',
    });
    expect(result).toEqual(expected);
  });

  it('and then nothing', (result) => {
    expect(result).toBeUndefined();
  });
});

// describe('sagas async request response', () => {
//   it('should match snapshot', async () => {
//     const p = await store.dispatch({ type: CURRENCY_GET_INITIAL_CONVERSION, currency: 'CNY' });
//   });
// });
