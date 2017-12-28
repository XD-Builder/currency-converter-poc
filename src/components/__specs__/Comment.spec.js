import { View, Text } from "react-native";
import React, { Component } from "react";

import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { expect } from "chai";

import Comment from "../Comment.js";

configure({ adapter: new Adapter() });

// Unit Testing Comment rendering, component type and props
describe("<Comment />", () => {
  it("should be a view component", () => {
    const wrapper = shallow(<Comment />);

    expect(wrapper.type()).to.equal(View);
  });

  it("should render the given comment", () => {
    const wrapper = shallow(<Comment> This is a comment </Comment>);

    expect(wrapper.contains(<Text> This is a comment </Text>)).to.equal(true);
  });

  it("should render the given author name", () => {
    const wrapper = shallow(<Comment author="Author" />);

    expect(wrapper.contains(<Text>Author</Text>)).to.equal(true);
  });
});
