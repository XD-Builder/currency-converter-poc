import themeReducer from '../theme';
import * as types from '../../actions/actionTypes';

describe('themeReducer', () => {
  beforeEach(() => {
    this.initialState = {
      primaryColor: '#4F6D7A',
    };
  });

  it('should reduce THEME_CHANGE_PRIMARY_COLOR action to a new state with new color', () => {
    const newColor = '#D57A66';
    const action = {
      type: types.THEME_CHANGE_PRIMARY_COLOR,
      color: newColor,
    };
    const expectedAction = { ...this.initialState, primaryColor: newColor };
    expect(themeReducer(undefined, action)).toEqual(expectedAction);
  });

  it('should reduce EMPTY action with the same state', () => {
    const action = {};
    const expectedAction = { ...this.initialState };
    expect(themeReducer(undefined, action)).toEqual(expectedAction);
  });
});
