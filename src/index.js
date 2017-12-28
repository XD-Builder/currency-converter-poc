import React, { Component } from "react";
import CommentBox from "./components/CommentBox.js";

export default class App extends Component {
  render() {
    return <CommentBox asyncStorageKey={"comments"} />;
  }
}
