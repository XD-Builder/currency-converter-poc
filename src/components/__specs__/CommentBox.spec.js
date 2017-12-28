import { Text, View, AsyncStorage, StatusBar } from "react-native";
import React, { Component } from "react";

import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { expect } from "chai";
import sinon from "sinon";

import CommentBox from "../CommentBox.js";
import CommentList from "../CommentList.js";
import CommentForm from "../CommentForm.js";

configure({ adapter: new Adapter() });

// use enzyme for shallow, chai for expect and sinon for spy
describe("<CommentBox />", () => {
  // This shallow object will be used
  beforeEach(function() {
    // hoisted
    wrapper = shallow(<CommentBox />);
  });

  it("should be a view component", () => {
    expect(wrapper.type()).to.equal(View);
  });

  it("should have a title Comment It", () => {
    expect(
      wrapper.contains(
        <Text style={{ fontSize: 16, color: "red", textAlign: "center" }}>
          Comment It
        </Text>
      )
    ).to.equal(true);
  });

  it("should render CommentList component", () => {
    expect(wrapper.find(CommentList)).to.have.length(1);
  });

  it("should render CommentForm component", () => {
    expect(wrapper.find(CommentForm)).to.have.length(1);
  });

  it("should have an initial state", () => {
    expect(wrapper.state("data").length).to.equal(0);
  });

  it("should pass its state data as props to commentlist component", () => {
    // check props passed down to commentList same as CommentBox state data
    expect(wrapper.find(CommentList).props().data).to.eql(
      wrapper.state("data")
    );
  });

  it("should pass its handleCommentSubmit method as props to CommentForm component", () => {
    // create real comment box component
    commentBox = new CommentBox();
    var definedMethod = commentBox.handleCommentSubmit;

    // check method passed to commentForm is same as one defined in commentBox
    var passedMethod = wrapper.find(CommentForm).props().onCommentSubmit;
    expect(definedMethod.name).to.equal(passedMethod.name);
  });

  describe("handleCommentSubmit", () => {
    it("stores comment data using asyncstorage on comment submit", () => {
      var data = [
        { author: "Pete Hunt", text: "This is one comment" },
        { author: "Jordan Walke", text: "This is a super comment" },
        { author: "Jordan Walkerr", text: "This is an ordinary comment" }
      ];
      // create real comment box component
      commentBox = new CommentBox({ asyncStorageKey: "comments" });
      // set state data for new component, and push new data.
      commentBox.state.data = data;
      // set local data as expectation
      var commentData = { author: "JK", text: "Arsenal is the best" };
      data.push(commentData);

      // spy on setItem method
      var spy = sinon.spy(AsyncStorage, "setItem");

      // handle comment submit should be called once
      commentBox.handleCommentSubmit(commentData);

      // verify spy method called and called with data and comments as key
      expect(spy.calledOnce).to.be.true;
      expect(spy.calledWith("comments", JSON.stringify(data))).to.be.true;
    });

    it("invokes the getComments method", () => {
      var data = [
        { author: "Pete Hunt", text: "This is one comment" },
        { author: "Jordan Walke", text: "This is a super comment" },
        { author: "Jordan Walkerr", text: "This is an ordinary comment" }
      ];

      commentBox = new CommentBox({ asyncStorageKey: "comments" });

      // stub commentBox getComments method on this object
      sinon.stub(commentBox, "getComments");
      var commentData = { author: "JK", text: "Arsenal is the best" };

      // call
      commentBox.handleCommentSubmit(commentData);

      // getComments should be called
      expect(commentBox.getComments.calledOnce).to.be.true;
    });
  });
});
