import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Themes } from '../Themes';

Enzyme.configure({ adapter: new Adapter() });

function setup() {
  const props = {
    navigation: { navigate: jest.fn(), goBack: jest.fn(), state: { params: { screenKey: '123' } } },
    actions: { changePrimaryColor: jest.fn() },
  };

  const enzymeWrapper = shallow(<Themes {...props} />);

  return {
    props,
    enzymeWrapper,
  };
}

describe('Themes', () => {
  beforeEach(() => {
    const beforeSetup = setup();
    this.props = beforeSetup.props;
    this.enzymeWrapper = beforeSetup.enzymeWrapper;
  });
  it('should pass ui tests', () => {
    expect(this.enzymeWrapper
      .find('ScrollView')
      .at(0)
      .exists()).toBe(true);

    expect(this.enzymeWrapper
      .find('ListItem')
      .at(0)
      .props().text).toBe('Blue');

    expect(this.enzymeWrapper.find('ListItem')).toHaveLength(4);
  });
  it('should pass method tests', () => {
    [...Array(4)].forEach((_, i) => {
      this.enzymeWrapper
        .find('ListItem')
        .at(i)
        .prop('onPress')();
      expect(this.props.actions.changePrimaryColor).toHaveBeenCalledTimes(i + 1);
      expect(this.props.navigation.goBack).toHaveBeenCalledTimes(i + 1);
    });
  });
});
