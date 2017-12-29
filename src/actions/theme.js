import * as types from './actionTypes';

export const changePrimaryColor = color => ({
  type: types.THEME_CHANGE_PRIMARY_COLOR,
  color,
});
