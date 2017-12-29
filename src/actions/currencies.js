import * as types from './actionTypes';

export const getInitialConversion = () => ({
  type: types.CURRENCY_GET_INITIAL_CONVERSION,
});

export const changeCurrencyAmount = amount => ({
  type: types.CURRENCY_CHANGE_AMOUNT,
  amount: parseFloat(amount),
});

export const swapCurrency = () => ({
  type: types.CURRENCY_SWAP_CURRENCY,
});

export const changeBaseCurrency = currency => ({
  type: types.CURRENCY_CHANGE_BASE,
  currency,
});

export const changeQuoteCurrency = currency => ({
  type: types.CURRENCY_CHANGE_QUOTE,
  currency,
});
