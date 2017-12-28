import {
  View,
  TouchableHighlight,
  Text,
  TextInput,
  StyleSheet
} from "react-native";
import React, { Component } from "react";
import PropTypes from "prop-types";

export default class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = { name: "", comment: "" };
  }
  static propTypes = {
    onCommentSubmit: PropTypes.func
  };

  render() {
    return (
      <View>
        <TextInput
          placeholder="name"
          style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
          onChangeText={text => this.setState({ name: text })}
          value={this.state.name}
        />
        <TextInput
          placeholder="comment"
          style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
          onChangeText={content => this.setState({ comment: content })}
          value={this.state.comment}
        />
        <TouchableHighlight onPress={() => this.onPressButton()}>
          <View style={styles.button}>
            <Text style={{ margin: 30 }}>Submit</Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  }
  onPressButton() {
    var author = this.state.name.trim();
    var comment = this.state.comment.trim();

    if (author != "" && comment != "") {
      this.setState({ name: "", comment: "" });
      this.props.onCommentSubmit({ author: author, text: comment });
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 10
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10
  },
  countContainer: {
    alignItems: "center",
    padding: 10
  },
  countText: {
    color: "#FF00FF"
  }
});
