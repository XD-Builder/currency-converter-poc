import { Text, ListView } from "react-native";
import React, { Component } from "react";
import Comment from "./Comment.js";
import PropTypes from "prop-types";

export default class CommentList extends Component {
  static propTypes = {
    data: PropTypes.array
  };

  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
      }).cloneWithRows(this.props.data)
    };
  }

  componentWillReceiveProps() {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(this.props.data)
    });
  }

  render() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderComment.bind(this)}
      />
    );
  }
  renderComment(row) {
    return <Comment author={row.author}>{row.text}</Comment>;
  }
}
