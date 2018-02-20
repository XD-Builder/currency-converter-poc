import { combineReducers } from 'redux';

import currencies from './currencies';
import theme from './theme';

// CombineReducers of redux is used by createStore to generate a store
export default combineReducers({
  currencies,
  theme,
});
