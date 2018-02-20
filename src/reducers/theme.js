import { THEME_CHANGE_PRIMARY_COLOR } from '../actions/actionTypes';

// initial color will be mostly blue, some green, little red.
const initialState = {
  primaryColor: '#4F6D7A',
};

export default (state = initialState, action) => {
  switch (action.type) {
    // triggered when an action of THEME_CHANGE_PRIMARY_COLOR is dispatched
    case THEME_CHANGE_PRIMARY_COLOR:
      // updates primaryColor of the state with what action color specifies
      return { ...state, primaryColor: action.color };
    default:
      return state;
  }
};
