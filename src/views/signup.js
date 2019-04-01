import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";

export default class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View>
        <Text> Signup </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 7,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  header: {
    flex: 3,
    backgroundColor: "grey",
    alignItems: "center",
    justifyContent: "center"
  }
});
