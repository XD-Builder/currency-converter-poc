import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Options } from '../Options';

Enzyme.configure({ adapter: new Adapter() });

function setup() {
  const props = {
    navigation: { navigate: jest.fn(), state: { key: '123' } },
    alertWithType: jest.fn(),
  };

  const enzymeWrapper = shallow(<Options {...props} />);

  return {
    props,
    enzymeWrapper,
  };
}

describe('Options', () => {
  beforeEach(() => {
    const beforeSetup = setup();
    this.props = beforeSetup.props;
    this.enzymeWrapper = beforeSetup.enzymeWrapper;
  });

  it('should pass methods tests', () => {
    // test handlePressThemes
    this.enzymeWrapper
      .find('ListItem')
      .at(0)
      .prop('onPress')();
    expect(this.props.navigation.navigate).toHaveBeenCalled();

    // test handlePressSite
    this.enzymeWrapper
      .find('ListItem')
      .at(1)
      .prop('onPress')();
    expect(this.props.alertWithType).not.toHaveBeenCalled();
  });

  it('should pass ui tests', () => {
    expect(this.enzymeWrapper
      .find('ScrollView')
      .at(0)
      .exists()).toBe(true);

    expect(this.enzymeWrapper
      .find('ListItem')
      .at(0)
      .props().text).toBe('Themes');

    expect(this.enzymeWrapper
      .find('ListItem')
      .at(1)
      .props().text).toBe('Fixer.io');
  });
});
