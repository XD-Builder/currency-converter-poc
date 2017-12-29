import { THEME_CHANGE_PRIMARY_COLOR } from '../actions/actionTypes';

const initialState = {
  primaryColor: '#4F6D7A',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case THEME_CHANGE_PRIMARY_COLOR:
      return { ...state, primaryColor: action.color };
    default:
      return state;
  }
};
