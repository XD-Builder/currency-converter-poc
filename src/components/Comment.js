import { View, Text } from "react-native";
import React, { Component } from "react";

export default class Comment extends Component {
  render() {
    return (
      <View>
        <Text>{this.props.author}</Text>
        <Text>{this.props.children}</Text>
      </View>
    );
  }
}
