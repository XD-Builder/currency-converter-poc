import { Text, ListView } from "react-native";
import React, { Component } from "react";

import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { expect } from "chai";

import CommentList from "../CommentList.js";
import Comment from "../Comment.js";

configure({ adapter: new Adapter() });

// Unit Testing CommentList rendering, component type and props state conversion
describe("<CommentList />", () => {
  beforeEach(function() {
    data = [
      { author: "Pete Hunt", text: "This is one comment" },
      { author: "Jordan Walke", text: "This is a super comment" },
      { author: "Jordan Walkerr", text: "This is an ordinary comment" }
    ];
  });

  it("should define its propTypes", () => {
    expect(CommentList.propTypes.data).to.be.an("function");
  });

  it("should be a ListView component", () => {
    const wrapper = shallow(<CommentList data={data} />);

    expect(wrapper.type()).to.equal(ListView);
  });

  it("should have correct datasource in state", () => {
    const wrapper = shallow(<CommentList data={data} />);

    expect(wrapper.state("dataSource")._dataBlob.s1).to.equal(data);
    const newData = { author: "Pete Hunt", text: "This is one comment" };

    // push new data, test willReceiveProps
    data.push(newData);
    wrapper.setProps(data);
    expect(wrapper.state("dataSource")._dataBlob.s1).to.equal(data);
  });

  it("should render row with data", () => {
    const newData = { author: "Pete Hunt", text: "This is one comment" };
    const comment = CommentList.prototype.renderComment(newData);
    expect(comment.type).to.equal(Comment);
  });
});
