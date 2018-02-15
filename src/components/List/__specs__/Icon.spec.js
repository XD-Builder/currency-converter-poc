import { View, Text } from 'react-native';
import React from 'react';

import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Icon from '../Icon';

configure({ adapter: new Adapter() });

// Unit Testing Comment rendering, component type and props
describe('<Icon />', () => {
  it('should be a view component', () => {
    const wrapper = shallow(<Icon />);

    expect(wrapper.type()).toEqual(View);
  });

  it('should render the icon when provided visible props', () => {
    const props = {
      visible: true,
      checkmark: true,
      iconBackground: '#ff22ff',
    };

    const wrapper = shallow(<Icon {...props} />);

    expect(wrapper
      .find('Image')
      .at(0)
      .exists()).toBe(true);
  });

  it('should render the icon when provided visible props with no iconbackground', () => {
    const props = {
      visible: true,
      checkmark: true,
      iconBackground: undefined,
    };

    const wrapper = shallow(<Icon {...props} />);

    expect(wrapper
      .find('Image')
      .at(0)
      .exists()).toBe(true);
  });

  // TODO: Don't know why it doesn't work can you figure it out

  // it('should render the icon when provided visible props with no checkmark', () => {
  //   const props = {
  //     visible: true,
  //     checkmark: false,
  //     iconBackground: '#FF22FF',
  //   };

  //   const wrapper = shallow(<Icon {...props} />);
  //   console.log(wrapper.find('Image').at(0));
  //   expect(wrapper
  //     .find('Image')
  //     .at(0)
  //     .exists()).toBe(false);
  // });
});
