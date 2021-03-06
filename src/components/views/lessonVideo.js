import React, { Component } from "react";
import { WebView } from "react-native";
import { View, Dimensions } from "react-native";

export default class LessonVideo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mute: false,
      shouldPlay: true
    };
  }

  render() {
    const { width } = Dimensions.get("window");
    const {
      props: {
        navigation: {
          state: {
            params: { link }
          }
        }
      }
    } = this;
    var vimeoLink = link.slice(link.lastIndexOf("/") + 1);
    console.log("links", vimeoLink);
    return (
      <View
        style={{ flex: 1, alignContent: "center", justifyContent: "center" }}
      >
        <WebView
          style={{ flex: 1, marginTop: 25 }}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          source={{ uri: "https://player.vimeo.com/video/" + vimeoLink }}
        />
      </View>
    );
  }
}
