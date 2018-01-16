import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Home } from '../Home';

Enzyme.configure({ adapter: new Adapter() });

function setup() {
  const props = {
    navigation: { navigate: jest.fn() },
    dispatch: jest.fn(),
    baseCurrency: 'USD',
    quoteCurrency: 'CNY',
    amount: 100,
    conversionRate: 2,
    lastConvertedDate: new Date(),
    isFetching: false,
    primaryColor: '#770077',
    currencyError: '',
    alertWithType: jest.fn(),
  };

  const enzymeWrapper = shallow(<Home {...props} />);

  return {
    props,
    enzymeWrapper,
  };
}

describe('Home', () => {
  beforeEach(() => {
    const beforeSetup = setup();
    this.props = beforeSetup.props;
    this.enzymeWrapper = beforeSetup.enzymeWrapper;
  });

  it('should pass method tests', () => {
    // test base currency button onPress and onChangeText methods

    expect(this.props.dispatch).toHaveBeenCalled();
    this.enzymeWrapper
      .find('InputWithButton')
      .at(0)
      .prop('onPress')();
    expect(this.props.navigation.navigate).toHaveBeenCalled();

    this.enzymeWrapper
      .find('InputWithButton')
      .at(0)
      .prop('onChangeText')('123');
    expect(this.props.dispatch).toHaveBeenCalledTimes(2);

    // test quote currency button onPress and onChangeText methods
    this.enzymeWrapper
      .find('InputWithButton')
      .at(1)
      .prop('onPress')();
    expect(this.props.navigation.navigate).toHaveBeenCalled();

    this.enzymeWrapper
      .find('ClearButton')
      .at(0)
      .prop('onPress')();
    expect(this.props.dispatch).toHaveBeenCalled();

    this.enzymeWrapper
      .find('Header')
      .at(0)
      .prop('onPress')();
    expect(this.props.navigation.navigate).toHaveBeenCalled();
  });

  it('should pass ui tests', () => {
    // assert container components rendered as what it should be
    expect(this.enzymeWrapper.find('Container').props().backgroundColor).toBe('#770077');
    expect(this.enzymeWrapper.find('StatusBar').props().backgroundColor).toBe('blue');

    // assert text displayed correctly for buttons
    expect(this.enzymeWrapper
      .find('InputWithButton')
      .at(0)
      .props().buttonText).toBe(this.props.baseCurrency);
    expect(this.enzymeWrapper
      .find('InputWithButton')
      .at(1)
      .props().buttonText).toBe(this.props.quoteCurrency);

    // assert minor components
    expect(this.enzymeWrapper.find('LastConverted').props().date).toBe(this.props.lastConvertedDate);
    expect(this.enzymeWrapper.find('ClearButton').props().text).toBe('Reverse Currencies');
  });
});
