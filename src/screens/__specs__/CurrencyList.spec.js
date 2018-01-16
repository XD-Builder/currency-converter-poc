import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { CurrencyList } from '../CurrencyList';

import renderer from 'react-test-renderer';

Enzyme.configure({ adapter: new Adapter() });

function setup() {
  const props = {
    navigation: { navigate: jest.fn(), goBack: jest.fn(), state: { params: { type: 'base' } } },
    actions: { changeBaseCurrency: jest.fn() },
    baseCurrency: 'USD',
    quoteCurrency: 'CNY',
    primaryColor: '#ff00ff',
  };

  const enzymeWrapper = shallow(<CurrencyList {...props} />);

  return {
    props,
    enzymeWrapper,
  };
}

describe('CurrencyList', () => {
  beforeEach(() => {
    const beforeSetup = setup();
    this.props = beforeSetup.props;
    this.enzymeWrapper = beforeSetup.enzymeWrapper;
  });
  it('should pass ui tests', () => {
    const rendered = renderer.create(<CurrencyList {...this.props} />).toJSON();
    expect(rendered).toBeTruthy();

    expect(this.enzymeWrapper
      .find('View')
      .at(0)
      .exists()).toBe(true);

    expect(this.enzymeWrapper
      .find('FlatList')
      .at(0)
      .exists()).toBe(true);
  });
  it('should pass method tests', () => {
    this.enzymeWrapper.instance().handlePress('USD');
    expect(this.props.actions.changeBaseCurrency).toHaveBeenCalledTimes(1);
    expect(this.props.navigation.goBack).toHaveBeenCalledTimes(1);

    // this.enzymeWrapper
    //   .find('ListItem')
    //   .at(0)
    //   .prop('onPress')();
    // expect(this.props.actions.changeBaseCurrency).toHaveBeenCalledTimes(1);
    // expect(this.props.navigation.goBack).toHaveBeenCalledTimes(1);
  });

  it('should pass method tests with base param type', () => {
    const props = {
      navigation: { navigate: jest.fn(), goBack: jest.fn(), state: { params: { type: 'quote' } } },
      actions: { changeQuoteCurrency: jest.fn() },
      baseCurrency: 'USD',
      quoteCurrency: 'CNY',
      primaryColor: '#ff00ff',
    };

    const enzymeWrapper = shallow(<CurrencyList {...props} />);

    enzymeWrapper.instance().handlePress('USD');
    expect(props.actions.changeQuoteCurrency).toHaveBeenCalledTimes(1);
    expect(props.navigation.goBack).toHaveBeenCalledTimes(1);
  });
});
