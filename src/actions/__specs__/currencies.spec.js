import { currencyAction as action } from '../';
import * as types from '../actionTypes';

describe('currenciesAction', () => {
  beforeEach(() => {
    this.currency = 'USD';
  });

  it('should create an action to getInitialConversion', () => {
    const expectedAction = { type: types.CURRENCY_GET_INITIAL_CONVERSION };
    expect(action.getInitialConversion()).toEqual(expectedAction);
  });

  it('should create an action to changeCurrencyAmount', () => {
    const amount = 1.221;
    const expectedAction = { type: types.CURRENCY_CHANGE_AMOUNT, amount };
    expect(action.changeCurrencyAmount(amount)).toEqual(expectedAction);
  });

  it('should create an action to swapCurrency', () => {
    const expectedAction = { type: types.CURRENCY_SWAP_CURRENCY };
    expect(action.swapCurrency()).toEqual(expectedAction);
  });

  it('should create an action to changeBaseCurrency', () => {
    const expectedAction = { type: types.CURRENCY_CHANGE_BASE, currency: this.currency };
    expect(action.changeBaseCurrency(this.currency)).toEqual(expectedAction);
  });

  it('should create an action to changeQuoteCurrency', () => {
    const expectedAction = { type: types.CURRENCY_CHANGE_QUOTE, currency: this.currency };
    expect(action.changeQuoteCurrency(this.currency)).toEqual(expectedAction);
  });
});
