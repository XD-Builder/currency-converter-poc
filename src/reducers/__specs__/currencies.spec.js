import currenciesReducer from '../currencies';
import * as types from '../../actions/actionTypes';

describe('currenciesReducer', () => {
  beforeEach(() => {
    this.initialState = {
      baseCurrency: 'USD',
      quoteCurrency: 'GBP',
      amount: 100,
      conversions: {},
      error: null,
    };
    this.conversionsInitial = {
      isFetching: true,
      date: '',
      rates: {},
    };
  });

  it('should reduce CURRENCY_CHANGE_AMOUNT action', () => {
    const newAmount = 20;
    const action = {
      type: types.CURRENCY_CHANGE_AMOUNT,
      amount: newAmount,
    };
    const expectedAction = { ...this.initialState, amount: newAmount };
    expect(currenciesReducer(undefined, action)).toEqual(expectedAction);
  });

  it('should reduce CURRENCY_SWAP_CURRENCY action', () => {
    const action = {
      type: types.CURRENCY_SWAP_CURRENCY,
    };
    const expectedAction = {
      ...this.initialState,
      baseCurrency: this.initialState.quoteCurrency,
      quoteCurrency: this.initialState.baseCurrency,
    };
    expect(currenciesReducer(undefined, action)).toEqual(expectedAction);
  });

  it('should reduce CURRENCY_CHANGE_BASE action', () => {
    const newBaseCurrency = 'CNY';
    const action = {
      type: types.CURRENCY_CHANGE_BASE,
      currency: newBaseCurrency,
    };
    const expectedAction = {
      ...this.initialState,
      baseCurrency: newBaseCurrency,
      conversions: {
        ...this.initialState.conversions,
        [newBaseCurrency]: this.conversionsInitial,
      },
    };
    expect(currenciesReducer(undefined, action)).toEqual(expectedAction);
  });

  it('should reduce CURRENCY_CHANGE_QUOTE action', () => {
    const newQuoteCurrency = 'CNY';
    const action = {
      type: types.CURRENCY_CHANGE_QUOTE,
      currency: newQuoteCurrency,
    };
    const expectedAction = {
      ...this.initialState,
      quoteCurrency: newQuoteCurrency,
    };
    expect(currenciesReducer(undefined, action)).toEqual(expectedAction);
  });

  it('should reduce CURRENCY_GET_INITIAL_CONVERSION action', () => {
    const action = {
      type: types.CURRENCY_GET_INITIAL_CONVERSION,
    };
    const expectedAction = {
      ...this.initialState,
      conversions: {
        ...this.initialState.conversions,
        [this.initialState.baseCurrency]: this.conversionsInitial,
      },
    };
    expect(currenciesReducer(undefined, action)).toEqual(expectedAction);
  });

  it('should reduce CURRENCY_CONVERSION_RESULT action', () => {
    const error = '';
    const resultBaseCurrency = 'CNY';
    const action = {
      type: types.CURRENCY_CONVERSION_RESULT,
      error,
      result: {
        base: resultBaseCurrency,
      },
    };
    const expectedAction = {
      ...this.initialState,
      error,
      baseCurrency: resultBaseCurrency,
      conversions: {
        ...this.initialState.conversions,
        [resultBaseCurrency]: {
          isFetching: false,
          ...action.result,
        },
      },
    };
    expect(currenciesReducer(undefined, action)).toEqual(expectedAction);
  });

  it('should reduce CURRENCY_CONVERSION_ERROR action', () => {
    const error = 'Here is some error';
    const action = {
      type: types.CURRENCY_CONVERSION_ERROR,
      error,
    };
    const expectedAction = {
      ...this.initialState,
      error,
    };
    expect(currenciesReducer(undefined, action)).toEqual(expectedAction);
  });

  it('should reduce INVALID action with the same state', () => {
    const action = {
      type: 'INVALID',
    };
    const expectedAction = {
      ...this.initialState,
    };
    expect(currenciesReducer(undefined, action)).toEqual(expectedAction);
  });
});
