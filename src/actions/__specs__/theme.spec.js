import { themeAction as action } from '../';
import * as types from '../actionTypes';

describe('themeAction', () => {
  it('should create an action to changePrimaryColor', () => {
    const color = '#D57A66';
    const expectedAction = { type: types.THEME_CHANGE_PRIMARY_COLOR, color };
    expect(action.changePrimaryColor(color)).toEqual(expectedAction);
  });
});
