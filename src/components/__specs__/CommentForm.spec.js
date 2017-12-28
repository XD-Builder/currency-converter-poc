import {
  View,
  TouchableHighlight,
  Text,
  TextInput,
  StyleSheet
} from "react-native";
import React, { Component } from "react";

import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { expect } from "chai";
import sinon from "sinon";

import CommentForm from "../CommentForm.js";
import CommentBox from "../CommentBox.js";

configure({ adapter: new Adapter() });

// Unit Testing CommentForm rendering, component type and props
describe("<CommentForm />", () => {
  beforeEach(function() {
    wrapper = shallow(<CommentForm />);
  });

  it("should be a view component", () => {
    expect(wrapper.type()).to.equal(View);
  });

  it("should have 2 TextInput components", () => {
    expect(wrapper.find(TextInput)).to.have.length(2);
  });

  it("should have a submit button", () => {
    expect(wrapper.find(TouchableHighlight)).to.have.length(1);
    expect(
      wrapper
        .find(TouchableHighlight)
        .containsMatchingElement(<Text>Submit</Text>)
    ).to.equal(true);
  });

  it("should have author input component with value dependent on state", () => {
    wrapper.setState({ name: "JK" });

    expect(
      wrapper
        .find(TextInput)
        .first()
        .props().value
    ).to.equal("JK");
  });

  it("should have the comment input component with value dependent on state", () => {
    wrapper.setState({ comment: "An awesome comment" });

    expect(
      wrapper
        .find(TextInput)
        .at(1)
        .props().value
    ).to.equal("An awesome comment");
  });

  it("should change state when the text of author input component changes", () => {
    const authorInputComponent = wrapper.find("TextInput").first();

    authorInputComponent.simulate("ChangeText", "wenger");
    expect(wrapper.state("name")).to.equal("wenger");
  });

  it("should change state when the text of comment input component changes", () => {
    const commentInputComponent = wrapper.find("TextInput").at(1);

    commentInputComponent.simulate("ChangeText", "arsenal");

    expect(wrapper.state("comment")).to.equal("arsenal");
  });

  // setup and user interaction, and test a stub method called
  it("invokes handleCommitSubmit method of CommentBox with author and comment", () => {
    // stub handleCommentSubmit method on CommentBox.prototype
    sinon.stub(CommentBox.prototype, "handleCommentSubmit");

    // creates the wrapper with stub method
    const wrapper = shallow(
      <CommentForm onCommentSubmit={CommentBox.prototype.handleCommentSubmit} />
    );
    // finds touchablehighlight element which is a submit button
    const submitButton = wrapper.find("TouchableHighlight").first();

    // sets state so the component updates its TextInput
    wrapper.setState({ name: "JK " });
    wrapper.setState({ comment: " Arsenal is the best" });

    // Simulates user press submitButton click
    submitButton.simulate("press");

    // check stub called with params
    expect(
      CommentBox.prototype.handleCommentSubmit.calledWith({
        author: "JK",
        text: "Arsenal is the best"
      })
    ).to.be.true;

    // restores prototype method to default
    CommentBox.prototype.handleCommentSubmit.restore();
  });

  // stub, setup, user press, test input fields updated
  it("sets the state of two input fields to the initial state on press", () => {
    sinon.stub(CommentBox.prototype, "handleCommentSubmit");

    const wrapper = shallow(
      <CommentForm onCommentSubmit={CommentBox.prototype.handleCommentSubmit} />
    );
    const submitButton = wrapper.find("TouchableHighlight").first();
    wrapper.setState({ name: "JK" });
    wrapper.setState({ comment: "Arsenal is the best" });

    submitButton.simulate("press");

    expect(wrapper.state("name")).to.equal("");
    expect(wrapper.state("comment")).to.equal("");

    CommentBox.prototype.handleCommentSubmit.restore();
  });
});
