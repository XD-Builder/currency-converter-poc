// currency actions that we import from actionTypes
import {
  CURRENCY_CHANGE_AMOUNT,
  CURRENCY_SWAP_CURRENCY,
  CURRENCY_CHANGE_BASE,
  CURRENCY_CHANGE_QUOTE,
  CURRENCY_GET_INITIAL_CONVERSION,
  CURRENCY_CONVERSION_RESULT,
  CURRENCY_CONVERSION_ERROR,
} from '../actions/actionTypes';

// the initial state of the currency reducer
const initialState = {
  baseCurrency: 'USD',
  quoteCurrency: 'GBP',
  amount: 100,
  conversions: {},
  error: null,
};

// set conversion part of the state
const setConversions = (state, action) => {
  // initial conversion has property isFetching
  let conversion = {
    isFetching: true,
    date: '',
    rates: {},
  };

  // if action.currency selected has value then, set conversion object to that
  if (state.conversions[action.currency]) {
    conversion = state.conversions[action.currency];
  }

  // it should return everything under conversions object and fetched conversion
  // note [action.currency], bracket is needed for variable substitution
  return {
    ...state.conversions,
    [action.currency]: conversion,
  };
};

// a reducer for currencies.js, it handles all currency related actions
export default (state = initialState, action) => {
  // based on action type, this reducer is going to perform various state updates
  switch (action.type) {
    // trigger when the application starts, sets conversion to isFetching state
    // since state.conversions[action.currency] is null at the moment
    // Sagas middleware will then do async request to get conversion of base currency
    case CURRENCY_GET_INITIAL_CONVERSION:
      return {
        ...state,
        conversions: setConversions(state, { currency: state.baseCurrency }),
      };
    // if a user types a new amount in the textInput, this action will be triggered.
    case CURRENCY_CHANGE_AMOUNT:
      // then it returns a new state with a new amount
      return {
        ...state,
        amount: action.amount || 0,
      };
    // if a user clicks on "Reverse Currencies", this action will be triggered
    case CURRENCY_SWAP_CURRENCY:
      // it will then return a new state with baseCurrency and quoteCurrency swapped
      // the converted currency amount will be updated by sagas fetch latestConversionRate
      return {
        ...state,
        baseCurrency: state.quoteCurrency,
        quoteCurrency: state.baseCurrency,
      };
    // triggers if a user clicks on the base currency button
    case CURRENCY_CHANGE_BASE:
      // The converted currency amount will be updated by sagas fetch latestConversionRate
      return {
        ...state,
        baseCurrency: action.currency,
        conversions: setConversions(state, action),
      };

    // triggers if a user clicks on the quote currency button
    case CURRENCY_CHANGE_QUOTE:
      // Simply sets quoteCurrency and the conversion should be available
      return {
        ...state,
        quoteCurrency: action.currency,
      };

    // triggers if saga puts a conversion result action after successful async request
    // It will reset the error to null, set base currency from response, update conversions
    // with base node with results under it, and is fetching to be false
    case CURRENCY_CONVERSION_RESULT:
      return {
        ...state,
        error: null,
        baseCurrency: action.result.base,
        conversions: {
          ...state.conversions,
          [action.result.base]: {
            isFetching: false,
            ...action.result,
          },
        },
      };

    // if there is some sort of error, then we update error node with error
    case CURRENCY_CONVERSION_ERROR:
      return { ...state, error: action.error };
    default:
      return state;
  }
};
