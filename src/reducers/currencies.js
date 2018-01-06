import {
  CURRENCY_CHANGE_AMOUNT,
  CURRENCY_SWAP_CURRENCY,
  CURRENCY_CHANGE_BASE,
  CURRENCY_CHANGE_QUOTE,
  CURRENCY_GET_INITIAL_CONVERSION,
  CURRENCY_CONVERSION_RESULT,
  CURRENCY_CONVERSION_ERROR,
} from '../actions/actionTypes';

const initialState = {
  baseCurrency: 'USD',
  quoteCurrency: 'GBP',
  amount: 100,
  conversions: {},
  error: null,
};

const setConversions = (state, action) => {
  let conversion = {
    isFetching: true,
    date: '',
    rates: {},
  };

  if (state.conversions[action.currency]) {
    conversion = state.conversions[action.currency];
  }
  return {
    ...state.conversions,
    [action.currency]: conversion,
  };
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CURRENCY_CHANGE_AMOUNT:
      return { ...state, amount: action.amount || 0 };
    case CURRENCY_SWAP_CURRENCY:
      return {
        ...state,
        baseCurrency: state.quoteCurrency,
        quoteCurrency: state.baseCurrency,
      };
    case CURRENCY_CHANGE_BASE:
      return {
        ...state,
        baseCurrency: action.currency,
        conversions: setConversions(state, action),
      };
    case CURRENCY_CHANGE_QUOTE:
      return {
        ...state,
        quoteCurrency: action.currency,
      };
    case CURRENCY_GET_INITIAL_CONVERSION:
      return { ...state, conversions: setConversions(state, { currency: state.baseCurrency }) };
    case CURRENCY_CONVERSION_RESULT:
      return {
        ...state,
        error: action.error,
        baseCurrency: action.result.base,
        conversions: {
          ...state.conversions,
          [action.result.base]: {
            isFetching: false,
            ...action.result,
          },
        },
      };
    case CURRENCY_CONVERSION_ERROR:
      return { ...state, error: action.error };
    default:
      return state;
  }
};
